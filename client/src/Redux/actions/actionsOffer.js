import axios from "axios";
import { ADD_OFFER_FAIL, ADD_OFFER_SUCCESS, DELETE_ONEOFFER_FAIL, DELETE_ONEOFFER_SUCCESS, EDIT_OFFER_FAIL, EDIT_OFFER_SUCCESS, GET_ALLOFFERS_FAIL, GET_ALLOFFERS_SUCCESS, GET_ONEOFFER_FAIL, GET_ONEOFFER_SUCCESS, LOADINGOFFERS } from "../const/const_offer";


export const getAllOffers = () => async (dispatch) => {
  dispatch({
    type: LOADINGOFFERS,
  })
  try {
 const res = await axios.get('/api/offer')
    dispatch({
      type: GET_ALLOFFERS_SUCCESS,
      payload: res.data
    });
  }
  catch (err) {
    console.log(err)
    dispatch({
      type: GET_ALLOFFERS_FAIL,
      payload: err.message
    });
  }}

 
export const addOffer = (offerBody,navigate) => async (dispatch) => {
    const token=localStorage.getItem('token');
    try {
      
      const resOffer= await axios.post(`/api/offer`, offerBody,{ headers: { Authorization: `Bearer ${token}`} })
      dispatch({
        type: ADD_OFFER_SUCCESS,
        payload: resOffer.data,
     })
     navigate('/admin')
    }
    catch (err) {
      console.log(err)
      dispatch({
        type: ADD_OFFER_FAIL,
        payload: err.message
      });
    }}

export const editOffer = (id, offerBody, navigate) => async (dispatch) => {
      const token=localStorage.getItem('token');
      try {
        const resOffer = await axios.put(`/api/offer/${id}`, offerBody,{ headers: { Authorization: `Bearer ${token}` }})
        console.log(resOffer);
        dispatch({
          type: EDIT_OFFER_SUCCESS,
          payload: resOffer.data.offer
        })
         navigate('/admin')
      }
      catch (err) {
        console.log(err)
        dispatch({
          type: EDIT_OFFER_FAIL,
          payload: err.message
        });
      } }
export const getOneOffer= (id) => async (dispatch) => {
        const token=localStorage.getItem('token');
        dispatch({
          type: LOADINGOFFERS,
        })
        try {
      const res = await axios.get(`/api/offer/${id}`,{ headers: { Authorization: `Bearer ${token}` }})
          
          dispatch({
            type: GET_ONEOFFER_SUCCESS,
            payload: res.data.offer
          });
        }
        catch (err) {
          console.log(err)
          dispatch({
            type: GET_ONEOFFER_FAIL,
            payload: err.message
          });
        }}
       
 export const deleteOffer = (id) => async (dispatch) => {
          const token=localStorage.getItem('token');
          try {
            await axios.delete(`/api/offer/${id}`,{ headers: { Authorization: `Bearer ${token}` }})
            dispatch({
              type:DELETE_ONEOFFER_SUCCESS,
            })
            dispatch(getAllOffers())
          } catch (error) {
            console.log(error);
            dispatch({
              type:DELETE_ONEOFFER_FAIL
            })
          }}