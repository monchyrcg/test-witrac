import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AssetService } from './asset.service';


@Component({
    selector: 'app-asset',
    templateUrl: './asset.component.html',
    // styleUrls: ['./asset.component.scss'],
})

export class AssetComponent implements OnInit, OnDestroy {

    findAssetSubscription: Subscription = null;
    assetsList$ = Observable;

    searchText: string;
    assetForm: FormGroup;
    private debounce: number = 1250;

    assets;
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
        private router: Router,
        private assetService: AssetService
    ) { }

    ngOnInit(): void {
        this.listAssets();

        this.findAssetSubscription = this.assetService.assetsList$.subscribe(
            (response) => {
                response.subscribe(
                    (data) => {
                        this.loadingShow = true;

                        this.assets = data['data'];
                        console.log(this.assets);
                        // pagination
                        const meta = data['meta'];

                        this.from = data['from'];
                        this.to = data['to'];
                        this.total = data['total'];
                        this.current_page = data['current_page'];
                        this.first_page = data['current_page'] == 1 ? true : false;
                        this.last_page = data['las_page'] === data['current_page'] ? true : false;
                        this.links = data['links'];

                        this.loadingShow = false;
                    }
                )
                this.assetsList$ = response;
            }
        );

        this.assetForm = this.builder.group({
            searchText: [''],
        });

        this.assetForm.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                this.page = 1;
                this.listAssets(query);
            });
    }

    listAssets(query?) {
        this.assetService.listAssets(this.page, this.per_page, query);
    }

    nextPage(page) {
        console.log(this.page);
        if (page == '+')
            page = ++this.page;

        if (page == '-')
            page = --this.page;

        this.page = page;
        console.log(this.page);
        this.listAssets();
    }

    progressBarFinish() {
        console.log('progress is finished');
    }


    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();

        if (this.findAssetSubscription)
            this.findAssetSubscription.unsubscribe();
    }
}