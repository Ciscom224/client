import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';

import Profile1 from "./PictureManag/Profile1";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore, useRemovedMenu } from "../store";
import { Gif } from "@mui/icons-material";



const ProfilComp = (props) => {
    const userData = useSelector((state) => state.userReducer);
    const setFalse = useRemovedMenu((state) => state.setFalse);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const [pseudo, setPseudo] = useState(userData.surName);
    const [scoreQuiz, setScoreQuiz] = useState(2000); 
    const [score60sec, setScore60sec] = useState(16000);
    const navigate = useNavigate();

    const handleOnClickAmis = () => {

      }

    return (
        <div className="flex ">
            <div className=" fixed w-full h-full bg-cover bg-center overflow-y-auto">
                <div className="flex  justify-center h-screen">
                    <div className=" fixed justify-center  bg-[#dadada] opacity-95  w-full h-3/5  sm:h-2/3 md:h-3/4  md:mt-10 md:w-3/5 lg:w-2/5 sm:w-2/3 sm:items-left sm:place-items-start rounded-2xl mt-20  py-4 overflow-y-auto">
                        <img
                            className="hidden custom:block sm:w-1/4 sm:absolute sm:right-0"
                            src="/images/HibouQuizWiz.png"
                            alt="HibouQuizWiz"
                        />

                        <div className=" flex items-center justify-between text-3xl h-1/6 sm:text-4xl sm:ml-5 sm:w-1/2 font-['Carter_One'] font-bold md:text-3xl sm:mt-0">
                            <div className="flex flex-grow items-center mb-8 mt-10 md:mt-5 sm:mt-8 ml-3 ">
                                <p className="min-w-[80px] ">
                                    <Profile1 navig={false} classment={false} />
                                </p>
                                {pseudo}
                            </div>
                        </div>
                        <style jsx>{`
                        .text-shadow {
                            text-shadow:2px 0 #FAB80D, -2px 0 #FAB80D, 0 2px #FAB80D, 0 -2px #FAB80D,
                            1px 1px #FAB80D, -1px -1px #FAB80D, 1px -1px #FAB80D, -1px 1px #FAB80D;
                        }
                        `}</style>
                        <div className="flex w-full sm:w-3/4 flex-col py-2 mt-5 sm:mt-4 ml-0 sm:ml-3">
                            <div className="h-1/6 w-full mb-4 flex flex-col justify-center items-center drop-shadow-xl max-h-650:mb-0">
                                <div className="w-full px-5 sm:px-8 flex flex-col items-start text-shadow">
                                    <div className="flex items-center mb-5 max-h-650:mb-3 min-w-[500px]">
                                        <p className="text-3xl  lg:text-4xl text-[#07159A] min-w-[60px] font-['Carter_One'] font-bold max-h-650:text-2xl ">
                                            Score Quiz : {scoreQuiz}
                                        </p>
                                        {scoreQuiz > score60sec && <img src="/images/fire.gif" alt="feu" className="w-[40px] h-auto mb-1  md:hidden lg:block ml:2" />}
                                    </div>
                                    <div className="flex items-center min-w-[500px]">
                                        <p className="text-3xl lg:text-4xl mb-1 text-[#07159A] min-w-[60px] font-['Carter_One'] font-bold sm:mt-3 text-nowrap mr-2  max-h-650:text-2xl">
                                            Score 60sec : {score60sec}
                                        </p>
                                        {score60sec > scoreQuiz && <img src="/images/fire.gif" alt="feu" className="w-[40px] h-auto mb-1  md:hidden lg:block ml:2" />}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="h-1/6 w-full mb-4 sm:mt-4 flex flex-col justify-center items-center ">
                                <div className="w-full px-5 sm:px-8 flex flex-col items-start">

                                    <p className="text-2xl  mb-4 text-[#000000] min-w-[60px] mt-1 font-['Carter_One'] font-semibold ">
                                        Classement : 12
                                    </p>
                                    <p className="text-2xl  mb-4 text-[#000000] min-w-[60px] mt-1 font-['Carter_One'] font-semibold whitespace-nowrap">
                                        Derniere connexion: il y a 30 min
                                    </p>
                                    <p className="text-2xl  mb-4 text-[#000000] min-w-[60px] mt-1 font-['Carter_One'] font-semibold">
                                        Nombre d’amis: 32
                                    </p>

                                    <div className="w-full mt-4 sm:mt-7 flex sm:flex-row justify-between  space-x-4 max-h-650:mt-3">
                                        <button type="submit" className="text-lg text-[#000000] whitespace-nowrap bg-[#ffffff] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#000000] hover:scale-105 duration-300 hover:bg-[#38a446] " onClick={() => navigate("/amis")}>
                                            List d'amis
                                        </button>
                                        <button type="submit" className="text-lg text-[#000000] whitespace-nowrap  bg-[#ffffff] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#000000] hover:scale-105 duration-300 hover:bg-[#38a446]" onClick={handleOnClickAmis} >
                                            Ajouter ami
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilComp;