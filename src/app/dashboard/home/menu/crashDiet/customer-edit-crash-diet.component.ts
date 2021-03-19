import { Component, Input, Output } from "@angular/core";
import { Day } from "src/app/shared/interfaces/day.interface";
import { SettingGeneralService } from "src/app/shared/services/settings-general.service";

@Component({
    selector: 'app-customer-edit-crash-diet',
    templateUrl: './customer-edit-crash-diet.component.html'
})

export class CustomerEditCrashDietComponent {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_register: string;
    @Output() closeModal;
    @Output() sendDays;

    days: Day[] = [];
    selectedValues = [];
    error: boolean = false;

    constructor(
        public settingGeneralService: SettingGeneralService
    ) {
        this.days.push({ id: 0, text: this.settingGeneralService.getLangText('week.monday') });
        this.days.push({ id: 1, text: this.settingGeneralService.getLangText('week.tuesday') });
        this.days.push({ id: 2, text: this.settingGeneralService.getLangText('week.wednesday') });
        this.days.push({ id: 3, text: this.settingGeneralService.getLangText('week.thursday') });
        this.days.push({ id: 4, text: this.settingGeneralService.getLangText('week.friday') });
        this.days.push({ id: 5, text: this.settingGeneralService.getLangText('week.saturday') });
        this.days.push({ id: 6, text: this.settingGeneralService.getLangText('week.sunday') });
    }

    onSubmit() {
        if (0 === this.selectedValues.length) {
            this.error = true;
        } else {
            this.sendDays(this.selectedValues);
        }
    }

    closeModalF() {
        this.closeModal();
    }
}