import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { LibraryService } from './library.service';


@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    providers: [LibraryService]
})

export class LibraryComponent implements OnInit, OnDestroy {

    findLibrarySubscription: Subscription = null;
    libraryList$ = Observable;

    libraries;
    loadingShow: boolean = false;

    // pagination
    page = 1;
    per_page = 5;
    from: number;
    to: number;
    total: number;
    current_page: number;
    first_page: boolean = true;
    last_page: boolean = false;
    links: [];

    // locale
    private subscription = new Subscription();

    constructor(
        private builder: FormBuilder,
        private libraryService: LibraryService,
        private snackbarService: SnackbarService
    ) { }

    ngOnInit(): void {
        this.listLibrary();

        this.findLibrarySubscription = this.libraryService.libraryList$.subscribe(
            (response) => {
                response.subscribe(
                    (data) => {
                        this.loadingShow = true;

                        this.libraries = data['data'];


                        // pagination
                        this.from = data['from'];
                        this.to = data['to'];
                        this.total = data['total'];
                        this.current_page = data['current_page'];
                        this.first_page = data['current_page'] == 1 ? true : false;
                        this.last_page = data['last_page'] === data['current_page'] ? true : false;
                        this.links = data['links'];

                        this.loadingShow = false;
                    }
                )
                this.libraryList$ = response;
            }
        );

    }

    listLibrary(query?) {
        this.libraryService.listLibraries(this.page, this.per_page);
    }

    nextPage(page) {
        console.log(this.page);
        if (page == '+')
            page = ++this.page;

        if (page == '-')
            page = --this.page;

        this.page = page;

        this.listLibrary();
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();

        if (this.findLibrarySubscription)
            this.findLibrarySubscription.unsubscribe();
    }
}