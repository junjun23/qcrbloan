import { USER_SIGNIN, GET_USER_PROFILE } from './action_types';
import axios from 'axios';

const userUrl = process.env.REACT_APP_USERMANAGEMENT_API;

// user sign-in = get user token data
export const userSignIn = (user) => async dispatch => {
    const res = await axios.post(`${ userUrl }/user/login`, user);
    dispatch ({
        type: USER_SIGNIN,
        payload: res.data
    });
};

// get user profile = decoded user token
export const userProfile = (headers) => async dispatch => {
    console.log(headers)
    const res = await axios.get(`${ userUrl }/user/profile`, headers);
    dispatch({
        type: GET_USER_PROFILE,
        payload: res.data
    });
};
