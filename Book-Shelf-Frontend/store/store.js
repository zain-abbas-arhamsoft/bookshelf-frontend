import { configureStore } from '@reduxjs/toolkit';
import { booksReducer, featuredBooksReducer,bookIdReducer,deleteBookReducer } from '@/store/features/book/bookSlice';
import userReducer from '@/store/features/user/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import persistConfig from '@/utils/persistConfig';

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedBookReducer = persistReducer(persistConfig, booksReducer);
const persistedFeaturedBookReducer = persistReducer(persistConfig, featuredBooksReducer);
const persistedDeleteBookReducer = persistReducer(persistConfig, deleteBookReducer);

export const store = configureStore({
    reducer: {
        books: persistedBookReducer,
        featuredBooks: persistedFeaturedBookReducer,
        user: persistedUserReducer,
        bookId: bookIdReducer,
        deleteBook: persistedDeleteBookReducer
    },
});
export const persistor = persistStore(store);
