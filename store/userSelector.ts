import { createSelector } from '@reduxjs/toolkit';
import { TStore } from './index';

export const selectState = (state: TStore) => state.users;
export const selectRegisterData = (state: TStore) => state.users.registerForm;
export const selectRegisterForm = (state: TStore) => state.users.registerForm.form;

export const selectUser = createSelector(
  selectState,
  (state) => state.user,
);

export const selectUserLoggedIn = createSelector(
  selectState,
  (state) => state.loggedIn
);

export const selectAuthError = createSelector(
  selectState,
  (state) => state.serverError
);

export const selectLoginFormData = createSelector(
  selectState,
  (state) => ({ username: state.loginForm.username, password: state.loginForm.password, deviceId: state.loginForm.deviceId })
);

export const selectForgotPasswordFormData = createSelector(
  selectState,
  (state) => state.forgotPasswordForm.email
);

export const selectRegisterFormData = createSelector(
  selectRegisterForm,
  (state) => ({
    first_name: state.firstName,
    last_name: state.lastName,
    username: state.username,
    email: state.email,
    password: state.password, // TODO: encrypt user entered password
    phone: '',
    date_of_birth: '',
    bio: '',
    creator_type: '',
    content_type: '',
    inv_code: '', // TODO: backend should auto-generate one for each user
    profile_img_url: '',
    banner_img_url: '',
    last_active: '',
    device_id: 123 // TODO: what is this? like device model?
  })
);

// TODO: if its login: retrieve email from TUser - which comes from backend
export const selectRegisterEmail = createSelector(
  selectRegisterForm,
  (state) => state.email
);

export const selectRegisterSuccess = createSelector(
  selectState,
  (state) => ({
    isRegisterSuccess: state.registerForm.isRegisterSuccess,
    errorMessage: state.registerForm.errorMessage,
  })
);

export const isUserVerified = createSelector(
  selectState,
  (state) => state.auth.verified
);