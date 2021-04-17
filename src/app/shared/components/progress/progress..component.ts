import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarService } from './progress.service';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress.component.html',
    providers: [ProgressBarService]
    // styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {

    @Output() onComplete = new EventEmitter<number>();
    @Input() id: number;

    private progressBarSubscription: Subscription = null;

    constructor(
        public barService: ProgressBarService
    ) { }


    ngOnInit(): void {
        this.progressBarSubscription = this.barService.progressBarEnd$.subscribe(() => {
            this.onComplete.emit(this.id);
        })
    }

    ngOnDestroy(): void {
        if (this.progressBarSubscription) {
            this.progressBarSubscription.unsubscribe();
        }
    }

    startProgressBar() {
        this.barService.startProgressBar();
    }
}