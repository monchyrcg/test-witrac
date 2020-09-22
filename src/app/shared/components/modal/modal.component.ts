import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	//styleUrls: ['./modal.component.scss'],
})

export class ModalComponent {

	@Input() title: string;
	@Input() text: string;
	@Input() text_button_cancel: string;
	@Output() closeModal;

	closeModalF() {
		this.closeModal();
	}
}