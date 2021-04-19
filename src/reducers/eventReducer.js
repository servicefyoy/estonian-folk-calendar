import { FETCH_EVENTS } from '../actions/types'

const initialState = {
    items: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_EVENTS:
            return {
                ...state, 
                items: action.payload
            }
        default:
            return state
    }
}