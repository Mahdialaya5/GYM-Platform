import axios from "axios";
import { ADD_USER_FAIL, ADD_USER_SUCCESS, DELETE_ONEUSER_FAIL, DELETE_ONEUSER_SUCCESS, EDIT, EDIT_FAIL, EDIT_USER, EDIT_USER_FAIL, GET_ALLUSERS_FAIL, GET_ALLUSERS_SUCCESS, GET_CURRENT_FAIL, GET_CURRENT_SUCCESS, GET_USERS_FAIL, GET_USERS_SUCCESS, LOADINGUSERS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, PAY, PAY_FAIL, SEARCH } from "../const/const_user";


export const addUser = (userBody,navigate) => async (dispatch) => {
    try {
      const resUser= await axios.post(`/api/user/register`, userBody )
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: resUser.data,
     })
    navigate('/profile')
      }
    catch (err) {
      console.log(err)
      dispatch({
        type: ADD_USER_FAIL,
        payload: err.response.data
      });
      
     }}
   
export const login = (loginUser, navigate) => async (dispatch) => {
      try {
          const res = await axios.post(`/api/user/login`, loginUser)
          dispatch({ type: LOGIN_SUCCESS, payload: res.data })
         switch (res.data.user.role){
            case "admin" : 
                 return navigate("/admin")
            case "reception" : 
                 return navigate("/reception")
            default:
                 return navigate("/profile") }
    } 
       catch (err) {
          console.log(err);
          dispatch({ 
             type: LOGIN_FAIL,
              payload: err.response.data })
          
      }}

 //private   
export const getCurrent = () => async (dispatch) => {
      const token = localStorage.getItem("token");
      try {
          const res = await axios.get(`/api/user/current`, { headers: { Authorization: `Bearer ${token}` } })
          dispatch({ type: GET_CURRENT_SUCCESS, payload: res.data })
          
      } catch (error) {
          
          dispatch({ type: GET_CURRENT_FAIL, payload: error })
      }}


export const editUser = (id, userBody, navigate) => async (dispatch) => {
        const token = localStorage.getItem("token");
        try {
         
          const resUser = await axios.put(`/api/user/${id}`,userBody,{ headers: { Authorization: `Bearer ${token}` } })
           console.log(resUser);
          dispatch({
            type: EDIT_USER,
            payload:resUser.data
          })
           navigate('/profile')
        }
        catch (err) {
          console.log(err)
          dispatch({
            type: EDIT_USER_FAIL,
            payload:err.response.data
          });
          
        } }


export const newSubscribe = (id, userBody, navigate) => async (dispatch) => {
        const token = localStorage.getItem("token");
        try {
          const resUser = await axios.put(`/api/user/current/${id}`,userBody,{ headers: { Authorization: `Bearer ${token}` } })
           dispatch({
            type: EDIT,
            payload:resUser.data
          })
           navigate('/profile')
        }
        catch (err) {
          console.log(err)
          dispatch({
            type: EDIT_FAIL,
            payload: err.message
          });
        } }


export const logout = () => {
        return { type: LOGOUT } 
      }

   //admin
export const getAllUsers = () => async (dispatch) => {
       const token = localStorage.getItem("token");
      dispatch({
        type: LOADINGUSERS,
           })
    try {
        const res = await axios.get(`/api/user/admin`,{ headers: { Authorization: `Bearer ${token}` }})
          dispatch({
          type: GET_ALLUSERS_SUCCESS,
          payload: res.data
        });
      }
      catch (err) {
        console.log(err)
        dispatch({
          type: GET_ALLUSERS_FAIL,
          payload: err.message
        });}}

export const searchUser= (searchu) => {
          return { type: SEARCH, payload:searchu }
         }

  //reception    
export const getUsers = () => async (dispatch) => {
     const token = localStorage.getItem("token");
        dispatch({
            type: LOADINGUSERS, })
      try {
         const res = await axios.get(`/api/user/reception`,{ headers: { Authorization: `Bearer ${token}` }})
            dispatch({
              type: GET_USERS_SUCCESS,
              payload: res.data
            });
          }
          catch (err) {
            console.log(err)
            dispatch({
              type: GET_USERS_FAIL,
              payload: err.message
            });}}
          

 export const paySubscribe = (id, userBody) => async (dispatch) => {
              const token = localStorage.getItem("token");
              try {
           
                const resUser = await axios.put(`/api/user/reception/${id}`,userBody,{ headers: { Authorization: `Bearer ${token}` } })
                console.log("resUser",resUser);
                dispatch({
                  type:PAY,
                  payload:resUser.data
                })
                dispatch(getUsers())
              }
              catch (err) {
                console.log(err)
                dispatch({
                  type: PAY_FAIL,
                  payload: err.message
                });
              } }

export const deleteUser = (id) => async (dispatch) => {
              const token = localStorage.getItem("token");
            try {
              await axios.delete(`/api/user/reception/${id}`,{ headers: { Authorization: `Bearer ${token}` }})
              dispatch({
                type:DELETE_ONEUSER_SUCCESS,
              })
              dispatch(getUsers())
            } catch (error) {
              console.log(error);
              dispatch({
                type:DELETE_ONEUSER_FAIL
              })
            }}