
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as userActions from '../actions';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class UserEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService

    ) { }

    userLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.login),
            exhaustMap(action =>
                this.authenticationService.login(action.user.username, action.user.password).pipe(
                    map(response => userActions.loginSuccess(response)),
                    catchError((error: any) => of(userActions.loginFailure(error))))
            )
        )
    );

    userSignup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.signup),
            exhaustMap(action =>
                this.userService.register(action.user).pipe(
                    map(response => userActions.signupSuccess(response)),
                    catchError((error: any) => of(userActions.signupFailure(error))))
            )
        )
    );

    // get all registered users
    allsignupusers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.allsignupusers),
            exhaustMap(action =>
                this.userService.getAll().pipe(
                    map(response => {
                        console.log("response:::", response)
                        return userActions.allsignupusersSuccess({ response })
                    }),
                    catchError((error: any) => of(userActions.signupFailure(error))))
            )
        )
    );
}