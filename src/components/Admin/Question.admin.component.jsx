import React, { useEffect, useState } from "react";
import axios from "axios";

import FormApi from "./FormApi.admin.component";
import FormManuel from "./FormManuel.admin.component";
function Question() {
  const [keyApi, setKey] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);
  const [api, setApi] = useState(true);
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
  useEffect(() => {}, [api]);
  return (
    <div>
      <div className="flex items-center justify-center pt-2">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
          <li class="me-2" onClick={() => setApi(true)}>
            <a
              href="#"
              class={`inline-block px-6 py-2 text-white ${
                api ? "bg-amber-600" : "bg-gray-400"
              } rounded-lg`}
              aria-current="page"
            >
              API
            </a>
          </li>
          <li class="me-2" onClick={() => setApi(false)}>
            <a
              href="#"
              class={`inline-block px-6 py-2 text-white ${
                !api ? "bg-amber-600" : "bg-gray-400"
              } rounded-lg`}
            >
              Manuel
            </a>
          </li>
        </ul>
      </div>
      {
        api ?
        <FormApi/>
      :
      <FormManuel/>
      }
  
    </div>
  );
}
export default Question;
