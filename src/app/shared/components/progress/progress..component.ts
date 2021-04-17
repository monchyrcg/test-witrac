import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress.component.html',
    // styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

    progress: number = 0;
    @Output() onComplete = new EventEmitter<void>();


    active: boolean = false;

    constructor() { }

    ngOnInit() {

    }

    startProgressBar() {
        console.log(this.progress);
        if (this.progress < 100) {
            setTimeout(() => {
                this.progress += 25;
                this.progressFinish();
            }, 1000);
        }

    }

    progressFinish() {
        if (this.progress == 100) {
            console.log('finis');
            this.onComplete.emit();
        } else {
            this.startProgressBar();
        }

    }
}