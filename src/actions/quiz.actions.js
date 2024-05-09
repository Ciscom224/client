import axios from 'axios'

export const GET_QUIZ="GET_QUIZ";

export const getQuiz=()=>{

    return async (dispatch) =>{
        return await axios.get(
            `${process.env.REACT_APP_API_URL}api/quiz/categories`
        ).then((res) =>{
            dispatch({type:GET_QUIZ,payload:res.data})
        })
        .catch((err)=>console.log(err))
    }
}