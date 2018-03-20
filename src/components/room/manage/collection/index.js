import React from 'react';
import { inject, observer } from 'mobx-react';
import { router } from 'utils/router';
import styled from 'styled-components';
import { theme } from 'colors';
import { TextField, Button } from 'uikit';
import { collectionStart } from 'mutations/collectionStart';

const Box = styled.div`
  
`;

export class RoomManageCollection extends React.Component {
	constructor(props) {
    super(props);
	}
	
	startCollection = () => {
		collectionStart();
	}

  render() {
  	return (
  		<Box>
        <Button
					onClick={this.startCollection}>Start Collection Bot</Button>
  		</Box>
  	);
  }
}