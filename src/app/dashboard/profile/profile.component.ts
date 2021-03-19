import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Day } from 'src/app/shared/interfaces/day.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
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

    days: Day[] = [];

    constructor(
        private builder: FormBuilder,
        private authService: AuthenticationGeneralService,
        private snackbarService: SnackbarService,
        public settingGeneralService: SettingGeneralService,
        private profileService: ProfileService
    ) {
        this.days.push({ id: 0, text: this.settingGeneralService.getLangText('week.monday') });
        this.days.push({ id: 1, text: this.settingGeneralService.getLangText('week.tuesday') });
        this.days.push({ id: 2, text: this.settingGeneralService.getLangText('week.wednesday') });
        this.days.push({ id: 3, text: this.settingGeneralService.getLangText('week.thursday') });
        this.days.push({ id: 4, text: this.settingGeneralService.getLangText('week.friday') });
        this.days.push({ id: 5, text: this.settingGeneralService.getLangText('week.saturday') });
        this.days.push({ id: 6, text: this.settingGeneralService.getLangText('week.sunday') });
    }


    ngOnInit(): void {
        const user = this.authService.getUser();

        this.userForm = this.builder.group({
            id: user.id,
            name: [user.name, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            email: [user.email, [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
            password: ['', [Validators.maxLength(this.validationMaxString.long_string)]],
            start_hour: [user.start_hour, [Validators.required]],
            finish_hour: [user.finish_hour, [Validators.required]],
            days: [null, [Validators.required, Validators.minLength(1)]]
        });

        const currentDays = user.days;
        currentDays.forEach(element => {
            this.days.map((days, index) => {
                if (days.id == element) {
                    this.days[index].selected = true;
                }
            });
        });
    }

    get f() { return this.userForm.controls; }

    submit() {
        this.submitted = true;

        const getSelectedDays = (days) => {
            return days.filter(day => day.selected);
        };

        const selectedDays = getSelectedDays(this.days).map(element => element.id);

        if (selectedDays.length) {
            this.userForm.controls['days'].setValue((selectedDays));
        }

        if (this.userForm.invalid) {
            return;
        }

        this.subscription.add(this.profileService.updateProfile(this.userForm.value).subscribe(
            (response) => {
                this.snackbarService.show('User updated successfully.', 'success');
                const result: User = response;
                result.days = JSON.parse(result.days);
                this.authService.updateUser(result);
            },
            (error) => {
                this.snackbarService.show('Algo ha pasado ....', 'danger');
            }
        ));
    }

    changeDaySelected(value) {
        this.days[value.id].selected = !this.days[value.id].selected;
    }

    showSnackBar(text: string, _class: string) {
        this.snackbarService.show(text, _class);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}