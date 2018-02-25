import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { checkAccess } from 'utils/access';
import { Button, Dropdown } from 'components/ui';
import { setRoleUser } from 'mutations/setRoleUser';

@inject('setRoleFormStore', 'userStore')
@observer
export class SetUserRole extends React.Component {
  onRoleSelect = (role) => {
    const { setRoleFormStore } = this.props;
    const userId = setRoleFormStore.user.site.id;

    setRoleUser(userId, role).then(() => {
      setRoleFormStore.close();
    });
  }

  roleAccess(actionName) {
    const { userStore, setRoleFormStore } = this.props;
    const contextUser = setRoleFormStore.user;
    
    const current = {
      id: userStore.id,
      roles: [userStore.role]
    }

    let context = null;

    if (contextUser) {
      context = {
        id: contextUser.site.id,
        roles: [contextUser.site.role]
      };
    }
    
    return checkAccess(actionName, current, context);
  }

  getRolesList() {
    const allRoles = [
      ['setRoleUser', { value: 'user', title: 'User' }],
      ['setRoleAdmin', { value: 'admin', title: 'Admin' }],
    ];

    return allRoles.filter(([actionName]) => {
      return this.roleAccess(actionName);
    }).map(([actionName, item]) => item);
  } 

  render() {
    const { user } = this.props.setRoleFormStore;
    const currentRole = user.site.role;
    const roles = this.getRolesList();

    return (
      <div>
        {roles.length > 0 && <Dropdown
          onChange={this.onRoleSelect}
          values={roles}
          value={currentRole} />}
      </div>
    );
  }
}