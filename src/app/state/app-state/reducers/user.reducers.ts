import { Action, createReducer, on } from "@ngrx/store";
import { RegisterUserData } from "src/app/module/authentication/models/register.model";
import * as userActions from '../actions';
import * as storage from '../state/state';

export interface State {
  user: RegisterUserData;
  result: any;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  users: RegisterUserData[]
}

export const initialState: State | any = {
  user: storage.getItem('user').currentUser,
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  users: []
};

const loginReducer = createReducer(
  initialState,
  on(userActions.login, (state, { user }) => ({ user, isLoading: true })),
  on(userActions.loginSuccess, (state, result) => ({ user: result.user, result, isLoading: false, isLoadingSuccess: true, users: result.users })),
  on(userActions.signup, (state, { user }) => ({ user, isLoading: true })),
  on(userActions.signupSuccess, (state, result) => ({ user: state.user, result, isLoading: false, isLoadingSuccess: true, users: [] })),
  on(userActions.allsignupusers, (state) => ({ ...state, isLoading: true })),
  on(userActions.allsignupusersSuccess, (state, result) => ({ users: result.response })),
);
export function reducer(state: State | undefined, action: Action): any {
  return loginReducer(state, action);
}


// get logged in user details
export const getLoggedInUser = (state: State) => {
  return {
    user: state.user,
    isLoadingSuccess: state.isLoadingSuccess
  }
};

// state for login page
export const userLogin = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess,
    users: state.users
  }
};

// state for register page
export const userSignup = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess,
    users: state.users

  }
};

// get data of all signed up user'
export const allsignupusers = (state: State) => {
  return {
    users: state.users
  }
};