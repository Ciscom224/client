import React,{useState,useEffect} from 'react';
// import Axios from 'axios';

import ParametresComp from '../components/Parametres.component';




function Parametres() {
  

  return (
    
    <div className=" w-full h-screen bg-cover bg-center overflow-y-auto" style={{backgroundImage: "url('/images/Background/menu_bg.jpg')"}}>
        {/* <NavigBar /> */}
        <ParametresComp />
      </div>
      

  )
}

export default Parametres;
