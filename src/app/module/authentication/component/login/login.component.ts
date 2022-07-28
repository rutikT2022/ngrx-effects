import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as userActions from '../../../../state/app-state/actions';
import * as fromRoot from '../../../../state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    title: string = 'Angular NGRX Example';

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly authenticationService: AuthenticationService,
        private readonly store: Store) {
        this.store.select(fromRoot.userLogin).pipe(
        ).subscribe((data: any) => {
            console.log("data:::::::::::", data);

            if (data.isLoadingSuccess && data.result && data.result.type == userActions.USER_LOGIN_SUCCESS) {
                this.router.navigate(['/home/task']);
            }
        });
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // reset login status
        this.authenticationService.logout();
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.checkIsUserRegistered();
    }
    login() {
        this.loading = true
        // post api for login
        this.store.dispatch(userActions.login({ user: { username: this.f['username'].value, password: this.f['password'].value } }));
    }
    // check if the user is registered or not
    checkIsUserRegistered() {
        let index;
        this.store.dispatch(userActions.allsignupusers());

        this.store.select(fromRoot.allSignedUpUser).pipe().subscribe((data1: any) => {
            console.log(data1.users)
            if (data1?.users) {
                index = data1?.users.findIndex((test: any) => {
                    return test.username === this.f['username'].value && test.password === this.f['password'].value
                })
                if (index !== -1) {
                    this.login();
                } else {
                    this.loading = false;
                }
            }
        })
    }
}
