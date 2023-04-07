import { combineReducers } from "redux";
import { offerReducer } from './offerReducer';
import {userReducer} from './userReducer';
export const rootReducer = combineReducers({ offerReducer , userReducer})