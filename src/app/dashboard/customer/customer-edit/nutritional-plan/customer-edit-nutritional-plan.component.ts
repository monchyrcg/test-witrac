import { Component, OnInit } from "@angular/core";
import { CdkDrag, CdkDragDrop, copyArrayItem } from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";
import { CustomerEditNutritionalPlanService } from "./customer-edit-nutritional-plan.service";
import { Day } from "src/app/shared/classes/day.class";

@Component({
    selector: "customer-edit-nutritional-plan",
    templateUrl: "./customer-edit-nutritional-plan.component.html",
    styleUrls: ["./customer-edit-nutritional-plan.component.scss"]
})
export class CustomerEditNutritionalPlanComponent implements OnInit {

    items = [];

    week = [
        new Day('Lunes'),
        new Day('Martes'),
        new Day('Miercoles'),
        new Day('Jueves'),
        new Day('Viernes'),
        new Day('Sabado'),
        new Day('Domingo')
    ];

    dishes = [];
    menus = [];
    products = [];

    complements = [];

    listProductsSubscription: Subscription = null;

    loading: boolean = true;
    constructor(
        private nutritionalPlanService: CustomerEditNutritionalPlanService
    ) { }

    ngOnInit(): void {
        this.nutritionalPlanService.getNutritionalPlan().subscribe(
            response => {
                this.dishes = response.meals;
                this.menus = response.diets;
                this.products = response.complements;
                this.loading = false;
            }
        )
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
                this.loading = true;
                setTimeout(() => {
                    this.generateMenu(event.item.data.days);
                }, 800);
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
        let type_schedule = 0;
        days.forEach(element => {
            element.meals.forEach(meal => {
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
                this.week[element.day].schedule[type_schedule].array.push(meal);
            });
        });
        this.loading = false;
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
        console.log(this.week);
    }
}