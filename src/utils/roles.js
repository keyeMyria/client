export const getSiteRoleTitle = (siteRole) => {
  const siteRolesTable = {
    founder: 'Founder',
    admin: 'Admin',
    mod: 'Moderator',
    user: 'User'
  };

  return siteRolesTable[siteRole] || null;
}

export const getRoomRoleTitle = (roomRole) => {
  const roomRolesTable = {
    owner: 'Owner',
    manager: 'Manager',
    mod: 'Moderator',
    member: 'Member'
  };

  return roomRolesTable[roomRole] || null;
}