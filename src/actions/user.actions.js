import axios from 'axios'

export const GET_USER="GET_USER";
export const UPLOAD_IMG="UPLOAD_IMG";
export const ADD_FRIEND="ADD_FRIEND";
export const DEL_FRIEND="DEL_FRIEND";

export const UPDATE_SCORE="UPDATE_SCORE";


// recuperation des data d'un user 
// params : ID de user
export const getUser=(uid)=>{

    return async (dispatch) =>{
        return await axios.get(
            `${process.env.REACT_APP_API_URL}api/user/${uid}`
        ).then((res) =>{
            dispatch({type:GET_USER,payload:res.data})
        })
        .catch((err)=>console.log(err))
    }
}

// Ajout d'une image au profil

export const uploadImg=(image,id)=>{
    return async (dispatch)=>{
        return await axios
        .post(`${process.env.REACT_APP_API_URL}api/user/uploadImage/${id}`,{image:image})
        .then( async (res)=>{
            return await axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res)=>{
                dispatch({type:UPLOAD_IMG,payload:res.data.profilImage})
            })
            .catch((err)=>console.log(err))
        })
    }
}

export const addFriend=(id,idFriend)=>{
    return async (dispatch) => {
        return await axios({
            method:'patch',
            url:`${process.env.REACT_APP_API_URL}api/user/addFriend/${id}`,
            data:{idFriend}
        })
        .then((res)=>{
            dispatch({type:ADD_FRIEND,payload:{idFriend}})
        })
        .catch((err)=>console.log(err))
        
    }
}

export const delFriend=(id,idFriend)=>{
    return async (dispatch) => {
        return await axios({
            method:'patch',
            url:`${process.env.REACT_APP_API_URL}api/user/delFriend/${id}`,
            data:{idFriend}
        })
        .then((res)=>{
            dispatch({type:DEL_FRIEND,payload:{idFriend}})
        })
        .catch((err)=>console.log(err))
        
    }
}

