import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { Validations } from 'src/app/shared/settings/validation';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    subscription: Subscription = new Subscription;
    userForm: FormGroup;
    submitted = false;

    validationMaxString = Validations.validationMaxString;

    calendars = [];
    showCalendars: boolean = false;

    google_calendar_connect: boolean;

    constructor(
        private builder: FormBuilder,
        private authService: AuthenticationGeneralService,
        private snackbarService: SnackbarService,
        private profileService: ProfileService,
    ) {

    }


    ngOnInit(): void {
        const user = this.authService.getUser();

        this.userForm = this.builder.group({
            id: user.id,
            name: [user.name, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            email: [user.email, [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
            password: ['', [Validators.maxLength(this.validationMaxString.long_string)]],
        });
    }

    get f() { return this.userForm.controls; }

    submit() {
        this.submitted = true;

        if (this.userForm.invalid) {
            return;
        }

        this.subscription.add(this.profileService.updateProfile(this.userForm.value).subscribe(
            (response) => {
                this.snackbarService.show('User updated successfully.', 'success');
                const result: User = response;

                this.authService.updateUser(result);

                this.snackbarService.show('User updated succesfully', 'success');
            },
            (error) => {
                this.snackbarService.show('Algo ha pasado ....', 'danger');
            }
        ));
    }

    showSnackBar(text: string, _class: string) {
        this.snackbarService.show(text, _class);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


}