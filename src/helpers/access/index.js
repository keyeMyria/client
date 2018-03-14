import React from 'react';
import { inject, observer } from 'mobx-react';
import { checkAccess } from 'utils/access';
import { uniq } from 'ramda';

@inject('userStore', 'userRoomStore')
@observer
export class Access extends React.Component {
  isShow() {
    const { name, userStore, userRoomStore } = this.props;
    const contextUser = this.props.context;
    
    const current = {
      id: userStore.id,
      roles: uniq([userStore.role, userRoomStore.role])
    }

    let context = null;

    if (contextUser) {
      context = {
        id: contextUser.site.id,
        roles: uniq([contextUser.site.role, contextUser.room.role])
      };
    }
    
    return checkAccess(name, current, context);
  }

  render() {
    let res = !this.isShow()

    if (this.props.invert) {
      res = !res;
    }

    return !!res ? null : this.props.children;
  }
}

Access.defaultProps = {
  context: null,
  name: null,
  invert: false
};