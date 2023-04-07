import { ADD_OFFER_FAIL, ADD_OFFER_SUCCESS, DELETE_ONEOFFER_SUCCESS, EDIT_OFFER_SUCCESS, GET_ALLOFFERS_FAIL, GET_ALLOFFERS_SUCCESS, GET_ONEOFFER_FAIL, GET_ONEOFFER_SUCCESS, LOADINGOFFERS } from "../const/const_offer"

const IntialState = {
    offers: [],
    errors: null,
    loading: false,
    oneOffer: {}
}
export const offerReducer = (state = IntialState, { type, payload }) => {
    switch (type) {
        case LOADINGOFFERS:
            return { ...state, loading: true }
        case GET_ALLOFFERS_SUCCESS:
            return { ...state, loading: false, offers: payload }
        case GET_ALLOFFERS_FAIL:
            return { ...state, loading: false, errors: payload }
            case ADD_OFFER_SUCCESS:
                return { ...state, offers: [...state.offers, payload.offer] }
            case ADD_OFFER_FAIL:
                return { ...state, errors: payload }
                case GET_ONEOFFER_SUCCESS:
                    return { ...state, oneOffer: payload }
                case GET_ONEOFFER_FAIL:
                    return { ...state, errors: payload }
                case EDIT_OFFER_SUCCESS:
                    return { ...state, offers: state.offers.map(el => el._id == payload._id ? payload : el) }
                    case DELETE_ONEOFFER_SUCCESS :
                        return {...state, offers:[]}
               
             default:
                     return state;

    }

}