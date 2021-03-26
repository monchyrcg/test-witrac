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
import { MenuComponent } from '../home/menu/menu.component';
import { ProfileService } from './profile.service';

// GOOGLE CALENDAR CONST
// This is for testing purposes. Please use your own API KEY. You can get it from https://developers.google.com/calendar/quickstart/js
const API_KEY = 'AIzaSyC2jcfM_s7kpfIK5VWTPNy9QflhIswiR-A';
// This is for testing purposes. Please use your own CLIENT ID. You can get it from https://developers.google.com/calendar/quickstart/js
const CLIENT_ID = '633586758726-t6dtd2lh33eeuq6eanjeqsglnq78bgng.apps.googleusercontent.com';;

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly';
const win: any = window;

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

    calendars = [];
    showCalendars: boolean = false;

    google_calendar_connect: boolean;

    constructor(
        private builder: FormBuilder,
        private authService: AuthenticationGeneralService,
        private snackbarService: SnackbarService,
        public settingGeneralService: SettingGeneralService,
        private profileService: ProfileService,
        private menuComponent: MenuComponent
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
        this.google_calendar_connect = user.google_calendar_connect;

        this.userForm = this.builder.group({
            id: user.id,
            name: [user.name, [Validators.required, Validators.maxLength(this.validationMaxString.long_string)]],
            email: [user.email, [Validators.required, Validators.email, Validators.maxLength(this.validationMaxString.long_string)]],
            password: ['', [Validators.maxLength(this.validationMaxString.long_string)]],
            start_hour: [user.start_hour, [Validators.required]],
            finish_hour: [user.finish_hour, [Validators.required]],
            days: [null, [Validators.required, Validators.minLength(1)]],
            google_calendar_connect: [user.google_calendar_connect, [Validators.required]],
            google_calendar_id: [user.google_calendar_id, []],
            google_calendar_name: [user.google_calendar_name, []]
        });

        const currentDays = user.days;
        currentDays.forEach(element => {
            this.days.map((days, index) => {
                if (days.id == element) {
                    this.days[index].selected = true;
                }
            });
        });

        // Load the Google API Client
        win.onGoogleLoad = () => {
            win.gapi.load('client', () => this.initClient());
        };
    }

    get f() { return this.userForm.controls; }

    submit() {
        this.submitted = true;

        const getSelectedDays = (days) => {
            return days.reduce((results, day) => {
                if (day?.selected) {
                    results.push(day.id);
                }
                return results;
            }, []);
        };

        const selectedDays = getSelectedDays(this.days);

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

    // Load the SDK asynchronously
    loadGoogleSDK(): void {
        ((d: any, s: any, id: any) => {
            let js: any;
            const fjs: any = d.getElementsByTagName(s)[0];

            if (d.getElementById(id)) {
                win.onGoogleLoad();
                return;
            } else {
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://apis.google.com/js/api.js?onload=onGoogleLoad';
                js.onload = 'onGoogleLoad';
                fjs.parentNode.insertBefore(js, fjs);
            }

        })(document, 'script', 'google-jssdk');
    }

    initClient() {
        win.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(
            () => {
                if (!win.gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    this.loginCalendar();
                } else {
                    this.listCalendars();
                }
            },
            (error) => {
                console.log(JSON.stringify(error, null, 2));
            }
        );
    }

    loginCalendar() {
        win.gapi.auth2.getAuthInstance().signIn().then(
            () => this.listCalendars()
        )
    }

    listCalendars() {
        win.gapi.client.calendar.calendarList.list({}).then(
            (response) => {
                const myCalendars = response.result.items;

                if (myCalendars.length > 0) {
                    this.calendars = myCalendars;
                    this.showCalendars = true;
                } else {
                    this.showSnackBar('No hay ningun calendario asociado a esta cuenta.', 'danger');
                }
            }
        );
    }

    recoverEvents(calendar) {
        win.gapi.client.calendar.events.list({
            'calendarId': calendar,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 100,
            'orderBy': 'startTime'
        }).then(
            (response) => {
                const events = response.result.items;

                this.subscription.add(this.profileService.saveGoogleCalendarEvents(this.userForm.controls['id'].value, { "events": events }).subscribe(
                    (response) => {
                        this.snackbarService.show('Sus citas se estan importando correctamente.', 'success');
                    },
                    (error) => {
                        this.snackbarService.show('Algo ha pasado ....', 'danger');
                    }
                ));
            }
        );
    }
}