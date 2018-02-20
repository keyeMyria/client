import React from 'react';

// import RoomPlayerYoutubeStream from '../youtubeStream';
// import RoomPlayerTwitch from '../twitch';

let StreamPlayer = ({ streamService }) => {
  switch (streamService) {
    // case 'youtube':
    //   return <RoomPlayerYoutubeStream />
    // case 'twitch':
      // return <RoomPlayerTwitch />
    default:
      return null;
  }
}

// export default connect(
//   state => ({
//     streamService: state.room.playData.service
//   })
// )(RoomBoardStreamPlayer);