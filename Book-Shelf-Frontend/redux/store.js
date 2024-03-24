import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from '@/redux/features/book/bookSlice';
import userReducer from '@/redux/features/user/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import persistConfig from '@/utils/persistConfig';

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedBookReducer = persistReducer(persistConfig, booksReducer);

export const store = configureStore({
    reducer: {
        books: persistedBookReducer,
        user: persistedUserReducer,
    },
});
export const persistor = persistStore(store);
