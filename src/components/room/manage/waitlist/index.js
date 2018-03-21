import React from 'react';
import { inject, observer } from 'mobx-react';
import { router } from 'utils/router';
import styled from 'styled-components';
import { theme } from 'colors';

import { Access } from 'helpers/access';
import { SWRow } from 'uikit/swrow';

import { changeWaitlistLock } from 'mutations/changeWaitlistLock';

const Box = styled.div`
  
`;

@inject('roomStore')
@observer
export class RoomManageWaitlist extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
		const { waitlistLock } = this.props.roomStore;

  	return (
  		<Box>
        <Access name="waitlistLock">
          <SWRow 
            title="Заблокировать список ожидания"
            description="Пользователи не смогут присоединяться к списку ожидания"
            isActive={waitlistLock}
            onChange={() => changeWaitlistLock()}/>
        	</Access>
  		</Box>
  	);
  }
}