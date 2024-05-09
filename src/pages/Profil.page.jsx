import React,{useState,useEffect} from 'react';

import ProfilComp from '../components/ProfilComp';




function Profiljoueur() {
  

  return (
    
    <div className=" w-full h-screen bg-cover bg-center overflow-y-auto" style={{backgroundImage: "url('/images/Background/menu_bg.jpg')"}}>
        <ProfilComp />
      </div>
  )
}

export default Profiljoueur;