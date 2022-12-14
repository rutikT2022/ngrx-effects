import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import * as fromUser from './app-state/reducers/user.reducers';
  import * as fromTodo from './feature-state/reducers/todo.reducers';
  import { localStorageSync } from 'ngrx-store-localstorage';


  export interface State {
    user: fromUser.State;
    todo: fromTodo.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
    todo: fromTodo.reducer,
  };
  
  const reducerKeys = ['user', 'todo'];
  
  export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: reducerKeys})(reducer);
  }
  
  // console.log all actions
  export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
      console.log('state', state);
      console.log('action', action);
  
      return reducer(state, action);
    };
  }  
  
  export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
  export const getLoginState = createFeatureSelector<fromUser.State>('user');
  
  export const getLoggedInUser = createSelector(
    getLoginState,
    fromUser.getLoggedInUser
  );
  
  export const userLogin = createSelector(
    getLoginState,
    fromUser.userLogin
  );
  
  export const userSignup = createSelector(
    getLoginState,
    fromUser.userSignup
  );
  
  export const allSignedUpUser = createSelector(
    getLoginState,
    fromUser.allsignupusers
  );

  // Todo reducers Begin
  
  export const geTodoState = createFeatureSelector<fromTodo.State>('todo');
  
  export const getTasks = createSelector(
    geTodoState,
    fromTodo.getTasks
  );