import React from 'react';
import { router } from 'utils/router';
import styled from 'styled-components';
import { theme } from 'colors';

import { Button } from 'uikit';
import { Loading } from 'uikit/loading';

const ToMainBox = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

const Message = styled.span`

`;

const UnbanDate = styled.span`
  padding-left: 5px;
  color: ${theme.accent2};
  text-align: center;
`;

export default () => (
  <Loading>
    <Message>Вы заблокированы в этой комнате.</Message>
    <UnbanDate>Навсегда.</UnbanDate>
    <ToMainBox>
      <Button onClick={() => router.navigate(`/`)}>На главную</Button>
    </ToMainBox>
  </Loading>
);