import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { GoTrophy } from "react-icons/go";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import React,{useState, useEffect} from "react"
import NotificationMenu from './NotificationMenu';
import { useNavigate } from 'react-router-dom';


function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }
  // Gestion des notifications 
  export default function NotificationIcon(props) {

    // Ces stats nous permettent de tester notre menu de notifications (friendToAdd = les demandes d'amis en cours)
    const [friendsToAdd,setFriendsToAdd] = useState(["1er","Yanis","Cristiano Ronaldo","Farouk","Yanis","Cristiano Ronaldo","Farouk"])
    const [isClicked, setIsClicked] = useState(false);
    const [count,setCount] = useState(friendsToAdd.length) // pour le count des nombres de notifications
    const navigate = useNavigate()

    // MAJ apres avoir vérifier (ignorer ou accepter ) une demande d'amis 
    const updateCount = () => {
      setCount(friendsToAdd.length - 1 );
    }
    // Useeffect pour le cas des clique en dehors du menu ou de l'icon de notfications et donc permet de fermer le menu (identique a celui de profile)
    useEffect(() => {
      
      const handleClickOutside = (event) => {
        
        if (isClicked) {
          
          const button = document.getElementById("icon");
          const icon = document.getElementById(props.type);
          if ( button && !button.contains(event.target) && icon && !icon.contains(event.target)) {
            setIsClicked(false);
          }
      };
    }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    
    }, [isClicked]);

    // On envoie a la page classement si on clique sur le trophée de la navigBar
    const handleClick = () => {
      setIsClicked(!isClicked)
      if (props.type == "classment") {navigate("/classement")}
    }

    return (
      <>
      <IconButton aria-label={notificationsLabel(100)}  onClick={handleClick} id="icon" color="inherit">
        <Badge badgeContent={props.type === "notif" ? count : 0} color="error">
          {props.type == "notif" && <NotificationsOutlinedIcon sx={{ fontSize: 30 }} style={{ color: '#d3dbe8' }}/>}
          {props.type == "msg" && <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 25 }} style={{ color: '#d3dbe8' }}/>}
          {props.type == "classment" && <GoTrophy sx={{ fontSize: 30 }} style={{ color: '#d3dbe8' }}/>}
        </Badge>
      </IconButton>
      {props.type == "notif" && <div className="absolute top-20 right-[0px]  z-[1000000] "><NotificationMenu  isClicked={isClicked} updateCount={updateCount} setFriendsToAdd={setFriendsToAdd} friendsToAdd={friendsToAdd} /> </div>}
      </>
    );
  }