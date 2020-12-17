import { CdkDrag } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-drag-drop',
    templateUrl: './drag-drop.component.html',
    styleUrls: ["./drag-drop.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragDropComponent {

    @Input() name: string;
    @Input() position: number;
    @Input() items;
    @Input() itemName;
    @Output() cdkDropListDropped = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    constructor() {
        console.log(this.position);
    }
    drop($event) {
        this.cdkDropListDropped.emit($event);
    }

    isType(item: CdkDrag<any>) {
        return item.data.type != 1;
    }

    deleteElement(type, event, position) {
        let body = {
            type,
            event,
            position
        };

        this.delete.emit(body);
    }
}