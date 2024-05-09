import React, { useState } from "react";
import axios from "axios";
function FormApi(params) {
  const [keyApi, setKey] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);

  const sendQuestion = async () => {
    await axios
      .get(
        `https://api.openquizzdb.org/?key=${keyApi}&categ=${category.toLowerCase()}`
      )
      .then((res) => {
        const question = res.data.results[0];
        const questionData = {
          text: question.question,
          choices: question.autres_choix,
          answers: [question.reponse_correcte],
        };

        axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/quiz/addQuestionIn/${category}`,
          withCredentials: true,
          data: {
            text: question.question,
            choices: question.autres_choix,
            answers: [question.reponse_correcte],
          },
        }).then((res) => {
          setCount(count + 1);
          console.log(res.status);
        });
        console.log(questionData);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };
  return (
    <form className="flex justify-between  overflow-hidden mx-4 pt-6">
      <div className="">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
              Clé
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-amber-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-500"
              type="text"
              required
              value={keyApi}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        </div>
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
                setCount(0);
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
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-amber-500 hover:bg-amber-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => sendQuestion()}
            >
              Envoyer
            </button>
            <span
              type="button"
              className="py-2 mx-2 bg-green-200  px-2 rounded-xl"
            >
              {count}
            </span>
          </div>
        </div>
      </div>
      <div className="border-2 border-amber-600  px-3 rounded-md bg-black text-white font-bold w-[50%]">
        <h1>
          API URL :{" "}
          <em className="text-amber-500">
            https://api.openquizzdb.org/?key={keyApi}&categ=
            {category.toLowerCase()}
          </em>{" "}
        </h1>
        <hr />
        <p></p>
      </div>
    </form>
  );
}
export default FormApi;
