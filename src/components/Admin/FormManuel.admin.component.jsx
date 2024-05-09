import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function FormManuel() {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [choices, setChoices] = useState("");
  const [answers, setAnswers] = useState("");

  const sendQuestion = async (e) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/quiz/addQuestionIn/${category}`,
      withCredentials: true,
      data: {
        text: text,
        choices: choices.split(",").map((choice) => choice.trim()),
        answers: answers.split(",").map((choice) => choice.trim()),
      },
    }).then((res) => {
      toast.success("Question ajoutee !!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setCategory("");
      setText("");
      setChoices("");
      setAnswers("");
    });
  };
  return (
    <>
      <form className="flex justify-between  overflow-hidden mx-4 pt-6">
        <div className="">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
                Categorie
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                className="block appearance-none w-full bg-gray-200 border border-amber-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-amber-500"
                id="grid-state"
                required
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option>Animaux</option>
                <option>Celebrites</option>
                <option>Cinema</option>
                <option>Culture</option>
                <option>Geographie</option>
                <option>Histoire</option>
                <option>Informatique</option>
                <option>Musique</option>
                <option>Sciences</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-3 rounded-md  text-white font-bold w-[55%]">
          <div>
            <label for="chat" class="sr-only">
              Question
            </label>
            <div class="flex items-center px-3 py-2 rounded-lg bg-black ">
              <label htmlFor="text">Question </label>
              <textarea
                id="chat"
                rows="1"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="La question ..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <label for="chat" class="sr-only">
              Choix
            </label>
            <div class="flex items-center px-3 py-2 rounded-lg bg-black ">
              <label htmlFor="text">Choix </label>
              <textarea
                id="chat"
                rows="5"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="choix1,choix2,...,choixn"
                value={choices}
                onChange={(e) => setChoices(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <label for="chat" class="sr-only">
              Reponse
            </label>
            <div class="flex items-center px-3 py-2 rounded-lg bg-black ">
              <label htmlFor="text">Reponse </label>
              <textarea
                id="chat"
                rows="3"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Reponse1,Reponse2,...,Reponsen"
                value={answers}
                onChange={(e) => setAnswers(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <input
            className="shadow bg-amber-700 mt-10 hover:bg-amber-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            value={"Envoyer"}
            onClick={(e) => sendQuestion()}
          />
        </div>
      </form>
      <ToastContainer className="z-60" />
    </>
  );
}
export default FormManuel;
