import React from 'react';
import { inject, observer } from 'mobx-react';
import { theme } from 'colors';
import { uniq } from 'ramda';
import { checkAccess } from 'utils/access';
import { Button, Dropdown } from 'uikit';
import { setRoleUserRoom } from 'mutations/setRoleUserRoom';

@inject('roomSetRoleFormStore', 'userStore', 'userRoomStore')
@observer
export class RoomSetRole extends React.Component {
  onRoleSelect(role) {
    const { roomSetRoleFormStore } = this.props;
    const userId = roomSetRoleFormStore.user.site.id;
  
    setRoleUserRoom(userId, role).then(() => {
      roomSetRoleFormStore.close();
    });
  }

  roleAccess(actionName) {
    const { roomSetRoleFormStore, userStore, userRoomStore } = this.props;
    const contextUser = roomSetRoleFormStore.user;
    
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
    
    return checkAccess(actionName, current, context);
  }

  getRolesList() {
    const allRoles = [
      ['setRoleRoomUser', { value: 'user', title: 'User' }],
      ['setRoleRoomMod', { value: 'mod', title: 'Moderator' }],
      ['setRoleRoomManager', { value: 'manager', title: 'Manager' }],
    ];

    return allRoles.filter(([actionName]) => {
      return this.roleAccess(actionName);
    }).map(([actionName, item]) => item);
  } 

  render() {
    const { roomSetRoleFormStore } = this.props;
    const { user } = roomSetRoleFormStore;

    if (!user) {
      return null;
    }

    const currentRoomRole = user.room.role;
    const roles = this.getRolesList();

    return (
      <div>
        {roles.length > 0 && <Dropdown
          onChange={(val) => this.onRoleSelect(val)}
          values={roles}
          value={currentRoomRole} />}
      </div>
    );
  }
}