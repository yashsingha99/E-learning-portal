import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import toggleSlice from './toggleSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
        toggle:toggleSlice,
        //TODO: add more slices here for posts
    }
});


export default store;