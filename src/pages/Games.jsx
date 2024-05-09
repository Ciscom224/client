import React,{useState,useEffect} from 'react';
// import Axios from 'axios';
import GamesChoice from '../components/Games/GamesChoice';



// Cette fonction represente notre page principale et fais appelle aux composants necessaire 
function Games() {
  

  return (
      <div className="w-full h-screen bg-cover bg-center overflow-y-auto">
        <GamesChoice />
      </div>
  )
}

export default Games;
