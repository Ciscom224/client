import { useState,useEffect, useRef  } from "react"
import { useForm } from "react-hook-form"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { FormControlLabel, Radio, styled} from '@mui/material';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Profile1 from "../../PictureManag/Profile1";
import HeighPage from "../../HeighPage";
import { useSocket } from "../../../pages/App";
import userReducer from "../../../reducers/user.reducer";
import {useSelector, useDispatch } from "react-redux";
import { FaCrown } from "react-icons/fa";
import Swal from 'sweetalert2';
import { updateScore } from "../../../actions/users.actions";




const QuizForm = () => {
  const socket = useSocket();
  const userData = useSelector((state) => state.userReducer);
  const location = useLocation()
  const { questions, choice, answers, theme , multi , usersData } = location.state;
  const distancePy = HeighPage()
  const [messages,setMessages] = useState([])
  const dispatch = useDispatch();
  const {id} = useParams()
  const {
      register,
      handleSubmit,
  } = useForm()

  const { handleSubmit: handleSubmit2, register: register2 ,reset} = useForm();
  const navigate = useNavigate()


  // Appelle des variables et fonctions necessaire de notre Store


  const [points,setPoints] = useState(0)
  const [totalPoints,setTotalPoints] = useState(0)

  // States permettant la gestion de notre jeu
  const [users,setUsers] = useState(usersData)
  const [usersReady,setUsersReady] = useState(Array.from({ length: userData.length }, () => false))
  const [progressValue,setProgressValue] = useState(1)
  const [selectedValues, setSelectedValues] = useState([]);
  const [countdown, setCountdown] = useState(10);
  const [color,setColor] = useState("border-amber-600")
  const [inGame,setInGame] = useState(true)
  const [allReady,setAllReady] = useState(multi ? false : true)
  const [isDisable,setIsDisable] = useState(false)
  const countdownRef = useRef(countdown);

  const messagesContainerRef = useRef(null);
    
  // Gestion de déconnexion en cas de changement de URL (reload ou navigate)
  function unloadEventHandler() {
    socket.emit('disconnected', userData._id,id, "reload");
    if (multi && (userData.surName === users[0][0])) {
        socket.emit('deleteRoom', id);
    }
    // Désactivez les écouteurs d'événements
    socket.off('disconnected');
    socket.off('deleteRoom');
}
  function navigateEventHandler(event) {
    socket.emit('disconnected', userData._id,id, "navigate");
    if (multi && (userData.surName === users[0][0])) {
        socket.emit('deleteRoom', id);
    }
}

useEffect(() => {
  countdownRef.current = countdown;
}, [countdown]);

useEffect(() => {
  window.navigation.addEventListener("navigate", navigateEventHandler);
  window.onbeforeunload = unloadEventHandler;

  return () => {
      window.navigation.removeEventListener("navigate", navigateEventHandler);
      window.onbeforeunload = null;
      socket.off('disconnected');
      socket.off('deleteRoom');
  };
}, []);

  

  // Pour mettre a jour le temps 
    useEffect(() => {

      // on met en place un Timeout avec le countdown pour faire un useEffect toutes les secondes
      if (allReady) {
        const timer = setTimeout(() => {
          if (countdownRef.current > 0) {
            setCountdown(prevCountdown => prevCountdown - 1);

          }
          else {
            setColor("border-[#008000]");
            setIsDisable(true);
            if (multi) {
              if (JSON.stringify(selectedValues) === JSON.stringify(answers[progressValue-1])) {
                socket.emit('new_border',id,userData.surName,"border-[#21F214]");
                socket.emit('new_points',id,userData.surName,points);
                
              } else {
                if (inGame) {socket.emit('new_border',id,userData.surName,"border-[#F82205]");}
              }
              socket.emit('getRoom',id,"quizForm (afterSubmit)",(updatedUsers) => {
                setUsers(updatedUsers[0]);
              })
            }
              
              

            setTimeout(() => {
              setColor("border-amber-600");
              setSelectedValues([]);
              if (multi) {
                socket.emit('new_border',id,userData.surName,"border-transparent");
                socket.emit('getRoom',id,inGame,(updatedUsers) => {
                  setUsers(updatedUsers[0]);
                });
                socket.emit('reset_submit',id);
              }
              if (progressValue!==20)
              {
                setProgressValue(progressValue+1);
                setCountdown(10);
              }
              else {
                setInGame(false);
                dispatch(updateScore(userData._id,"Quiz",totalPoints))
              }

              setIsDisable(false)
             

              
        
            }, multi ? 1000 : 2000);
          
          }
     
      }
      
              , 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown,inGame,allReady]);

  useEffect(() => {
    if(multi){messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;}
  }, [messages]);

  useEffect(() => {
    if(multi){const colorChangedHandler = () => {
        socket.emit('getRoom', id, "quizForm color_changed", (updatedUsers) => {
            setUsers(updatedUsers[0]);
        });
    };

    const roomDeletedHandler = () => {
      socket.emit('disconnected',id,"RoomDelete");
      navigate("/games/quizchoice");
  };

  const ReadyHandler = (value) => {
    console.log(id)
    socket.emit('getRoom',id,"quizForm ",(updatedUsers) => {
      if(updatedUsers){
        setUsers(updatedUsers[0]);
        setUsersReady(updatedUsers[2])
      }
    })
    if (value) {
      setAllReady(true);
    }
};

    const lobbyChangedHandler = () => {
        socket.emit('getRoom', id, "quizForm lobby_changed", (updatedUsers) => {
          if (updatedUsers) {setUsers(updatedUsers[0]);}
          else {
            Swal.fire({
              icon: "error",
              color: "#ede6ca",
              background:"#33322e",
              title: "Room supprimé",
              text: "Le host a quitté le lobby ! ",
            });
          }
        });
    };

    const allSubmitHandler = () => {
        setCountdown(0);
        socket.emit('getRoom', id, "quizForm allSubmit", (updatedUsers) => {
          setUsers(updatedUsers[0]);
      });
    };

    socket.on('color_changed', colorChangedHandler);
    socket.on('lobby_changed', lobbyChangedHandler);
    socket.on('roomDeleted', roomDeletedHandler);
    socket.on('allSubmit', allSubmitHandler);
    socket.on('allReady', () => ReadyHandler(true));
    socket.on('newReady', () => ReadyHandler(false));

    return () => {
        socket.off('color_changed', colorChangedHandler);
        socket.off('lobby_changed', lobbyChangedHandler);
        socket.off('allSubmit', allSubmitHandler);
        socket.off('allReady', () => ReadyHandler(true));
        socket.off('newReady', () => ReadyHandler(false));
    };}

}, [socket,inGame,countdown]);

useEffect(() => {

  socket.on('message', (updatedM) => {
    setMessages(updatedM);
  });

  return () => {
    socket.off("message");
  };
}, []);


    
    // La barre de progression qui nous permet de gérer le temps restant des questions
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? '#D97706' : '#308fe8',
        },
      }));
    
    // Fonction pour le clique des boutons a la fin de la game ou on reset les points et on renvoie en fonction du choix
    const handleOnClick = (button) => {
      socket.emit('disconnected',userData._id,id);
      if (multi && (userData.surName === users[0][0])) {
        
        socket.emit('deleteRoom',id);
      }
     
        setPoints(0)
        setTotalPoints(0)
        if (button ==="menu") {navigate("/")}
        else {navigate("/games")}
    }
    // cette fonction permet de gérer les values selectionnées dans notre formulaire (des Radio)
    const handleChange =(value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((item) => item !== value));
          } else {
            setSelectedValues([...selectedValues, value]);
          }
    }
    const pushReady = () => {
      socket.emit('ready',userData._id,id,(success) => {
        socket.emit('getRoom',id,"quizForm (afterSubmit)",(updatedUsers) => {
         
          setUsers(updatedUsers[0]);
          setUsersReady(updatedUsers[2])
          
        })
        if (success) {
          setAllReady(true)
        }
      });
    }
    const onSubmit2 = (data) => {
      const updatedMessages = [...messages, [userData.surName, data.message]];
      setMessages(updatedMessages)
      socket.emit('send_message',updatedMessages,id);
      reset()
    }
    // Fonction du submit, ou on met en place le submit pour chaque question et on calcule les points + le countdown 
    const onSubmit =  () => {
       setIsDisable(true)
      if (JSON.stringify(selectedValues) === JSON.stringify(answers[progressValue-1])) {
         setPoints(10+countdown)
         setTotalPoints(totalPoints+10+countdown)
      } else {
      }
      if (!multi) {
         setColor("border-[#008000]")
         setTimeout(() => {
           setCountdown(10);
        
        
        if (progressValue !== 20) {
           setProgressValue(progressValue+1)
        }
        else  {
           setInGame(false)
           dispatch(updateScore(userData._id,"Quiz",totalPoints))
        }
         setSelectedValues([])
         setColor("border-amber-600");
         setIsDisable(false)
      }, 2000);
    } else {
       socket.emit('new_border',id,userData.surName,"border-[#ADA3A1]", (success) => {
        console.log("Question "+progressValue + " : " + success)
        if (success) {
           setCountdown(0);
        }
      })
      socket.emit('getRoom',id,"QuizForm afterSubmit",(updatedUsers) => {
        setUsers(updatedUsers[0])
      })
      
    }
    
        

    }
    // MULTI
      return  (
        <>
        <div className="inset-0 flex">
        
        <div className="  sm:mt-5 mx-auto  sm:max-w-md  lg:py-0  w-full ">
        {inGame && allReady ? <> 
            <div className={`w-full sm:mt-10 h-screen ${distancePy < 73 ? "space-y-2" : "space-y-5"} bg-black sm:rounded-lg shadow bg-opacity-75  sm:h-auto `}>
            
                <h2 className="font-bold px-3  text-md text-x sm:text-xl text-white text-shadow">Thème : {theme[progressValue-1]}</h2>
                <p className="font-bold px-3  text-md sm:text-xl text-white text-shadow hidden sm:block">Question {progressValue} / 20</p>
                <div className="px-5 w-[80%] "><BorderLinearProgress variant="determinate" value={100 - Math.floor((10 - countdown) / 10 * 100)} />
                <p className=" sm:hidden">{progressValue} / 20</p>
                </div>
                
                <div className={`px-8 py-4 space-y-4 ${distancePy < 73 ? "space-y-0" : "space-y-5"}  relative `}>
                <p className={`font-bold ${distancePy < 73 ? "text-sm" : "text-md"} text-white text-shadow h-12`}>{questions[progressValue-1]} </p>
                
                <div 
                    className={`absolute  ${distancePy < 73 ? "top-16" : "top-8"} right-0  flex  justify-center  translate-x-1/2 -translate-y-[130%] `}>
                         <img src="/images/HibouQuizWiz.png" alt="bug" className="w-1/3 cursor-pointer hidden sm:block "/>
                </div>
               
              
              <form className={`flex flex-wrap sm:h-auto ${distancePy < 73 ? "space-y-2" : "space-y-6 py-10"}`} action="#"  onSubmit={handleSubmit(onSubmit)} style={{color:"white !important"}}>
             
                <FormControlLabel className={` border-2 rounded-lg text-white ${answers[progressValue-1][0].includes(choice[progressValue-1][0]) ? color : "border-amber-600"} w-full`} value="b" control={<Radio disabled={isDisable} sx={{ color: "white",'&.Mui-checked': { color: '#D97706',}}} onClick={() => handleChange(choice[progressValue-1][0])} checked={selectedValues.includes(choice[progressValue-1][0])}/>} label={<span style={{ color: "white" }}> {choice[progressValue-1][0]} </span>} />
                <FormControlLabel className={` border-2 rounded-lg text-white ${answers[progressValue-1][0].includes(choice[progressValue-1][1]) ? color : "border-amber-600"} w-full`} value="c" control={<Radio disabled={isDisable} sx={{ color: "white",'&.Mui-checked': { color: '#D97706',}}} onClick={() => handleChange(choice[progressValue-1][1])} checked={selectedValues.includes(choice[progressValue-1][1])}/>} label={<span style={{ color: "white" }}> {choice[progressValue-1][1]} </span>} />
                <FormControlLabel className={` border-2 rounded-lg text-white ${answers[progressValue-1][0].includes(choice[progressValue-1][2]) ? color : "border-amber-600"} w-full`} value="a" control={<Radio disabled={isDisable} sx={{ color: "white",'&.Mui-checked': { color: '#D97706',}}} onClick={() => handleChange(choice[progressValue-1][2])} checked={selectedValues.includes(choice[progressValue-1][2])}/>} label={<span style={{ color: "white" }}> {choice[progressValue-1][2]} </span>} />
                <FormControlLabel className={` border-2 rounded-lg text-white ${answers[progressValue-1][0].includes(choice[progressValue-1][3]) ? color : "border-amber-600"} w-full`} value="d" control={<Radio disabled={isDisable} sx={{ color: "white",'&.Mui-checked': { color: '#D97706',}}} onClick={() => handleChange(choice[progressValue-1][3])} checked={selectedValues.includes(choice[progressValue-1][3])}/>} label={<span style={{ color: "white" }}> {choice[progressValue-1][3]} </span>} />
                <button
                  type="submit"
                  className="fixed bottom-[5%] w-[80%] text-black bg-amber-500  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#000000] hover:scale-105 duration-300 hover:bg-[#afb9b0] sm:relative sm:block sm:left-[70%] sm:mt-10 sm:w-1/3"
                  disabled={isDisable}
                >
                  Valider
                </button>
           
              </form>
          
          </div> 
      </div> </>: allReady && <>
      <div className="w-full bg-black rounded-lg shadow   h-auto mt-[95px] ">
          <div className=" flex  px-3 py-5 ml-10">
            <div className="mr-10"><Profile1 navig={false} classment={false} /></div>
            <p className="font-bold mt-3 text-xl text-white text-shadow ">Votre Score : {totalPoints} </p>
            
          </div>
          <div className="sm:flex sm:flew-wrap">
            <button
                  onClick={() => handleOnClick("menu")}
                  className=" w-full text-black bg-[#d86666] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#000000]  hover:bg-[#b85d5d]   sm:mr-2 sm:mt-2 sm:w-1/2"
                >
                  Revenir au menu
                </button>
                <button
                  onClick={() => handleOnClick("")}
                  className=" w-full text-black bg-amber-500  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-[#000000]  hover:bg-[#305f68]    mt-5 sm:mt-2 sm:w-1/2"
                >
                  Choix de Jeu
                </button>
                </div>
         </div>
        </> }
  </div>

  {multi &&
  <>
  <div className="sm:w-[280px] h-screen bg-transparent mr-5">
  <div className=" h-[92vh] overflow-y-auto py-16">
  
    {users.map((user, index) => (
      <div className={`mb-2 p-4 rounded-md ${(!allReady && usersReady[index]) ? "bg-[#236842]" : "bg-[#4b4848]"  } flex flex-col items-center justify-center border-4 ${user[2] ? user[2] : "border-transparent"}`}>
        <div className="flex flex-row items-center">
          <p className="text-sm text-white min-w-[60px] "><Profile1 avatar={user[1]} navig={false} classment={true} /> </p>
          <p className="text-sm text-white min-w-[80px] font-bold ">{user[0]} </p>
          {userData.surName === user[0] && !allReady && <button className="mt-1  px-5 py-2.5 border border-[#b3abab] rounded-lg bg-[#338645]" onClick={pushReady}>¨Pret</button>}
        </div>
        <p className="text-sm text-white min-w-[80px] ml-[60px] font-bold "> Points : {user[3]}  </p>
      </div>
      ))}
  </div>
</div>
  <div className="h-screen bg-[#292727] w-[300px] overflow-hidden">
      <div className="h-[85vh] overflow-y-auto" ref={messagesContainerRef}>
      {messages.map((userData, index) => (
              <div key={index} className=" rounded-md mb-3 bg-transparent border-none flex">
                    {userData[0] === users[0][0] && <div className="ml-2"><FaCrown style={{ color: '#CAC950',fontSize: '20px'}}/></div>}
                    <p className="text-md text-white ml-2 break-normal">
                      <span className="font-bold text-white">{userData[0]} :</span> {userData[1]}
                    </p>  
              </div>
            ))}
      </div>
    <div className="fixed bottom-[64px] px-2 w-full border-b border-[#8a8b3d]"></div>
    <div className="fixed bottom-2">
      <form onSubmit={handleSubmit2(onSubmit2)} className="w-full">
        <div className="flex items-center border-b  px-2 border-[#8a8b3d] py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2  focus:outline-none"
            type="text"
            placeholder="Entrez votre message..."
            {...register2("message",{required: true})}
          />
          <button
            className="flex-shrink-0 bg-[#8a8b3d] hover:bg-[#8a8b3d] border-[#8a8b3d] hover:border-[#8a8b3d] text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
  </>
  }
  </div>

</>)
  
  }

  export default QuizForm