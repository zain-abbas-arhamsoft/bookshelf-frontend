import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '@/redux/features/user/slice';
import bookReducer from '@/redux/features/book/slice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    books: bookReducer,
});

export default persistReducer(persistConfig, rootReducer);
