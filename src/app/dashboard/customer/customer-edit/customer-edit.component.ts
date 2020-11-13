import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Customer } from 'src/app/shared/interfaces/customers.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { MagentoService } from 'src/app/shared/services/magento.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { MenuComponent } from '../../home/menu/menu.component';
import { EChartOption } from 'echarts';


@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.scss']
})

export class CustomerEditComponent implements OnInit, OnDestroy {

    customer_id: string;
    customer: Customer = null;
    customerSubscription: Subscription = null;
    isOpen = false;

    customer$: Observable<Customer>;

    // listProducts
    products;
    listProductsSubscription: Subscription = null;

    name: string;
    productForm: FormGroup;
    private debounce: number = 200;

    // pagination
    page = 1;
    per_page = 15;
    from: number;
    to: number;
    total: number;
    current_page: number;
    first_page: boolean = true;
    last_page: boolean = false;
    links: [];
    hasMore: boolean = true;

    options: any;

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        public settingService: SettingsService,
        private magentoService: MagentoService,
        private builder: FormBuilder,
        private menuComponent: MenuComponent
    ) { }

    ngOnInit(): void {
        this.listProducts();

        this.customer_id = this.route.snapshot.paramMap.get('hash');

        this.customer$ = this.customerService.getCustomer(this.customer_id);

        this.listProductsSubscription = this.magentoService.listProducts$.subscribe(
            (response) => {
                response.subscribe(
                    (data) => {
                        this.products = data['data']['products'];

                        // pagination
                        this.hasMore = data['data']['hasMore'];
                    }
                )
            }
        );
        this.productForm = this.builder.group({
            name: [' ']
        });

        this.productForm.valueChanges
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query => {
                this.page = 1;
                this.listProducts(query);
            });

        const xAxisData = [];
        const data1 = [];
        const data2 = [];

        for (let i = 0; i < 100; i++) {
            xAxisData.push('category' + i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        this.options = {
            legend: {
                data: ['bar', 'bar2'],
                align: 'left',
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false,
                },
            },
            yAxis: {},
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    data: data1,
                    animationDelay: (idx) => idx * 10,
                },
                {
                    name: 'bar2',
                    type: 'bar',
                    data: data2,
                    animationDelay: (idx) => idx * 10 + 100,
                },
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx) => idx * 5,

        }
    }

    private listProducts(query?) {
        this.magentoService.listProducts(this.page, this.per_page, query);
    }

    createAppointment(): void {
        this.customer$.subscribe((customer) => {
            this.menuComponent.createAppointment(null, customer)
        })

    }

    ngOnDestroy(): void {
        if (this.customerSubscription) {
            this.customerSubscription.unsubscribe();
        }

        if (this.listProductsSubscription) {
            this.listProductsSubscription.unsubscribe();
        }
    }
}