import { Component, Input, Output } from '@angular/core';

@Component({
	selector: 'app-modal-info-options',
	templateUrl: './modal-info-options.component.html',
	//styleUrls: ['./modal.component.scss'],
})

export class ModalInfoOptionsComponent {

	@Input() title: string;
	@Input() text: string;
	@Input() options: any;
	@Output() closeModal;
	@Output() buttonAction;

	closeModalF() {
		this.closeModal();
	}
}