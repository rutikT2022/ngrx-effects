import { createAction, props } from "@ngrx/store";
import { RegisterUserData } from "src/app/module/authentication/models/register.model";

export const USER_SIGNUP = '[SignUp Page] Signup';
export const USER_SIGNUP_SUCCESS = '[SignUp Page] Signup Success';
export const USER_SIGNUP_FAILURE = '[SignUp Page] Signup Failure';
export const ALL_SIGNUP_USERS = '[ALL SIGNED UP USER] Signedup Users';
export const ALL_SIGNUP_USERS_SUCCESS = '[ALL SIGNED UP USER] Signedup Users Success'

export const signup = createAction(
  USER_SIGNUP,
  props<{ user: RegisterUserData }>()
);

export const signupSuccess = createAction(
  USER_SIGNUP_SUCCESS,
  props<any>()
)

export const signupFailure = createAction(
  USER_SIGNUP_FAILURE,
  props<{ message: string }>()
)

export const allsignupusers = createAction(
  ALL_SIGNUP_USERS,
);
export const allsignupusersSuccess = createAction(
  ALL_SIGNUP_USERS_SUCCESS,
  props<any>()
);