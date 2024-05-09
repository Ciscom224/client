import React, { useEffect, useState,useContext } from "react";
import userReducer from "../reducers/user.reducer"
import {useSelector } from "react-redux";
import Profile1 from "./PictureManag/Profile1";
import { useLocation, useNavigate,useParams} from "react-router-dom";
// import { useSocket } from "../pages/App";
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import { BiSolidUserDetail } from "react-icons/bi";
import { SocketContext } from "../AppContext";



const RoomLobby = ({socket}) =>  {
    const userData = useSelector((state) => state.userReducer);
    const [users,setUsers] = useState([])
    const [connected,setConnected] = useState(true)
    const [themeSelect,setThemeSelect] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()
    // const socket = useSocket();
    const location = useLocation()
  
    useEffect(() => {
      socket.emit('getRoom',id,"RoomLobby 1",(success) => {
        setUsers(success[0])
        setThemeSelect(success[1])
      })
    }, []);

    useEffect(() => {
      const lobbyChangedHandler = () => {
        socket.emit('getRoom', id, "RoomLobby 2", (success) => {
          setUsers(success[0])
          setThemeSelect(success[1])
        });
      };
      const gameStartedHandler = () => {
        socket.emit('getQuiz', id, (success) => {
          socket.emit('getRoom', id, "RoomLobby 3", (updatedUsers) => {
            navigate(`/games/quiz/${id}`, {
              state: {
                questions: success[0],
                choice: success[1],
                answers: success[2],
                theme: success[3],
                multi: true,
                usersData: updatedUsers[0]
              }
            });
          });
        });
      };
      const kickHandler =(username,roomID) => {
          if (userData.surName === username){
          socket.emit('disconnected',userData._id,id,"RoomLobby 1");
          if(location.pathname === `/room/${roomID}`){
            Swal.fire({
            icon: "error",
            color: "#ede6ca",
            background:"#33322e",
            title: "Vous avez été kick...",
          });
          navigate("/games/quizchoice")
        }
         }
      }
      socket.on('playerKicked', kickHandler);
      socket.on('lobby_changed', lobbyChangedHandler);
      socket.on('game_started', gameStartedHandler);
      
      return () => {
        //socket.off('playerKicked', kickHandler);
        socket.off('lobby_changed', lobbyChangedHandler);
        socket.off('game_started', gameStartedHandler);
      };

    }, [socket]);

    const handleConnected = () => {
      setConnected(!connected)
    }
    const handleKick =  (username) => {
      socket.emit('kick',id,username);
    }
    const handleDisconnect =() => {
      socket.emit('disconnected',userData._id,id, "RoomLobby 2");
      if (users.length === 1) {
        socket.emit('deleteRoom',id);}
      navigate('/games')
    }
    const onclick = () => {
      socket.emit('start_game',id,(success) => {
        if(!success) {
          Swal.fire({
            icon: "warning",
            color: "#ede6ca",
            background:"#33322e",
            title: "Impossible de lancer la partie",
            text: "La partie doit avoir au moins 2 joueurs pour se lancer !",
          });
        } else {
          socket.emit('getQuiz',id,(quiz) => {
            navigate(`/games/quiz/${id}`,{
              state: {
                questions:quiz[0],
                choice:quiz[1],
                answers:quiz[2],
                theme:quiz[3],
                multi:true,
                usersData:users
              }
            })
          })
        }
      })
    }
    return (
      <>
    <div className="sm:flex ">
    <div className="sm:hidden"><BiSolidUserDetail className={` ${connected ? "right-[5%]" : "right-[91%]" } top-[50%] bg-white bg-opacity-80  text-4xl text-white`} onClick={handleConnected}/></div>
    {connected ? <div className="w-[90%] sm:w-[300px] h-screen bg-[#2c2c2c] bg-opacity-80">
         
        <div className=" h-[92vh] overflow-y-auto">
          <p className="flex mb-2 p-4 text-white font-bold text-2xl">Joueurs Connecté : </p>
          {users.map((user, index) => (
          
            <div className=" p-3 mx-2 mb-2 rounded-md bg-[#4b4848] flex flex-col bg-opacity-65 items-center justify-center  hover:bg-opacity-55 px-4">
              
              <div className="flex flex-row items-center">
                {userData.surName === users[0][0] && userData.surName !== user[0] &&
                  <p className="rounded-full min-w-[20px] mr-5 bg-[#726969] cursor-pointer" onClick={() => handleKick(user[0])}><IoClose style={{ fontSize: '28px', color: 'red' }}/></p>
                }
                <p className="text-sm text-white min-w-[60px] "><Profile1 avatar={user[1]} navig={false} classment={true} /> </p>
                <p className="text-sm text-white min-w-[80px] font-bold  ">{user[0]} </p>
              </div>
            </div>
       
            ))}
        </div>
      </div> : <div className="absolute h-[92vh] w-[1%] bg-[#2c2c2c] sm:hidden"></div>}
      
      

      <div className="flex-1 h-screen overflow-y-auto">
        <div className=" flex py-8 space-y-8 sm:space-x-8 sm:space-y-0 flex-col px-2 sm:px-0 sm:flex-row sm:items-center justify-center ">
          
          <button className="mt-1 px-5 py-2.5 border border-[#b3abab] rounded-lg bg-amber-600" onClick={onclick}>Lancer la partie</button>
          <button className="mt-1 px-5 py-2.5 border border-[#b3abab] rounded-lg bg-[#ce2e2e]" onClick={handleDisconnect}>Quitter la Room</button>
        </div>
        <div className="items-center justify-center flex">
          <p className="font-bold text-2xl sm:text-4xl text-white text-shadow" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Voici les Thèmes selectionné :
          </p>
        </div>
        <div className="flex flex-col items-center justify-center ">
        <div className="m-4  items-center justify-center py-16 px-10 flex flex-wrap ml-20 ">
          {themeSelect.map((theme, index) => (
            <img key={index} src={`/images/Themes/${theme}.png`} alt="bug" className={`w-[200px]  rounded-2xl  mr-12  mb-10 `}/>
          ))}
        </div>
        </div>
    

      </div>
    </div>
      </>
    );
  }

export default RoomLobby