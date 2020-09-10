import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-error-form',
    templateUrl: './error.component.html',
})

export class ErrorFormComponent {

    @Input() error: string;

}
