import React from "react";
import {useForm} from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { useAuthStore, useRemovedMenu } from "../../store";

// Composant pour la confirmation de mails et de mettre a jour l'authentification (coté locale pour l'instant )
const EmailConfirmation = (props) => {

    const setFalse = useRemovedMenu((state)=> state.setFalse);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const handleOnClose= ()=> {
        props.onClose()
        setFalse()

    }
    // quand on a bien rentré le code d'inscription, on est alors connecté et on met a jour les stores 
    const onSubmit = (data) => {
        if (data.code == props.code) {
            alert("Inscription reussi")
            localStorage.setItem('name',props.pseudonyme)
            setIsAuthenticated(true);
            setFalse()
            props.onClose()
        }
        else {
            alert("Code mauvais veuillez ressayer")
        }

    }
    

    return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center py-16 px-8 ">
        
        <div className="flex flex-col w-full items-center justify-center mx-auto max-w-md md:h-screen lg:py-0">

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-[#FFFFFF] dark:bg-opacity-10 dark:border-transparent">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                <button onClick={handleOnClose}className="absolute top-0 right-0 rounded-full bg-[#FFFFFF] bg-opacity-10 w-10 h-10 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 hover:bg-[#a84040]"
                ><GrClose className="text-[#ffffff]"/></button>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)} >
                  <div>
                      
                      <input type="text" name="code" id="code"
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("code",{required: true,maxLength:30})} 
                      className="bg-gray-50 border border-gray-300 text-[#313030] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#FFFFFF] dark:border-gray-600 dark:placeholder-[#474444] dark:text-[#474444] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="exemple : 54286"/>
                   {errors.code && errors.code.type === "required" && (
                            <span role="alert" className="text-red-500 text-sm ">Code Requis</span>
                        )}
                  </div>
                  <button type="submit" className="w-full text-white bg-[#2f9421] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#eeeeed] hover:scale-105 duration-300
                  hover:bg-[#245e2c]" >Confirmation</button>
              </form>
        
          </div>
      </div>
  </div>
</div>
</div>
    );
};

export default EmailConfirmation