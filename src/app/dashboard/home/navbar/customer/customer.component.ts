import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng2FlatpickrComponent } from 'ng2-flatpickr';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/shared/models/gender.model';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    // styleUrls: ['./customer.component.scss'],
})

export class CustomerComponent implements OnInit {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_register: string;
    @Output() closeModal;

    genders: Gender[] = [];
    clientForm: FormGroup;
    submitted = false;

    private subscription = new Subscription();

    constructor(
        private builder: FormBuilder,
        private settingService: SettingsService
    ) { }


    ngOnInit(): void {
        this.genders.push({ id: 1, text: this.settingService.getLangText('genders.male') });
        this.genders.push({ id: 2, text: this.settingService.getLangText('genders.female') });

        this.clientForm = this.builder.group({
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            team: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            job: ['', [Validators.required]],
            prefix: ['+34', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    get f() { return this.clientForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.clientForm.invalid) {
            return;
        }

    }

    closeModalF() {
        this.closeModal();
    }
}