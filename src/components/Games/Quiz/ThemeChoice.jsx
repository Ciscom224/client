import React,{useState,useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import quizReducer from "../../../reducers/quiz.reducer"
import userReducer from "../../../reducers/user.reducer"
import {useSelector } from "react-redux";
import { useForm } from "react-hook-form";
//import { useSocket } from "../../../pages/App";
import Swal from 'sweetalert2';
import { SocketContext } from "../../../AppContext";





// Ceci represente le composant pour notre choix de jeu qui sera dans la page de menu represente par les images/
const GamesChoice = () => {
  //const socket = useSocket();
  const socket = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    formState: {errors},
} = useForm()

  

  const listeQuiz = ["informatique","animaux","celebrites","cinema","culture","geographie","histoire","musique","sciences","bd","gastronomie","nature","litterature","sport"]
  const [themeSelect,setThemeSelect] = useState([])
  const [isMulti,setIsMulti] = useState(false)
  const [createLob,setCreateLob] = useState(true)
  const [lobbys,setLobbys] = useState([])
  const quizData = useSelector((state) => state.quizReducer);
  const userData = useSelector((state) => state.userReducer);

  const navigate = useNavigate()

  useEffect(() => {
    const getRoomsHandler = (success) => {
        setLobbys(success);
    };

    socket.emit('getRooms', getRoomsHandler);

    return () => {
        socket.off('getRooms', getRoomsHandler);
    };
}, []);

useEffect(() => {
    const lobbyChangedHandler = () => {
        socket.emit('getRooms', (success) => {
            setLobbys(success);
        });
    };

    socket.on('lobby_changed', lobbyChangedHandler);

    return () => {
        socket.off('lobby_changed', lobbyChangedHandler);
    };
}, [socket]);

  const handleThemeSelected = (theme) => {
    const themeIndex = themeSelect.indexOf(theme)
    let updatedThemes
    if (themeIndex !== -1) {updatedThemes = themeSelect.filter((item) => item !== theme)} 
    else {updatedThemes = [...themeSelect, theme]}
    setThemeSelect(updatedThemes)
  }

  function shuffleAll(theme, questions, choices, answers) {
    const n = questions.length;

    const indices = Array.from({ length: n }, (_, index) => index);

    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 

        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const shuffledTheme = [];
    const shuffledQuestions = [];
    const shuffledAnswers = [];
    const shuffledChoices = [];

    // Utilisez indices.length pour itérer sur les indices mélangés
    for (let i = 0; i < indices.length; i++) {
        const newIndex = indices[i];
        const oldIndex = i;

        shuffledTheme[newIndex] = theme[oldIndex];
        shuffledQuestions[newIndex] = questions[oldIndex];
        shuffledAnswers[newIndex] = answers[oldIndex];
        shuffledChoices[newIndex] = choices[oldIndex];
    }

    return { shuffledTheme, shuffledQuestions, shuffledChoices, shuffledAnswers };
}
  function shuffleChoices(choices) {
    
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      shuffleArray(choices[i]);
      shuffleArray(choices[j]);
    }
    return choices;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleMode = () => { 
    const newMulti = !isMulti
    setIsMulti(newMulti)
    if (!newMulti) {setCreateLob(true)}

  }

  const joinRoom = (roomID) => {
    
      socket.emit('join_room',userData._id,userData.surName,userData.profilImage,roomID,(success) => {
        if (success[0]) {
          navigate(`/room/${success[1]}`)
        } else {
          Swal.fire({
            icon: "error",
            color: "#ede6ca",
            background:"#33322e",
            title: "Impossible de rejoindre cette room...",
            text: success[1],
          });
        }
      })
    
  }

  const onclick = () => {
    if (themeSelect.length === 0) {
      Swal.fire({
        icon: "warning",
        color: "#ede6ca",
        background:"#33322e",
        title: isMulti ? "Impossible de créer cette room..." : "Impossible de lancer la partie",
        text: isMulti ? "Veuillez sélectionner au moins un thème avant de créer un lobby! " : "Veuillez sélectionner au moins un thème avant de lancer votre partie ! ",
      });
      return;
    }
    
    let questionsTheme = []
    let questionsTexts = []
    let questionsChoices = []
    let questionsAnswers = []
    let selectedQuestionIndices = new Set();
    const totalTheme = themeSelect.length
    const questionsperTheme = Math.floor(20 / totalTheme)
    let remainingQuestions = 20 % totalTheme


    themeSelect.forEach((theme) => {
      
      const index = listeQuiz.indexOf(theme)
      const selectedQuizData = quizData[index]

      const themeQuestions = selectedQuizData.questions

      const questionsForThisTheme = questionsperTheme + (remainingQuestions > 0 ? 1 : 0)
      if (remainingQuestions > 0) {remainingQuestions = remainingQuestions-1}

      while (selectedQuestionIndices.size < questionsForThisTheme) {
        const randomIndex = Math.floor(Math.random() * themeQuestions.length);
        if (!selectedQuestionIndices.has(randomIndex)) {
            selectedQuestionIndices.add(randomIndex);

            const selectedQuestion = themeQuestions[randomIndex];
            questionsTheme.push(theme);
            questionsTexts.push(selectedQuestion.text);
            questionsChoices.push(selectedQuestion.choices);
            questionsAnswers.push(selectedQuestion.answers);
        }
    }
    selectedQuestionIndices = new Set()
    })

    const shuffleResult = shuffleAll(questionsTheme, questionsTexts, questionsChoices, questionsAnswers);

    questionsTheme = shuffleResult.shuffledTheme;
    questionsTexts = shuffleResult.shuffledQuestions;
    questionsChoices = shuffleResult.shuffledChoices;
    questionsAnswers = shuffleResult.shuffledAnswers;

   
      questionsChoices = shuffleChoices(questionsChoices)
      if (isMulti) {
        if (createLob)
        { 
          socket.emit('create_room',userData._id,userData.surName,userData.profilImage,themeSelect,questionsTheme,questionsTexts,questionsChoices,questionsAnswers,(success) => {
            if (success) {navigate(`/room/${success}`)}
            else {
              Swal.fire({
                icon: "error",
                color: "#ede6ca",
                background:"#33322e",
                title: "Impossible de créer une room...",
                text: "Vous etes déja inscrit dans une autre room déja existante, veuillez vous déconnecter de celle ci d'abord!",
              });
            }
          });
        }
      }
      else {
        navigate(`/games/quiz/${0}`,{
          state: {
            questions:questionsTexts,
            choice:questionsChoices,
            answers:questionsAnswers,
            theme:questionsTheme,
            multi:false,
          }
        })
      }  
  
  }
    return(

      <>
        <div className="items-center justify-center flex flex-col py-8 space-y-8 sm:space-x-8 sm:space-y-0 sm:flex-row ">
          <p className="font-bold text-2xl sm:text-4xl text-[#070707] text-shadow" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            {(isMulti && !createLob) ? "Lobby Multi" : "Choisit ton Quiz"}
          </p>
          <button className={`mt-1 px-5 py-2.5 border border-[#b3abab] rounded-lg bg-[#3db967]  bg-opacity-60`} onClick={handleMode}>{isMulti ? "Multijoueur" : "Solo"}</button>
          <button className="mt-1  px-5 py-2.5 border border-[#b3abab] rounded-lg bg-[#99458b]" onClick={() => {onclick()}} disabled={createLob ? false : true}>{isMulti ? "Créer le lobby" : "Lancer la partie"}</button>
          {isMulti && <button className="mt-1  px-5 py-2.5 border border-[#b3abab] rounded-lg bg-[#bd74b1]" onClick={() => {setCreateLob(!createLob)}} >{createLob ? "Voir les lobbys":"Choix de Quiz"}</button>}
          
        </div>
        
       {createLob ?
       <div className="flex flex-col items-center justify-center">
          <div className="m-4  items-center justify-center py-16 px-10 flex flex-wrap ml-20 ">
            <img src="/images/Themes/histoire.png" alt="bug" className={`w-[200px]  rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10  ${themeSelect.includes("histoire") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("histoire")}/>
            <img src="/images/Themes/musique.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("musique") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("musique")}/>
            <img src="/images/Themes/culture.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("culture") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("culture")}/>
            <img src="/images/Themes/geographie.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300  mr-12 cursor-pointer mb-10 ${themeSelect.includes("geographie") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("geographie")}/>
            <img src="/images/Themes/animaux.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("animaux") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("animaux")}/>
            <img src="/images/Themes/celebrites.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("celebrites") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("celebrites")}/>
            <img src="/images/Themes/cinema.png" alt="bug" className={`w-[200px]  rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("cinema") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("cinema")}/>
            <img src="/images/Themes/informatique.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("informatique") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("informatique")}/>
            <img src="/images/Themes/bd.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("bd") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("bd")}/>
            <img src="/images/Themes/gastronomie.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("gastronomie") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("gastronomie")}/>
            <img src="/images/Themes/nature.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("nature") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("nature")}/>
            <img src="/images/Themes/litterature.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("litterature") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("litterature")}/>
            <img src="/images/Themes/sport.png" alt="bug" className={`w-[200px] rounded-2xl hover:scale-105 duration-300 mr-12 cursor-pointer mb-10 ${themeSelect.includes("sport") && "border-4 border-[#48ff70]" }`} onClick={() => handleThemeSelected("sport")}/>
        </div>

        </div> : 
        <div className="flex flex-col">
        <div className="m-4  py-16 px-10 flex flex-wrap space-x-10 ">
          {lobbys.map((lobby, index) => (
              <div key={index} className=" rounded-md p-6 mb-3 bg-white bg-opacity-60 border-none flex flex-col space-y-6 ">
                   <p className="text-md font-bold  text-black ml-2">Host : {lobby[0][0][0]} </p>
                   <p className="text-md text-black ml-2 break-normal">Joueurs : {lobby[0].length} / 5 </p>
                   <button className="mt-1  px-5 py-2.5 border border-[#b3abab] rounded-lg bg-[#338645]" onClick={() => {joinRoom(lobby[1])}}>Rejoindre</button>

              </div> ))}
      </div>

      </div>
        }
        </>

       
    );
}

export default GamesChoice