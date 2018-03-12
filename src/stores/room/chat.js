import { observable, action, computed } from 'mobx';
import { wsAPI } from 'utils/wsapi';
import format from 'date-fns/format';

export class RoomChatStore {
  @observable messages;
  @observable fixBottom;

  @computed
  get messagesList() {
    return this.compactMessages(this.messages.slice());
  }

  compactMessages = (messages) => {
    const compactInterval = 90e3; // 1,5 min

    return messages.map((message, index, array) => {
      let compact = false;
      
      if (index > 0) {
        if (
          (message.dateUnix - array[index-1].dateUnix < compactInterval) &&
          (message.user.site.id === array[index-1].user.site.id)
        ) {
          compact = true;
        }
      }

      return {
        ...message,
        compact
      };
    });
  }

  constructor() {
    this.reset();

    wsAPI.on('chatMessage', data => {
			const [messageId, userData, text] = data;
      const [site, room] = userData;

      const message = {
        id: messageId,
        user: {
          site: {
            id: site[0],
            name: site[1],
            role: site[2],
            avatar: site[3]
          },
          room: {
            role: room[0]
          }
        },
        text
      };

      setImmediate(() => this.addMessage(message));
    });
    wsAPI.on('removeMessage', this.removeMessage);
    wsAPI.on('removeUserMessages', this.removeUserMessages);
    wsAPI.on('clearChat', this.removeAllMessages);
  }

  reset() {
    this.messages = [];
    this.fixBottom = true;
  }

  toBottom = () => {
    this.fixBottom = false;
    this.fixBottom = true;
  }

  addMessage = (message) => {
    message.dateUnix = +new Date();
    message.date = format(message.dateUnix, 'H:mm');
    this.messages.replace([...this.messages, message].slice(-100));
  }

  removeMessage = (messageId) => {
    this.messages = this.messages.filter(message => message.id != messageId);
  }

  removeUserMessages = (userId) => {
    this.messages = this.messages.filter(({ user }) => user.site.id != userId);
  }

  removeAllMessages = () => {
    this.reset();
    setTimeout(() => {
      this.fixBottom = true;
    }, 50);
  }
}

export const roomChatStore = new RoomChatStore();