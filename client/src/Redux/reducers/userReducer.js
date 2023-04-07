import { ADD_USER_FAIL, ADD_USER_SUCCESS, DELETE_ONEUSER_SUCCESS, EDIT, EDIT_USER,  EDIT_USER_FAIL,  GET_ALLUSERS_SUCCESS, GET_CURRENT_SUCCESS, GET_USERS_SUCCESS, LOADINGUSERS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SEARCH } from "../const/const_user"

const InitialSate = {
    errors: null,
    currentUser: {},
    users:[],     
    loading:false,
    allUsers:[]
}

export const userReducer = (state = InitialSate, { type, payload }) => {
    switch (type) {
        case ADD_USER_SUCCESS:
            localStorage.setItem("token", payload.token)
            return { ...state,users:{...state.users,payload},currentUser: payload.user  }
        case ADD_USER_FAIL:
            return { ...state, errors: payload }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token)
                return { ...state, currentUser: payload.user }
        case LOGIN_FAIL:
            return { ...state, errors: payload }
        case GET_CURRENT_SUCCESS:
            return { ...state,currentUser: payload.user}
        case EDIT:
            return { ...state}
        case EDIT_USER:
            return { ...state}
        case EDIT_USER_FAIL:
            return  { ...state, errors: payload }
        case LOGOUT:
            localStorage.removeItem("token")
            return {errors: null,currentUser: {}}
        case LOADINGUSERS:
            return {...state,loading:true}
        case GET_ALLUSERS_SUCCESS:
            return {...state,allUsers:payload}
        case GET_USERS_SUCCESS:
            return {...state,allUsers:payload}
        case SEARCH:
              return {...state,allUsers:[...state.allUsers.filter((el)=>el.name.toLowerCase().includes(payload.trim().toLowerCase()))]}
        case DELETE_ONEUSER_SUCCESS:
              return {...state}
          default:
             return state
    }

}