import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { sendAuthMail } from "../SendMailConfirm";
import EmailConfirmation from "./EmailConfirmation";
import { SpanAlerte } from "../SpanAlert";
import { GrClose } from "react-icons/gr";
import { useRemovedMenu } from "../../store";

// notre page d'inscription, qui ressemble beaucoup a celle du Login.
const InscriptionC = (props) => {

    const [login,setLogin] = useState(true)
    const [pseudo,setPseudo] = useState("")
    const [codeVal,setCodeVal] = useState(0)

    const setFalse = useRemovedMenu((state)=> state.setFalse);


    // Watch ici permet de vérifier une valeur de notre register
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
    } = useForm()

    const handleLogin = () => {
        setLogin(!login)
    }
    const handleOnClose= ()=> {
        props.onClose()
        setFalse()
        
    }

    // Fonction du submit de l'inscription qui envoie un mail avec un code généré aléatoirement au mail de l'inscription et qui doit le vérifier pour s'inscrire 
    const onSubmit = async (data) => {
    
        if (watch("password") == watch("confirmpassword")) { try {
        const code = Math.floor(Math.random() * 1000000);
        await sendAuthMail(data.email,code);
        setCodeVal(code)
        setPseudo(data.pseudonyme)
        handleLogin()
        } catch(err) {
            console.log(err)
        }
    }
    else {alert("Mauvaise entrée de mot de passe ou de la confirmation")}
}
    return props.trigger ?
    <>
        {login && <div className="fixed inset-0 flex ">
        
        <div className="flex flex-col w-full items-center justify-center mx-auto sm:max-w-md lg:py-0">
        
            <div className="w-full bg-white sm:rounded-lg shadow dark:border  xl:p-0 dark:bg-[#FFFFFF] dark:bg-opacity-0 sm:dark:bg-opacity-10 dark:border-transparent h-full sm:h-auto mt-[95px]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                <button onClick={handleOnClose} className="absolute top-0 right-0 rounded-full bg-[#FFFFFF] bg-opacity-10 w-10 h-10 items-center sm:flex justify-center transform translate-x-1/2 -translate-y-1/2 hover:bg-[#a84040] hidden sm:block"
                ><GrClose className="text-[#ffffff]"/></button>
                
              
              <form className="py-[25%] sm:p-0 space-y-6 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)} >
                  <div>
                      <input type="text" name="pseudonyme" id="pseudonyme"
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("pseudonyme",{required: true,maxLength:30})} 
                      className="bg-gray-50 border border-gray-300 text-[#313030] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#FFFFFF] dark:border-gray-600 dark:placeholder-[#474444] dark:text-[#474444] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Identifiant"/>
                   {errors.pseudonyme && errors.pseudonyme.type === "required" && (
                            <SpanAlerte message = "Pseudonyme requis"/>
                        )}
                  </div>
                  <div>
                      
                      <input type="text" name="email" id="email" 
                      {...register("email",{required: true,maxLength:30})} placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#FFFFFF] dark:border-gray-600 dark:placeholder-[#474444] dark:text-[#474444] dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    {errors.email && errors.email.type === "required" && (
                            <SpanAlerte message = "Email requis"/>
                        )}
                  </div>
                  <div>
                      
                      <input type="password" name="password" id="password" 
                      {...register("password",{required: true,maxLength:30})} placeholder="Mot de passe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#FFFFFF] dark:border-gray-600 dark:placeholder-[#474444] dark:text-[#474444] dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  {errors.password && errors.password.type === "required" && (
                            <SpanAlerte message = "Mot de passe requis"/>
                        )}
                  </div>
                  <div>
                      
                      <input type="password" name="confirmpassword" 
                      {...register("confirmpassword",{required: true,maxLength:30})} id="Confirmpassword" placeholder="Confirmation du mot de passe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#FFFFFF] dark:border-gray-600 dark:placeholder-[#474444] dark:text-[#474444] dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  {errors.confirmpassword && errors.confirmpassword.type === "required" && (
                           <SpanAlerte message = "Confirmation de Mot de passe requis"/>
                        )}
                     {!errors.confirmpassword && watch("password") !== watch("confirmpassword") && (
                            <SpanAlerte message = "Les mots de passe ne correspondent pas"/>
                        )}
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-[#fcfafa]">Se souvenir de moi</label>
                          </div>
                      </div>
                  </div>
                  <p className="text-sm font-light text-gray-500  dark:text-[#fffffe]">
                      Déja inscris ? <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-[#fffefc]" onClick={props.toLogin} >Cliquez ici</a>
                  </p>
                  <button type="submit"    className="w-full text-white bg-[#2f9421] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#eeeeed] hover:scale-105 duration-300
                  hover:bg-[#245e2c]"  >Inscription</button>
                  <button onClick={handleOnClose} className="w-full text-white bg-[#af2323] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#eeeeed] hover:scale-105 duration-300
                  hover:bg-[#581e16] sm:hidden"
                  >Fermer</button>
              </form>
          
          </div>
      </div>
  </div>
  </div>
}
{!login && <EmailConfirmation code = {codeVal} pseudonyme = {pseudo} onClose = {props.onClose} />}
  </>
     : "";
}

export default InscriptionC