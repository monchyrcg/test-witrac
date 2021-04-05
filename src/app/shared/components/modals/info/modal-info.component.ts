import { Component, Input, Output } from '@angular/core';

@Component({
	selector: 'app-modal-info',
	templateUrl: './modal-info.component.html',
	//styleUrls: ['./modal.component.scss'],
})

export class ModalInfoComponent {

	@Input() title: string;
	@Input() text: string;
	@Input() text_button_cancel: string;
	@Output() closeModal;
	@Output() buttonAction;

	closeModalF() {
		this.closeModal();
	}
}