import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "../reducers/user.reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImg } from "../actions/user.actions";

function Settings({ isOpen, onClose }) {
  const userData = useSelector((state) => state.userReducer);
  const [file,setFile]=useState();
  const dispatch=useDispatch();
  const changeImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name",userData.surName);
    data.append("file",file);
    console.log(data)
    dispatch(uploadImg(data,userData._id))
  }
  useEffect(() => {}, []);

  return (
    <Drawer
      placement="right"
      open={isOpen}
      onClose={onClose}
      className="p-4 bg-black overflow-x-hidden"
    >
      <div className="mb-2 flex items-center justify-between z-40">
        <Typography variant="h5" color="white" className="antialiased">
          Paramètres
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
      <form className="flex justify-center flex-col gap-6 p-4" onSubmit={changeImage}>
        <img
          src={userData.profilImage}
          alt="profile"
          className="w-[50%] mx-auto border bg-gray-500 rounded-lg"
        />
        <div className="mb-4">
          <div className="relative">
            <input
              type="file"
              id="guests"
              name="file"
              accept=".jpg , .jpeg , .png"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border  focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
              onChange={(e)=>setFile(e.target.files[0])}
              placeholder="Nom du fichier ..."
              required
              readOnly
            />
            <button
              type="submit"
              class="absolute inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-amber-700 rounded-lg end-2 bottom-2 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
            >
              <FontAwesomeIcon
                icon={faRotateRight}
                className="mx-1 hover:rotate-90"
              />
              Changer
            </button>
          </div>
        </div>
      </form>
    </Drawer>
  );
}

export default Settings;
