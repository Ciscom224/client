import React, { useState } from "react";
import {useForm} from "react-hook-form";
import InscriptionC from "./InscriptionC";
import { SpanAlerte } from "../SpanAlert";
import { GrClose } from "react-icons/gr";
// import AlertVariousStates from "./AlerteAuth"
import { useAuthStore, useRemovedMenu } from "../../store";



const ConnexionC = (props) => {

    const [login,setLogin] = useState(true)
    const setFalse = useRemovedMenu((state)=> state.setFalse);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)


    const handleLogin = () => {
        setLogin(!login)
    }

    // Permet de gérer les formulaires (register pour enregistrer,handleSubmit pour soumettre et formState pour les erreurs )
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    // Fonction du submit de notre formulaire avec data les données enregistré par useForm 
    const onSubmit = (data) => {
    
        
        setIsAuthenticated(true);
        localStorage.setItem('name',data.pseudonyme)
        props.onClose()
        setFalse()
        alert("Connexion reussi !!!!!!!!!!!!")

    }

    const handleOnClose= ()=> {
        props.onClose()
        setFalse()
    }

    return props.trigger ?
    <>
        {login && <div className="fixed inset-0 flex ">
        
        <div className="flex flex-col w-full items-center justify-center mx-auto sm:max-w-md lg:py-0">
            
            <div className="w-full bg-white sm:rounded-lg shadow dark:border  xl:p-0 dark:bg-[#FFFFFF] dark:bg-opacity-0 sm:dark:bg-opacity-10 dark:border-transparent h-full sm:h-auto mt-[95px]">
           
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                <button onClick={handleOnClose} className="absolute top-0 right-0 rounded-full bg-[#FFFFFF] bg-opacity-10 w-10 h-10 items-center sm:flex justify-center transform translate-x-1/2 -translate-y-1/2 hover:bg-[#a84040] hidden sm:block"
                ><GrClose className="text-[#ffffff]"/></button>
              <form className="py-[50%] sm:p-0 space-y-6 md:space-y-6 " action="/" onSubmit={handleSubmit(onSubmit)} >
                  <div>
                      {/* <label htmlFor="pseudonyme" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#e0c758]">Pseudonyme</label> */}
                      <input type="text" name="pseudonyme" id="pseudonyme"
                      {...register("pseudonyme",{required: true,maxLength:30})} // on enregistre la donné pseudonyme qui est required et doit faire une taille max de 30 
                      className="bg-gray-50 border border-gray-300 text-[#313030] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#FFFFFF] dark:border-gray-600 dark:placeholder-[#474444] dark:text-[#474444] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Identifiant"/>
                        {errors.pseudonyme && errors.pseudonyme.type === "required" && ( // Ici par exemple on vérifieque si le label pseudo est required et que rien n'a été écris alors on affiche un message en rouge en dessous
                            <SpanAlerte message = "Pseudonyme requis"/>
                        )}
                  </div>
                  <div>
                      {/* <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#e0c758]">Mot de Passe</label> */}
                      <input type="password" name="password" id="password"
                        {...register("password",{required: true,maxLength:30})} 
                        placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#FFFFFF] dark:border-gray-600 dark:placeholder-[#474444] dark:text-[#474444] dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        {errors.password && errors.password.type === "required" && (
                           <SpanAlerte message = "Mot de passe requis"/>
                        )}
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" 
                            {...register("remember")}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-[#fcfafa]">Se souvenir de moi</label>
                          </div>
                      </div>
                      <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-[#fffefc] mr-6" >Mot de passe oublié ?</a>
                  </div>
                  <p className="text-sm font-light text-gray-500  dark:text-[#fffffe]">
                      Créer un compte? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-[#f0efec]" onClick={handleLogin} >Cliquez ici</a>
                  </p>
                  <button type="submit" className="w-full text-white bg-[#2f9421] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#eeeeed] hover:scale-105 duration-300
                  hover:bg-[#245e2c]"
                  >Connexion</button>
                  <button onClick={handleOnClose} className="w-full text-white bg-[#af2323] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#eeeeed] hover:scale-105 duration-300
                  hover:bg-[#581e16] sm:hidden"
                  >Fermer</button>
                  
              </form>

          </div>
      </div>
  </div>
</div>
}
{!login && <InscriptionC trigger={!login} onClose={props.onClose} toLogin={handleLogin} /> }

</>
: "";



                        }


export default ConnexionC