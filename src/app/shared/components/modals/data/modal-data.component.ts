import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal-data',
    templateUrl: './modal-data.component.html',
    styleUrls: ['./modal-data.component.scss'],
})

export class ModalDataComponent {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_create: string;
    @Output() closeModal = new EventEmitter<any>();

    closeModalF() {
        this.closeModal.emit();
    }
}