import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "./PictureManag/Profile";
import NotificationIcon from "./NotificationIcon";
import "react-image-crop/dist/ReactCrop.css";

import { UidContext } from "../AppContext";
import AuthUser from "../pages/Auth.page";

// Composant permettant d'afficher la barre de navigation dans notre page
const NavBar = ({setLoginOpen}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const uid = useContext(UidContext);

  useEffect(() => {
    if (uid) setIsLogin(true);
  }, [uid]);
  const closeAuth = () => {
    setOpenAuth(false);
    setLoginOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="py-3 px-7 flex justify-between  items-center bg-[#181717] bg-opacity-65">
        <div className=" text-3xl font-bold flex items-center px-5 ">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="/images/LogoQuizWiz.png"
              alt="Logo"
              className="hidden sm:inline-block"
            />
            <img
              src="/images/LogoNav.png"
              alt="Logo"
              className="sm:hidden"
            />
          </button>
        </div>
        <div className="">
          {!isLogin ? (
            <button>
              <a
                onClick={() =>{
                  setOpenAuth(true)
                  setLoginOpen(true)
                }}
                href="#"
                className="text-gray-300  border-2 border-yellow-500 hover:bg-yellow-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
              >
                Connexion
              </a>
            </button>
          ) : (
            <div className="flex justify-between ">
              <div className="hidden  md:flex mr-4" title="Notifications">
                <NotificationIcon type={"notif"} />
              </div>
              <div className="hidden mr-4 md:flex" title="Messages">
                <NotificationIcon type={"msg"} />
              </div>
              <div className="hidden  md:flex mr-4" title="Classements">
                <NotificationIcon type={"classment"} />
              </div>
              <div className="flex ">
                <Profile
                  setIsLogin={setIsLogin}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {openAuth ? (
        <AuthUser
          setLoginOpen = {setLoginOpen}
          openAuth={openAuth}
          onClose={closeAuth}
          setIsLogin={setIsLogin}
        />
      ) : null}
    </>
  );
};

export default NavBar;
