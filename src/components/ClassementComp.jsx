import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usersReducer from "../reducers/users.reducer";
import { getUsersByScore } from "../Utils";
import { useNavigate } from "react-router-dom";

const ClassementComponent = () => {

  const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();
  const users = useSelector((state) => state.usersReducer);
  const catQuiz = getUsersByScore(users, "Quiz");
  const catGuess = getUsersByScore(users, "GuessR");


  useEffect(() => {
  },[selectedTab]);
  return (
    <div className="sm:flex ">
      <div className="sm:w-[200px] mr-4  bg-[#292727] h-full  bg-opacity-55 ">
        <div
          className={`p-4 text-white cursor-pointer hover:bg-[#4b4848] ${
            selectedTab === 1 && "bg-[#afa9a9] bg-opacity-55"
          }`}
          onClick={() => setSelectedTab(1)}
        >
          Quiz{" "}
        </div>
        <div
          className={`p-4 text-white cursor-pointer hover:bg-[#4b4848] ${
            selectedTab === 2 && "bg-[#afa9a9] bg-opacity-55"
          }`}
          onClick={() => setSelectedTab(2)}
        >
          GuessR{" "}
        </div>
      </div>
      <div className="flex-1  bg-[#2c2c2c] bg-opacity-60 rounded-lg mt-4 mr-4 sm:mt-0 ">
        <div className="p-4 ">
          <div className="h-[55vh] sm:h-[70vh] overflow-y-auto">
            <div className="flex mb-2 p-4">
              <p className="text-sm  text-white min-w-[60px]">Rang</p>
              <p className="text-sm  text-white min-w-[80px]">Profile</p>
              <p className="text-sm  text-white min-w-[120px] ">Joueur</p>
              <p className="text-sm  text-white w-[100px] ml-auto">Score</p>
            </div>
            <div className="border border-gray-700 mt-2"></div>
            <div className="mt-4"></div>
            {
              selectedTab === 1 &&
              catQuiz.map((user, index) => (
                <div
                  key={index}
                  className="mb-2 p-4 rounded-md bg-[#4b4848] flex bg-opacity-55 items-center justify-center cursor-pointer hover:bg-opacity-40 hover:drop-shadow-lg"
                  onClick={() => {navigate("/profil")}}
                >
                  <p className="text-sm text-white min-w-[60px] ">
                    {index + 1}
                  </p>
                  <p className="text-sm text-white min-w-[80px]">
                    <img
                      src={user.profilImage}
                      alt="Avatar"
                      className="w-[45px] rounded-full border-2 border-white "
                      title="Profil"
                      id="Profil"
                    />
                  </p>
                  <p className="text-sm  text-white min-w-[120px] ">
                    {user.surName}
                  </p>
                  <p className="text-sm  text-white w-[100px] ml-auto">
                    {user.score}
                  </p>
                </div>
              ))}
          {
              selectedTab === 2 &&
              catGuess.map((user, index) => (
                <div
                  key={index}
                  className="mb-2 p-4 rounded-md bg-[#4b4848] flex bg-opacity-55 items-center justify-center cursor-pointer hover:bg-opacity-40 hover:drop-shadow-lg"
                >
                  <p className="text-sm text-white min-w-[60px] ">
                    {index + 1}
                  </p>
                  <p className="text-sm text-white min-w-[80px]">
                    <img
                      src={user.profilImage}
                      alt="Avatar"
                      className="w-[45px] rounded-full border-2 border-white "
                      title="Profil"
                      id="Profil"
                    />
                  </p>
                  <p className="text-sm  text-white min-w-[120px] ">
                    {user.surName}
                  </p>
                  <p className="text-sm  text-white w-[100px] ml-auto">
                    {user.score}
                  </p>
                </div>
              ))}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassementComponent;