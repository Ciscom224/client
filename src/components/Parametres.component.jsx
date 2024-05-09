  import React, { useState, useEffect } from "react";

  import { useForm } from "react-hook-form";
  import { useSelector } from 'react-redux';
  // Assurez-vous que SpanAlerte est utilisé si nécessaire
  // import { SpanAlerte } from "/Users/charbeltouma/Desktop/aws_3/aws_projet/client/src/components/SpanAlert.jsx";
  import Profile1 from "./PictureManag/Profile1";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useAuthStore, useRemovedMenu } from "../store";



  const ParametresComp = (props) => {
    const userData = useSelector((state) => state.userReducer);
    const setFalse = useRemovedMenu((state) => state.setFalse);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const [pseudo, setPseudo] = useState(userData.surName);
    const [Email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState(localStorage.getItem("password"));
    const [pseudoMessage, setPseudoMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [isDoubleAuthEnabled, setIsDoubleAuthEnabled] = useState(false);
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();


    useEffect(() => {
      setPseudo(userData.pseudo);
      setEmail(userData.email);
      setIsDoubleAuthEnabled(userData.isDoubleAuthEnabled || false);
    }, [userData]);

    
    const onSubmitPseudo = () => {
      console.log(pseudo);
      localStorage.setItem("name", pseudo);
      setPseudoMessage("Vous avez changé votre pseudonyme");
      setEmailMessage("");
      setPasswordMessage("");

      setFalse();
    };

    const onSubmitEmail = () => {
      console.log(Email);
      localStorage.setItem("email", Email);
      setEmailMessage("Vous avez changé votre email");
      setPseudoMessage("");
      setPasswordMessage("");
      setFalse();
    };

    const onSubmitPassword = () => {
      console.log(password);
      localStorage.setItem("password", password);
      setPasswordMessage("Vous avez changé votre mot de passe");
      setPseudoMessage("");
      setEmailMessage("");
      setFalse();
    };

    const handleChange = (setter) => (event) => {
      console.log(event.target.value);
      setter(event.target.value);
    };
    
    const handleToggleDoubleAuth = (event) => {
      //console.log("toggle toggle");
      console.log(event.target.checked);
      setIsDoubleAuthEnabled(event.target.checked);
    };

    return (
      <div className="flex ">
        <div className=" fixed w-full h-full bg-cover bg-center overflow-y-auto">
          <div className="flex  justify-center h-screen">
            <div className=" fixed justify-center  bg-[#D9D9D9] opacity-95  w-full h-2/3 sm:w-1/2  sm:items-left sm:place-items-start rounded-2xl mt-20  py-4 ">
              <img
                className=" hidden sm:block  sm:w-1/4 sm:absolute sm:right-0"
                src="/images/HibouQuizWiz.png"
                alt="HibouQuizWiz"
              />

              <div className=" flex items-center justify-between text-3xl h-1/6 sm:text-4xl sm:ml-5 sm:w-1/2 font-['Carter_One'] font-bold md:text-3xl sm:mt-0">
                <div className="flex flex-grow items-center ml-5 mb-8 mt-5 md:mt-5 sm:mt-8  ">
                  <p className="min-w-[80px] ">
                  <Profile1 navig={true} parametre={true} />
                  </p>
                  <p className="ml-10">Paramètres</p>
                </div>
              </div>

              <div className="flex w-full sm:w-3/4 flex-col  py-2 ">
                <form
                  className=" h-1/6 w-full mb-4 flex flex-col justify-center items-center  "
                  action="/"
                  onSubmit={handleSubmit(onSubmitPseudo)}
                >
                  <div className="w-full px-8 flex flex-col items-start">
                    <p className="text-sm mb-1 text-[#383838] min-w-[60px]">
                      Changer Pseudo
                    </p>
                    <input
                      type="text"
                      name="pseudonyme"
                      {...register("pseudonyme", {
                        required: true,
                        maxLength: 30,
                      })}
                      className="w-3/4 sm:w-2/3 justify-between p-3 md:p-3 sm:p-4 bg-white border border-[#E8DECF] rounded-2xl min-w-[180px]"
                      value={pseudo}
                      onChange={handleChange(setPseudo)}
                    />
                    {pseudoMessage && (
                      <p className="text-lg text[#000000] ">{pseudoMessage}</p>
                    )}
                  </div>
                  <input type="submit" hidden />
                </form>

                <form
                  className="b h-1/6 w-full mb-4 flex flex-col justify-center items-center "
                  action="/"
                  onSubmit={handleSubmit(onSubmitEmail)}
                >
                  <div className="w-full px-8 flex flex-col items-start">
                    <p className="text-sm mb-1 text-[#383838] min-w-[60px] mt-1">
                      Changer votre Email
                    </p>
                    <input
                      type="text"
                      name="email"
                      {...register("email", { required: true, maxLength: 50 })}
                      className="w-3/4  sm:w-2/3 justify-between p-3 md:p-3 sm:p-4 bg-white border border-[#E8DECF] rounded-2xl min-w-[180px]"
                      value={Email}
                      onChange={handleChange(setEmail)}
                    />
                    {emailMessage && (
                      <p className=" text-lg text[#000000] ">{emailMessage}</p>
                    )}
                  </div>
                  <input type="submit" hidden />
                </form>

                <form
                  className="h-1/6 w-full mb-4 flex flex-col justify-center items-center"
                  action="/"
                  onSubmit={handleSubmit(onSubmitPassword)}
                >
                  <div className="w-full px-8 flex flex-col items-start">
                    <p className="text-sm mb-1 text-[#383838] min-w-[60px] mt-1">
                      Changer le mot de passe
                    </p>

                    <input
                      type="password"
                      name="Password"
                      {...register("password", { required: true, maxLength: 30 })}
                      className="w-3/4  sm:w-2/3 justify-between p-3 md:p-3 sm:p-4 bg-white border border-[#E8DECF] rounded-2xl min-w-[180px]"
                      value={password}
                      onChange={handleChange(setPassword)}
                    />

                    {passwordMessage && (
                      <p className=" text-lg text[#000000]">{passwordMessage}</p>
                    )}
                  </div>
                  <input type="submit" hidden />
                </form>

                <label class="inline-flex items-center cursor-pointer ml-7 ">
                  <span class="ml-3 mr-2 text-lg font-medium text-gray-900 ">
                    Double authentification par mail
                  </span>
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked={isDoubleAuthEnabled}
                    onChange={handleToggleDoubleAuth}
                  />
                  <div class="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-700 dark:peer-focus:ring-green-800 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ParametresComp;
