import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { TextField, Button } from 'uikit';
import { banUser } from 'mutations/banUser';

const Box = styled.div`
  width: 400px;
`;

const AboutUser = styled.div`
  font-size: 14px;
  color: ${theme.accent2};
`;

const Username = styled.span`
  color: ${theme.text1};
  padding: 0 5px;
`;


const BanFrom = styled.div`

`;

const Date = styled.div`

`;

const Reason = styled.div`

`;

const Bottom = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

@inject('setBanFormStore')
@observer
export class SetUserBan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: ''
    };
  }

  setBan = () => {
    const { setBanFormStore } = this.props;
    const userId = setBanFormStore.user.site.id;
    const { reason } = this.state;

    banUser(userId, reason).then(() => {
      setBanFormStore.close();
    });
  }

  setReason = (value) => {
    this.setState({ reason: value });
  }

  render() {
    const { user } = this.props.setBanFormStore;

    if (!user) {
      return null;
    }

    return (
      <Box>
        <AboutUser>
          Ban
          <Username>{user.site.name}</Username>
        </AboutUser>
        <BanFrom>
          <Date></Date>
          <Reason>
            <TextField label="Reason" onChanged={this.setReason} />
          </Reason>
            <Bottom>
              <Button onClick={this.setBan}>Ban</Button>
            </Bottom>
        </BanFrom>
      </Box>
    );
  }
}