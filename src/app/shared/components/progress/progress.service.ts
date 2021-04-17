import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable()
export class ProgressBarService {

    private progressBarRef: any = null
    public paused: boolean = true;
    active: boolean = false;

    //observable
    private progressBarEndSource = new Subject<void>();
    public progressBarEnd$ = this.progressBarEndSource.asObservable();

    private progressBarStart = new BehaviorSubject<number>(0);
    public progressBarStart$ = this.progressBarStart.asObservable();


    startProgressBar() {
        if (this.progressBarStart.getValue() < 100) {
            this.clearTimeout();
            this.doProgressBar();
        }
    }

    doProgressBar() {
        this.progressBarRef = setTimeout(() => {
            this.progressBarStart.next(this.progressBarStart.getValue() + 10);
            this.progressFinish();
        }, 500);
    }

    toogleProgress() {
        this.paused != this.paused;

        if (!this.paused) {
            this.doProgressBar();
        } else {
            this.clearTimeout();
        }
    }

    private clearTimeout() {
        if (this.progressBarRef) {
            clearTimeout(this.progressBarRef);
            this.progressBarRef = null;
        }
    }

    progressFinish() {
        if (this.progressBarStart.getValue() == 100) {
            this.progressBarStart.next(0);
            this.progressBarEndSource.next();
        } else {
            this.startProgressBar();
        }

    }

}