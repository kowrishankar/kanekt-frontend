import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './user';

export const createRootReducer = () => {
  return combineReducers({
    users: userReducer,
  });
};
