import { combineReducers } from 'redux';
import posts from './posts'
import auth from './auth'

////get data from auth.js dispatch
export default combineReducers({
    posts: posts,
    auth: auth
})