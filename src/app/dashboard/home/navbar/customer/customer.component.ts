import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    //styleUrls: ['./modal.component.scss'],
})

export class CustomerComponent {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_cancel: string;
    @Input() icon: string;
    @Output() closeModal;

    closeModalF() {
        this.closeModal();
    }
}