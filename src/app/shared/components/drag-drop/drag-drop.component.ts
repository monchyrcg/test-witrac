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
    @Input() items;
    @Input() itemName;
    @Output() cdkDropListDropped = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    drop($event) {
        this.cdkDropListDropped.emit($event);
    }

    isType(item: CdkDrag<any>) {
        return item.data.type != 1;
    }

    deleteElement(type, event) {
        console.log(type);
        let body = {
            type,
            event
        };

        this.delete.emit(body);
    }
}