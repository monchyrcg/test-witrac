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
                this.listAssets(query);
            });
    }

    listAssets(query?) {
        this.assetService.listAssets(query);
    }


    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();

        if (this.findAssetSubscription)
            this.findAssetSubscription.unsubscribe();
    }
}