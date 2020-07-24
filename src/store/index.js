import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slices/rootSlice';
import formReducer from '../slices/formSlice';
import quizzesReducer from '../slices/quizzesSlice';

export default configureStore({
  reducer: {
    rootReducer,
    formReducer,
    quizzesReducer,
  },
});