const STATUS = {
  INIT: 0,
  CONNECTING: 1,
  CONNECTED: 2,
  DISCONNECTED: 3,
  RECONNECTING: 4,
  RECONNECTED: 5,
  CLOSED: 6
};

class WSAPI {
  constructor() {
    this.URL = null;
    this.RECONNECT_TIMEOUT = 5000;
    this.DEBUG = false;
    this.socket = null;
    this.status = STATUS.INIT;
    this.cbs = [];
  }

  on = (eventName, cb) => {
    this.cbs.push({ eventName, cb });
  }

  event = (eventName, eventData) => {
    if (this.DEBUG) {
      if (typeof eventData != 'undefined') {
        console.log(eventName, eventData);
      } else {
        console.log(eventName);
      }
    } 
    
    this.cbs.forEach(data => {
      if (data.eventName === eventName) {
        data.cb(eventData);
      }
    });
  }

  onConnected = () => {
    if (this.status === STATUS.CONNECTING) {
      this.event('connected');
      this.status = STATUS.CONNECTED;
    } else {
      this.event('reconnected');
      this.status = STATUS.RECONNECTED;
    }
  }

  onDisconnected = (event) => {
    if (
      this.status === STATUS.CONNECTED ||
      this.status === STATUS.RECONNECTED
    ) {
      if (event.wasClean) {
        this.event('closed');
        this.status = STATUS.CLOSED;
      } else {
        this.event('disconnected');
        this.status = STATUS.DISCONNECTED;
        this.reconnecting();
      }
    }
  }

  onError = (event) => {
    // this.status = STATUS.DISCONNECTED;
    // this.reconnecting();
    // console.log(event);
  }

  reconnecting = () => {
    if (
      this.status === STATUS.DISCONNECTED || 
      this.status === STATUS.RECONNECTING
    ) {
      this.reconnect();
      setTimeout(() => this.reconnecting(), this.RECONNECT_TIMEOUT);
    }
  }

  connect = () => {
    this.event('connecting');
    this.status = STATUS.CONNECTING;
    
    this.tryConnect();
  }

  reconnect = () => {
    if (this.status !== STATUS.RECONNECTING) {
      this.event('reconnecting');
      this.status = STATUS.RECONNECTING;
    }

    this.tryConnect();
  }

  tryConnect = () => {
    if (!this.URL) {
      throw new Error('URL is required');
    }

    this.socket = new WebSocket(this.URL);
    this.socket.onopen = this.onConnected;
    this.socket.onclose = this.onDisconnected;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onError;
  }

  onMessage = (event) => {
    if (typeof event.data != 'string') return;
    const [eventName, data] = JSON.parse(event.data);

    this.event(eventName, data);

    // if (events[eventName]) {
    //   events[eventName](data);
    // }
  }

  action(name, data) {
    this.send(name, data);
  }

  send = (type, data) => {
    let messageData = typeof data == 'undefined' ? [type] : [type, data];

    this.socket.send(JSON.stringify(messageData));
  }

  run = () => {
    if (!this.URL) {
      throw new Error('URL is required');
    }

    this.connect();
  }
}

export const wsAPI = new WSAPI();