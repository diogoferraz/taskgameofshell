import { SET_MESSAGE } from '../constants/actionsTypes';

export default function message(data) {
    return {
        type: SET_MESSAGE,
        payload: {...data}
    }
}