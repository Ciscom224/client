import { useRef, useState ,useEffect } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import userReducer from "../../reducers/user.reducer";
import {useSelector,useDispatch  } from "react-redux";
import { uploadImg } from "../../actions/user.actions";


// Il existe 3 props possible : props.navig permet de savoir si on est dans la barre de navigation ou pas / props.online : permet de savoir si on est en ligne ou pas pour la page amis
// et le props.classment est la pour gérer la taille de la photo de profil car on l'appelle juste dans la page classement pour l'instant
const Profile1 = (props) => {

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  // ce UseRef va nous permettre de récupérer l'image locale de l'utilisateur s'il en a une et sinon on en met une personnalisé
  // Bien sur quand elle sera connecté au backend on demandera juste la photo car le backend gère déja les photo par défault
  const avatarUrl = useRef(props.avatar ? props.avatar : userData.profilImage)
  const [modalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Fonction lorsqu'on change de photo de profil 
  const updateAvatar = (imgSrc) => {
    dispatch(uploadImg(imgSrc,userData._id))
    avatarUrl.current = imgSrc;
  };
  // Rajout test
  // Fonction pour le cas du menu et savoir si on a cliqué sur la Photo de profil de la navigBar ou pas
  const handlePicture = () => {
    if (props.navig) {
      setIsClicked(!isClicked)
    }
  }

  return (
    
    <div className="flex-col items-center">
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className={` ${props.classment ? 'w-[45px]' : (props.parametre ? 'w-[90px]' : 'w-[60px]')}  rounded-full border-2 border-gray-400 `}
          title="Profil"
          id = "Profil"
          onClick={handlePicture}
        />
        {props.online && <div className="absolute  -bottom-0.5 left-1 right-0 m-auto w-fit  rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-950">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        </div> }
        {props.navig && <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
          
        </button>}
        
      </div>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile1;