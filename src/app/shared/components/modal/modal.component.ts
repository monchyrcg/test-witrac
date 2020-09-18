import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	//styleUrls: ['./modal.component.scss'],
})

export class ModalComponent {

	@Input() text: string;
	@Output() closeModal;

	closeModalF() {
		this.closeModal();
	}
}