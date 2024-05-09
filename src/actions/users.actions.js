import axios from 'axios'

export const GET_USERS="GET_USERS";
export const DEL_USER="DEL_USER";
export const getUsers=    ()=> {
    return async (dispatch) => {
        return   await axios
        .get( `${process.env.REACT_APP_API_URL}api/user/all`)
        .then((res)=> {
            // console.log(res.data)
            dispatch({type:GET_USERS,payload:res.data})
        })
        .catch((err)=> console.log(err))
    }
}
export const deleteUser=(id)=>{
    return async (dispatch) => {
        return await axios({
            method:'delete',
            url:`${process.env.REACT_APP_API_URL}api/user/delete/${id}`
        })
        .then( async (res)=>{
            await axios
        .get( `${process.env.REACT_APP_API_URL}api/user/all`)
        .then((res)=> {
            // console.log(res.data)
            dispatch({type:GET_USERS,payload:res.data})
        })
        
        })
        .catch((err)=>console.log(err))
        
    }
}
export const updateScore = (id, categorie, score) => {
    return async (dispatch) => {
        try {
             await axios({
                method: 'patch',
                url: `${process.env.REACT_APP_API_URL}api/user/updateScore/${id}`,
                data: { categorie: categorie, level: score }
            }).then(async (res)=>{
                await axios
                .get( `${process.env.REACT_APP_API_URL}api/user/all`)
                .then((res)=> {
                    dispatch({type:GET_USERS,payload:res.data})
                })
            })
        } catch (err) {
            console.error(err);
        }
    }
}