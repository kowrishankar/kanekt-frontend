import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './rootReducer';
import rootSaga from './rootSaga';

export type TStore = ReturnType<typeof rootReducer>;
const rootReducer = createRootReducer();

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production' ? { name: 'EV Management' } : false,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
