import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal-data',
    templateUrl: './modal-data.component.html',
    styleUrls: ['./modal-data.component.scss'],
})

export class ModalDataComponent implements OnInit {

    @Input() title: string;
    @Input() text: string;
    @Input() text_button_create: string;
    @Output() closeModal = new EventEmitter<any>();

    ngOnInit() {

    }

    closeModalF() {
        this.closeModal.emit();
    }
}