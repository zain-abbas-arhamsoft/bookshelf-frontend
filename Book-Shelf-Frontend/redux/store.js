import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/redux/reducer/root';
import { persistStore } from 'redux-persist';
import customMiddleware from '@/middleware/custom';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export const store = configureStore({
    reducer: rootReducer,
});
export const persistor = persistStore(store);
