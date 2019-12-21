import { SET_MESSAGE } from '../constants/actionsTypes';

const initialState = {
    text: 'Take a close look where the black ball is, after it click on Start!',
    type: 'info'
};

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                text: action.payload.text,
                type: action.payload.type
            }
        default:
            return {
                ...state
            }
    }
}