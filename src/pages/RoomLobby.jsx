import React from 'react';
// import Axios from 'axios';
import RoomLobby from '../components/RoomLobby.composant';



// Cette fonction represente notre page principale et fais appelle aux composants necessaire 
function Room({socket}) {
  
  
  return (
    
      <div className="w-full h-screen bg-cover bg-center">
        <RoomLobby socket={socket} />
      </div>
      

  )
}

export default Room;
