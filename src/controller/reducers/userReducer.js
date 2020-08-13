import { GET_USERS, USER_SIGNIN, GET_USER_PROFILE, DELETE_USER, ADD_USER } from '../actions/user_actions/action_types';

const initialState = {
    users: [
    ],
    usertoken: "",
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case USER_SIGNIN:
            return {
                ...state,
                usertoken: state.usertoken = action.payload,
                userTokenSession: sessionStorage.setItem('usertoken', action.payload)
            };
        case GET_USER_PROFILE:
            console.log(action.payload)
            return {
                ...state,
                user: state.user = action.payload,
                userProfileSession: sessionStorage.setItem('userProfile', JSON.stringify(action.payload))
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        default:
            return state;
    }
}