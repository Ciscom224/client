import React from 'react';
import NavigBar from '../components/NavBar.component';
import ClassementComponent from '../components/ClassementComp'; 
import AmisComp from '../components/AmisComp';

function Amis() {
  return (
    <div className="w-full h-full bg-cover bg-center " style={{backgroundImage: "url('/images/Background/classement_bg.png')"}}>
      <div className="ml-2 mt-28" > 
        <AmisComp /> 
      </div>
    </div>
  );
}

export default Amis;