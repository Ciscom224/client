import React, { useEffect, useState,useContext } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import axios from 'axios';
import { UidContext,SocketContext} from '../AppContext';
import { useDispatch } from 'react-redux';

import { getUser } from '../actions/user.actions';
import { getQuiz } from '../actions/quiz.actions';
import Home from './Home.page';
import Games from './Games';
import QuizChoice from './QuizChoice';
import NavBar from '../components/NavBar.component';
import Error from './Error.page';
import Admin from './admin/home.admin.page';
import Classement from './Classement.jsx';
import Quiz from './Quiz.jsx';
import Parametres from './Parametres.pages';
import Profiljoueur from './Profil.page';
import Room from './RoomLobby.jsx';
import io from "socket.io-client"

// export function useSocket() {
//   return useContext(SocketContext);
// }
// OUI 

function App() {
  const socket = io.connect('https://server-aws-9701a1e831ed.herokuapp.com/');
  const socketContextValue = socket;
console.log(socket)
  const dispatch = useDispatch()
  const [uid, setUid] = useState(null)
  const [loginOpen,setLoginOpen] = useState(false)
  useEffect(() => {
    async function checkAuth() {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      }).then((res) => {
        if (res.status !== 200) {
          setUid(res.data)
        }
      })
        .catch((err) => console.log(err));
    }
    checkAuth()

    if (uid) {
      dispatch(getUser(uid))
      dispatch(getQuiz())
    }

  }, [uid])

  return (
    <UidContext.Provider value={uid}>
      <SocketContext.Provider value={socketContextValue}>
        <Router>
          <div className="w-full h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/images/Background/menu_bg.jpg')" }}>
          {window.location.pathname !== '/admin' && <NavBar setLoginOpen={setLoginOpen} loginOpen={loginOpen} uid={uid} />}
            <main >
              <Routes>
                <Route path="/" element={<Home setLoginOpen={setLoginOpen} loginOpen={loginOpen} uid={uid}/>} />
                <Route path="/room/:id" element={uid ? <Room/>: <Navigate to="/" />} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/parametres" element={uid ? <Parametres/>: <Navigate to="/" />} />
                <Route path="/classement" element={uid ? <Classement/>: <Navigate to="/" />} />
                <Route path="/games" element={ uid ? <Games />:<Navigate to="/" />}/>
                <Route path="/games/quiz/:id" element={ uid ? <Quiz />:<Navigate to="/" />}/>
                <Route path="/games/quizchoice" element={ uid ? <QuizChoice />: <Navigate to="/"/>} />
                <Route path="/profil" element={ uid ? <Profiljoueur />: <Navigate to="/"/>} />
                <Route path="*" element={<Error/>} />
              </Routes>
            </main>
          </div>
        </Router>
      </SocketContext.Provider>
    </UidContext.Provider>
  );
}
export default App;