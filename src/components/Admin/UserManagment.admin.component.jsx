import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import usersReducer from "../../reducers/users.reducer";
import { deleteUser } from "../../actions/users.actions";

const UserManagment = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("");
  const usersData = useSelector((state) => state.usersReducer);

  const delUser = (user) => {
    Swal.fire({
      title: "Suppression",
      text: "Voullez vous supprimer ce joueur ?",
      color:"#fff",
      icon: "warning",
      background:"#33322e",
      showCancelButton: true,
      confirmButtonColor: "#D97706",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText:"Annuler"
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: "Suppression Reussit",
           text: user.surName +"a ete supprime !!!.",
          icon: "success",
          background:"#33322e",
          color:"#fff",
          confirmButtonColor:"#D97706"
        });
        dispatch(deleteUser(user._id))
      }
    });
  };
  return (
    <div className="sm:flex ">
      <div className="flex-1  rounded-lg mt-4 mr-4 sm:mt-0 ">
        <div className="p-4">
          <div className="h-[80vh]">
            <div className="flex justify-between">
              <h2 className="text-lg  text-white">Les joueurs </h2>
              <form className="flex items-center max-w-lg ">
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
                    className="bg-black border border-amber-500 text-amber-500 text-sm font-semibold rounded-lg focus:border-amber-500 block w-full ps-10 p-2.5  "
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
            </div>

            <div className="border border-gray-700 mt-2"></div>
            <div className="mt-4"></div>
            {usersData
              .filter((user) =>
                user.surName.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
                <div
                  key={index}
                  className="mb-2 p-4 rounded-md bg-[#4b4848] flex bg-opacity-55 items-center justify-center cursor-pointer hover:bg-opacity-40 hover:drop-shadow-lg

                "
                >
                  <p className="text-sm text-white min-w-[80px]">
                    <img
                      src={user.profilImage}
                      alt="Avatar"
                      className="w-[45px] rounded-full border-2 border-gray-400 "
                      title="Profil"
                      id="Profil"
                    />
                  </p>
                  <p className="text-sm  text-white min-w-[120px] ">
                    {user.surName}
                  </p>
                  <p className="text-sm  text-white  ml-auto">{user.email}</p>
                  <p className="text-lg  text-red-500 w-[100px] ml-auto">
                    <FontAwesomeIcon icon={faTrash} onClick={() => delUser(user)} />
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagment;
