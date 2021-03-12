import { Component, OnDestroy, OnInit } from "@angular/core";
import { CdkDrag, CdkDragDrop, copyArrayItem } from "@angular/cdk/drag-drop";
import { Observable, Subscription } from "rxjs";
import { CustomerEditNutritionalPlanService } from "./customer-edit-nutritional-plan.service";
import { Day } from "src/app/shared/classes/day.class";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/components/snackbar/snackbar.service";
import { SettingGeneralService } from "src/app/shared/services/settings-general.service";

import { MenuComponent } from "src/app/dashboard/home/menu/menu.component";

@Component({
    selector: "customer-edit-nutritional-plan",
    templateUrl: "./customer-edit-nutritional-plan.component.html",
    styleUrls: ["./customer-edit-nutritional-plan.component.scss"]
})
export class CustomerEditNutritionalPlanComponent implements OnInit, OnDestroy {

    nutritional_id;
    customer_id;
    appointment_id;

    items = [];

    week = [];


    dishes = [];
    menus = [];
    products = [];

    complements = [];

    listProductsSubscription: Subscription = new Subscription;

    private crashSubscription: Subscription;

    loading: boolean = true;
    submitted: boolean = false;

    duration: number;

    types = [];

    probarO: Observable<any> = new Observable;

    crashDays: [];

    constructor(
        private route: ActivatedRoute,
        private nutritionalPlanService: CustomerEditNutritionalPlanService,
        private snackbarService: SnackbarService,
        private settingGeneralService: SettingGeneralService,
        public menuComponent: MenuComponent,
        private router: Router
    ) {
        this.types.push({ id: 1, text: this.settingGeneralService.getLangText('customer_edit.nutritional_plan.types.complements') });
        this.types.push({ id: 2, text: this.settingGeneralService.getLangText('customer_edit.nutritional_plan.types.diets') });
        this.types.push({ id: 3, text: this.settingGeneralService.getLangText('customer_edit.nutritional_plan.types.meals') });
    }


    ngOnInit(): void {

        this.crashSubscription = this.nutritionalPlanService.crashState.subscribe(
            (response) => {
                let crashDayMails = [];
                response.days.forEach(crashDay => {
                    this.cleanDay(crashDay);
                    crashDayMails[crashDay] = this.crashDays[crashDay];
                });

                this.generateMenu(crashDayMails);
            }
        );

        this.customer_id = this.route.snapshot.paramMap.get('customer');
        this.appointment_id = this.route.snapshot.paramMap.get('appointment');

        this.listProductsSubscription.add(this.nutritionalPlanService.getNutritionalPlanData().subscribe(
            response => {
                this.dishes = response.meals;
                this.menus = response.diets;

                this.products = response.complements;

                this.nutritionalPlanService.getNutritionalPlan(this.customer_id, this.appointment_id).subscribe(
                    res => {
                        this.complements = res.complements;
                        this.duration = res.info.duration;
                        this.week = res.week;
                        this.nutritional_id = res.id;

                        this.loading = false;
                    }, error => {
                        this.week = [
                            new Day('Lunes'),
                            new Day('Martes'),
                            new Day('Miercoles'),
                            new Day('Jueves'),
                            new Day('Viernes'),
                            new Day('Sabado'),
                            new Day('Domingo')
                        ];
                        this.loading = false;
                    }
                )
            }
        ));
    }

    private cleanDay(day: number) {
        for (let index = 0; index < 5; index++) {
            this.week[day].schedule[index].array = [];
        }
    }

    changeType(value) {
        this.items = this.returnArray(value);
    }

    private returnArray(value) {
        switch (value) {
            case '1':
                return this.products;
                break;
            case '2':
                return this.menus;
                break;
            case '3':
                return this.dishes;
                break;
        }
    }

    noReturnPredicate() {
        return false;
    }

    drop(event: CdkDragDrop<object[]>) {
        if (event.container.id !== event.previousContainer.id) {
            if (event.item.data.type == 2) {
                const is_shock = event.item.data.is_shock;
                let days = event.item.data.days;

                if (!is_shock) {
                    this.loading = true;
                    setTimeout(() => {
                        this.generateMenu(days);
                    }, 800);
                } else {
                    this.crashDays = days;
                    this.menuComponent.createCrashDay();
                }
            } else {
                copyArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex
                );
            }
        }
    }

    private generateMenu(days) {
        days.forEach(day => {
            this.generateDay(day);
        });

        this.loading = false;
    }


    private generateDay(day) {
        let type_schedule = 0;

        day.meals.forEach(meal => {
            switch (meal.type_schedule) {
                case 1:
                    type_schedule = 0;
                    break;
                case 2:
                    type_schedule = 1;
                    break;
                case 3:
                    type_schedule = 2;
                    break;
                case 4:
                    type_schedule = 3;
                    break;
                case 5:
                    type_schedule = 4;
                    break;
            }

            this.week[day.day].schedule[type_schedule].array.push(meal);
        });
    }

    isType(item: CdkDrag<any>) {
        return item.data.type == 1;
    }

    deleteElement(body) {
        let type_schedule;
        this.week[body.position].schedule.forEach((element, key) => {
            if (element.itemName == body.type) {
                type_schedule = key;
            }
        });

        this.week[body.position].schedule[type_schedule].array = this.week[body.position].schedule[type_schedule].array.filter(function (value, index, arr) {
            if (value.id !== body.event.id) {
                return value;
            }
        });
    }

    deleteComplement(complement) {
        this.complements = this.complements.filter(function (value, index, arr) {
            if (value.id !== complement.id) {
                return value;
            }
        });
    }

    submit() {
        if (this.complements.length == 0 || undefined == typeof this.duration) {
            this.submitted = true;
            return;
        }

        let body = {
            'id': this.nutritional_id,
            'duration': this.duration,
            'complements': JSON.stringify(this.complements),
            'week': JSON.stringify(this.week)
        };

        this.listProductsSubscription.add(this.nutritionalPlanService.saveNutritionalPlan(this.customer_id, this.appointment_id, body).subscribe(
            response => {
                this.snackbarService.show('Nutritional created successfully', 'success');
                this.router.navigate(['/customers/' + this.customer_id]);
            },
            error => {
                this.snackbarService.show('Something was wrong', 'danger');
            }
        ));
    }

    ngOnDestroy(): void {
        if (this.listProductsSubscription) {
            this.listProductsSubscription.unsubscribe();
        }
    }
}