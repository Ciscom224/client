import React, { useEffect, useState } from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userReducer from "./../reducers/user.reducer";
import usersReducer from "../reducers/users.reducer";

import { isEmpty } from "../Utils";
import { addFriend, delFriend } from "../actions/user.actions";

function Friends({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const addFriends = (user) => {
    dispatch(addFriend(userData._id, user._id));
    toast.success("Vous avez ajoute " + user.surName + " en tant qu'ami", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const delFriends = (user) => {
    dispatch(delFriend(userData._id, user._id));
    toast.info(
      "Vous avez Supprime " + user.surName + " dans votre liste d'amis",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  useEffect(() => {
    console.log(usersData);
  }, [userData, usersData]);

  return (
    <Drawer
      placement="right"
      open={isOpen}
      onClose={onClose}
      className="p-4 bg-black overflow-x-hidden"
    >
      <div className="mb-2 flex items-center justify-between z-40">
        <Typography variant="h5" color="white" className="antialiased">
          Ami(e)s
        </Typography>
        <IconButton variant="text" color="white" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <hr />
      <ul className="divide-y divide-gray-100 mt-2">
        <li>
          <form className="flex items-center max-w-lg mx-auto">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M14 14a1 1 0 10-2 0v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1a1 1 0 10-2 0v1a5 5 0 005 5h2a5 5 0 005-5v-1zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="bg-gray-50 border border-gray-300 text-orange-300 text-sm font-semibold rounded-lg focus:ring-orange-300 focus:border-orange-300 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Recherche ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </li>
        {!isEmpty(userData.friends) ? (
          usersData.map((user) => {
            for (let i = 0; i < Object.keys(userData.friends).length; i++) {
              if (
                (user._id === userData.friends[i]) &
                (user._id !== userData._id)
              ) {
                return (
                  <li
                    key={user._id}
                    className="flex justify-between gap-x-6 py-2 px-1 mt-2 bg-slate-600 text-white rounded-sm hover:bg-orange-300 cursor-pointer"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        className="h-10 w-10 flex-none rounded-full bg-gray-50"
                        src={user.profilImage}
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-white">
                          {user.surName}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div
                        className="flex gap-4  p-1  text-red"
                        onClick={() => delFriends(user)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </div>

                      <div className="mt-1 flex items-center gap-x-1.5">
                        {user.online ? (
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </div>
                        ) : (
                          <div className="flex-none rounded-full bg-red-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          </div>
                        )}

                        <p className="text-xs leading-5 text-white">Online</p>
                      </div>
                    </div>
                  </li>
                );
              }
            }
          })
        ) : (
          <p>Liste vide </p>
        )}
      </ul>

      <ul className="divide-y divide-gray-100 mt-5">
        <h2 className="text-md text-orange-300  font-semibold">
          Suggessions d'amis
        </h2>
        <hr />
        {!isEmpty(userData.friends)
          ? usersData
              .filter((user) =>
                user.surName.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => {
                if (!userData.friends.includes(user._id) && (user._id !== userData._id)) {
                  return (
                    <li
                      key={user._id}
                      className="flex justify-between gap-x-6 py-2 px-1 mt-2 bg-slate-600 rounded-sm hover:bg-orange-300 cursor-pointer"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-10 w-10 flex-none rounded-full bg-gray-50"
                          src={user.profilImage}
                          alt=""
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-white">
                            {user.surName}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div
                          className="flex gap-4 bg-amber-700 p-1 rounded-full text-white"
                          onClick={() => addFriends(user)}
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                        </div>

                        <div className="mt-1 flex items-center gap-x-1.5">
                          {user.online ? (
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                          ) : (
                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            </div>
                          )}

                          <p className="text-xs leading-5 text-white">Online</p>
                        </div>
                      </div>
                    </li>
                  );
                }
              })
          :
          !isEmpty(usersData) &&
          usersData
              .filter((user) =>
                user.surName.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => {
              
                if (user._id !== userData._id) {
                  return (
                    <li
                      key={user._id}
                      className="flex justify-between gap-x-6 py-2 px-1 mt-2 bg-slate-600 rounded-sm hover:bg-orange-300 cursor-pointer"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-10 w-10 flex-none rounded-full bg-gray-50"
                          src={user.profilImage}
                          alt=""
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-white">
                            {user.surName}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div
                          className="flex gap-4 bg-amber-700 p-1 rounded-full text-white"
                          onClick={() => addFriends(user)}
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                        </div>

                        <div className="mt-1 flex items-center gap-x-1.5">
                          {user.online ? (
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                          ) : (
                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            </div>
                          )}

                          <p className="text-xs leading-5 text-white">Online</p>
                        </div>
                      </div>
                    </li>
                  );
                }
             
              }) 
          }
      </ul>

      <ToastContainer className="z-60" />
    </Drawer>
  );
}

export default Friends;