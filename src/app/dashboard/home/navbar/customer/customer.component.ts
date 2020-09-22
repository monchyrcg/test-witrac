import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/shared/models/gender.model';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
})

export class CustomerComponent implements OnInit {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_register: string;
    @Output() closeModal;

    genders: Gender[] = [];
    clientForm: FormGroup;
    submitted = false;
    test;
    constructor(
        private builder: FormBuilder,
        private settingService: SettingsService
    ) { }


    ngOnInit(): void {
        this.genders.push({ id: 1, text: this.settingService.getLangText('genders.male') });
        this.genders.push({ id: 2, text: this.settingService.getLangText('genders.female') });
        this.test = new FormControl('', Validators.required);
        this.clientForm = this.builder.group({
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            team: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            job: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    get f() { return this.clientForm.controls; }

    closeModalF() {
        this.closeModal();
    }
}