import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import * as userActions from '../../../../state/app-state/actions';
import * as fromRoot from '../../../../state';
import { RegisterUserData } from '../../models/register.model';
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    model: RegisterUserData = new RegisterUserData();
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private readonly userService: UserService,
        private readonly store: Store) {
        this.store.select(fromRoot.userLogin).pipe(
        ).subscribe((data: any) => {
            console.log('data::::', data);
            if (data.isLoadingSuccess && data.result) {
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;

        // post api for register
        this.store.dispatch(userActions.signup({ user: this.registerForm.value }));
    }
}
