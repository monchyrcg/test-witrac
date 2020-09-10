import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-label-form',
    templateUrl: './label.component.html',
})

export class LabelFormComponent {

    @Input() for: string;
    @Input() name: string;

}