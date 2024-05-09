import React,{useState,useEffect} from 'react';
import ThemeChoice from '../components/Games/Quiz/ThemeChoice';



// Cette fonction represente notre page principale et fais appelle aux composants necessaire 
function QuizChoice({socket}) {
  

  return (
    
      <div className="w-full h-screen bg-cover bg-center overflow-y-auto" style={{backgroundImage: "url('/images/Background/theme_bg.png')"}}>
        <ThemeChoice socket={socket}/>
      </div>
      

  )
}

export default QuizChoice;
