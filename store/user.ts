import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TAuth, TRegisterUser } from './type';

type TUserStore = {
  user: TUser,
  auth: TAuth,
  loginForm: {
    username: string;
    password: string;
    deviceId: string;
    serverError: boolean;
    errorMessage: string | null;
  },
  registerForm: {
    form: TRegisterUser;
    isLoading: boolean;
    serverError: boolean;
    errorMessage: string | null;
    isFormsubmitted: boolean;
    isRegisterSuccess: boolean;
  };
  forgotPasswordForm: {
    email: string;
    isForgotPasswordRequestSuccess: boolean;
    isLoading: boolean;
    serverError: boolean;
    errorMessage: string | null;
    isFormsubmitted: boolean;
  },
  loggedIn: boolean;
  isLoading: boolean;
  serverError: boolean;
};

const initialState: TUserStore = {
  user: {
    id: null,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    phone: '',
    dateOfBirth: '',
    bio: '',
    creatorType: '',
    contentType: '',
    invCode: '',
    profileImgUrl: '',
    bannerImgUrl: '',
    lastActive: '',
    deletedAt: '',
  },
  auth: {
    id: null,
    userId: null,
    verified: false,
    verifiedAt: '',
    passwordDigest: '',
    createdAt: '',
    updatedAt: '',
  },
  loginForm: {
    username: '',
    password: '',
    deviceId: '',
    serverError: false,
    errorMessage: null,
  },
  registerForm: {
    form: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    isLoading: false,
    serverError: false,
    isFormsubmitted: false,
    isRegisterSuccess: false,
    errorMessage: null,
  },
  forgotPasswordForm: {
    email: '',
    isForgotPasswordRequestSuccess: false,
    isLoading: false,
    serverError: false,
    errorMessage: null ,
    isFormsubmitted: false,
  },
  loggedIn: false,
  isLoading: false,
  serverError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequested: (state, action: PayloadAction<{ username: string; password: string; deviceId: string }>) => {
      console.log("login requested - in slice");
      state.isLoading = true;
      state.loggedIn = false;


      console.log(action.payload);
      console.log(action);

      state.loginForm.username = action.payload.username;
      state.loginForm.password = action.payload.password;
      state.loginForm.deviceId = action.payload.deviceId;
    },
    logout: (state) => {
      state.isLoading = true;
      state.loggedIn = false;
    },
    loginSuccess: (state) => {
      state.loggedIn = true;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      console.log('Slice: Auth failed');
      state.loggedIn = false;
      state.serverError = true;
      state.loginForm.errorMessage = action.payload;
      state.loginForm.serverError = true;

      // TODO: only if backend says email is not verified yet
      // TODO: Need to get the backend to reply verified: false in case of error
      state.auth.verified = false;
      state.loggedIn = false;
    },
    forgotPasswordRequested: (state, action: PayloadAction<string>) => {
      state.forgotPasswordForm.email = action.payload;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotPasswordForm.isLoading = false;
      state.forgotPasswordForm.isFormsubmitted = false;
      state.forgotPasswordForm.serverError = false;
      state.forgotPasswordForm.isForgotPasswordRequestSuccess = true;
    },
    forgotPasswordFailed: (state, action: PayloadAction<string>) => {
      state.forgotPasswordForm.isLoading = false;
      state.forgotPasswordForm.isFormsubmitted = false;
      state.forgotPasswordForm.serverError = true;
      state.forgotPasswordForm.isForgotPasswordRequestSuccess = false;
      state.forgotPasswordForm.errorMessage = action.payload;
    },
    registerFormSubmitted: (state, action: PayloadAction<TRegisterUser>) => {
      console.log('in saga', action.payload);

      state.registerForm.form = action.payload;

      state.registerForm.isLoading = true;
      state.registerForm.isFormsubmitted = true;
      state.registerForm.serverError = false;
    },
    registerSuccess: (state) => {
      state.registerForm.isLoading = false;
      state.registerForm.isFormsubmitted = false;
      state.registerForm.serverError = false;
      state.registerForm.isRegisterSuccess = true;
    },
    registerFailed: (state, action: PayloadAction<string>) => {
      state.registerForm.isLoading = false;
      state.registerForm.isFormsubmitted = false;
      state.registerForm.serverError = true;
      state.registerForm.isRegisterSuccess = false;
      state.registerForm.errorMessage = action.payload;
    },
    verifyUserRegistration: (state) => {
      state.registerForm.isLoading = true;
      // TODO: rewrite user state, verified to true
      // state.user.verified = true;
    },
    resendVerification: (state) => {
      state.registerForm.isLoading = true;
    },
  },
});

export const { 
  loginRequested,
  logout,
  loginSuccess,
  loginFailed,
  forgotPasswordRequested,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  registerFormSubmitted,
  registerSuccess,
  registerFailed,
  verifyUserRegistration,
  resendVerification,
 } = userSlice.actions;

export const userReducer = userSlice.reducer;
