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
    page = 1;
    per_page = 1599;

    name: string;

    loading: boolean = true;
    constructor(
        private nutritionalPlanService: CustomerEditNutritionalPlanService
    ) { console.log(this.week); }

    ngOnInit(): void {
        this.nutritionalPlanService.getNutritionalPlan().subscribe(
            response => {
                this.dishes = response.meals;
                this.menus = response.diets;
                this.products = response.complements;
                this.loading = false;
            }
        )
        this.items = this.menus;
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
        console.log(event);
        if (event.container.id !== event.previousContainer.id) {
            if (event.item.data.type == 2) {
                this.loading = true;
                setTimeout(() => {
                    this.generateMenu(event.item.data.meals);
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

    private generateMenu(dishes) {
        /*  dishes.forEach(element => {
             switch (element.type_schedule) {
                 case 1:
                     this.breakfasts.push(element);
                     break;
                 case 2:
                     this.lunchs.push(element);
                     break;
                 case 3:
                     this.meals.push(element);
                     break;
                 case 4:
                     this.snacks.push(element);
                     break;
                 case 5:
                     this.dinners.push(element);
                     break;
             }
         }); */
        this.loading = false;
    }

    isType(item: CdkDrag<any>) {
        return item.data.type == 1;
    }

    deleteElement(body) {
        console.log(this.week[body.position].schedule[0]);
        this[body.type] = this[body.type].filter(function (value, index, arr) {
            if (value.id !== body.event.id) {
                return value;
            }
        });
    }

    submit() {
        console.log(this.week);
    }
}