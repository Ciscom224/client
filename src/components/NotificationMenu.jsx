// Gestion du menu de notifications
const NotificationMenu = (props) => {
  // Cette fonction permet de gérer le nombre de caractère a afficher dans notre menu (des users) 
  const truncatePseudo = (pseudo) => {
      return pseudo.length > 10 ? pseudo.slice(0, 10) + '...' : pseudo;
    };

  // On met a jour le compteur de notifications + on met a jour notre State de friendRequest
  const  handleOnClick = (indexToRemove,type) => {

    props.setFriendsToAdd(prevFriends => {
        return prevFriends.filter((friend, index) => index !== indexToRemove);
    });
    props.updateCount();
 }   
return props.isClicked ? (
  props.friendsToAdd.length > 0 && (
    <div id="notif" className="flex flex-col justify-center items-center  px-2 py-2 bg-gray-950  bg-opacity-55 rounded-lg max-h-[80vh] ">
      {props.friendsToAdd.map((friend, index) => (  
      <div key={index}  title={friend} className=" flex justify-between items-center w-[348px] bg-[#2e2a2a] p-3 mb-2 rounded-lg bg-opacity-90 ">
        <p className="mr-5 font-semibold text-white ">Demande d'amis de : {truncatePseudo(friend)}</p>
        <div className="flex space-x-2 ">
          <button className="bg-green-500 text-white px-3 py-1  rounded-lg" onClick={() => handleOnClick(index,true)}>Ajouter</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded-lg" onClick={() => handleOnClick(index,false)}>Ignorer</button>
        </div>
      </div>
  ))}
  </div> )
) : null
}

export default NotificationMenu;