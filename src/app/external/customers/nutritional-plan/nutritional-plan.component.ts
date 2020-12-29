import { Component, OnInit, OnDestroy } from "@angular/core";
import { NutritionalPlanService } from "./nutritional-plan.service";


@Component({
    selector: "app-nutritional-plan",
    templateUrl: "./nutritional-plan.component.html",
    styleUrls: ["./nutritional-plan.component.scss"]
})
export class NutritionalPlanComponent implements OnInit, OnDestroy {

    breakfasts;
    lunchs;
    meals;
    snacks;
    dinners;

    constructor(
        private nutritionalPlan: NutritionalPlanService
    ) { }

    ngOnInit(): void {
        this.nutritionalPlan.getNutritionalPlan().subscribe(
            response => {
                console.log(response);
                this.breakfasts = response.breakfasts;
                this.lunchs = response.lunchs;
                this.meals = response.meals;
                this.snacks = response.snacks;
                this.dinners = response.dinners;
            }
        );
    }

    ngOnDestroy(): void {

    }
}