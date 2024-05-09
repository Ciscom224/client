import React, { useState } from "react";
import Profile from "./PictureManag/Profile";
import { useForm } from "react-hook-form";

const AmisComp = () =>  {
  // Pour gérer les données du formulaire
  const {
    register,
    handleSubmit,
    formState: {errors},
} = useForm()

  // States permettant de faire les test pour la page classement (amis = liste d'amis, newFriend = les joueurs qu'on peut ajouter)
  const [amis,setAmis] = useState([["Amis1",true],["Amis2",true],["Amis3",true],["Amis4",true],["Amis5",false],["Amis6",false],["Amis7",false],["Amis1",true],["Amis1",true],["Amis1",true],["Amis1",true],["Amis1",true],["Amis1",true],["Amis1",true],["Amis1",true],["Amis1",true]])
  const [newFriend,setNewFriend] = useState(["Farouk","Messi"]) //liste des utilisateurs
  const [message, setMessage] = useState("");
  const [color,setColor] = useState("")

  // On submit, on verifie les données en fonction des states faites au dessus et on compare et on set le message et la couleur pour le message personnalisé
  const onSubmit = (data)=> {
    if (newFriend.includes(data.newFriend)) {
      setMessage("une demande d'ami a été envoyé à "+ data.newFriend)
      setColor("text-green-400")
    }
    else if(amis.some((ami) => ami[0]=== data.newFriend)){
      if (data.newFriend !=="")
      {
        setMessage("Vous avez déja ajouté cet ami")
        setColor("text-gray-400")
      } else {setMessage("")}
    }
    else {
      setMessage("cet utilisateur n'existe pas")
      setColor("text-red-400")
    }

  }
  return (
    <div className="flex">
      <div className="w-[60px] h-[80vh] hover:w-[150px] sm:w-[150px] justify-center items-center  bg-[#292727] rounded-3xl sm:rounded-xl bg-opacity-80 overflow-y-auto overflow-x-hidden">
        <div className=" overflow-y-auto">
        {amis.map((userAmis, index) => (
              <div key={index} className="p-2 mb-2 flex overflow-hidden sm:overflow-auto">
                   <p className="text-sm text-gray-400 min-w-[70px]"><Profile navig={false} classment={true} online={userAmis[1]}/></p>
                   <p className="text-sm  text-gray-400 min-w-[60px] py-3 ">{userAmis[0]}</p>
              </div>
            ))}
            </div>
      </div>
      <div className="flex-1 bg-[#2c2c2c] bg-opacity-60 rounded-lg  ml-2 mr-4 py-10 sm:p-10  ">
        <div className="text-center sm:text-left">
            <div className="text-xl sm:text-4xl">
              <h2 className="text-gray-400 font-bold">Chercher un joueur</h2>
            </div>
            <form action="" className="sm:space-x-6" onSubmit={handleSubmit(onSubmit)}>
              <input
              type="text"
              id="search"
              className="w-2/3 sm:w-1/3 h-1/2 bg-gray-600 text-gray-300  py-2 rounded-md mt-10 focus:outline-none focus:ring focus:ring-blue-900 text-center" placeholder="Pseudo"
              {...register("newFriend")}
              />
              <button type="submit" className="w-2/3 sm:w-20 mt-4 text-white bg-[#555854] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#eeeeed] hover:scale-105 duration-300
                hover:bg-[#4e584f]"
                  > Ajouter</button>
            </form>
            <div className="mt-8"></div>
            {message && <p className={`${color}`}>{message}</p>}
        </div>
      </div>
      </div>
    );
  }

export default AmisComp