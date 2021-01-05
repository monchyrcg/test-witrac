import { Component, OnInit, OnDestroy } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { ModalService } from "src/app/shared/services/modal.service";
import { SettingGeneralService } from "src/app/shared/services/settings-general.service";
import { NutritionalPlanInfoComponent } from "./info/info.component";
import { NutritionalPlanService } from "./nutritional-plan.service";


@Component({
    selector: "app-nutritional-plan",
    templateUrl: "./nutritional-plan.component.html",
    styleUrls: ["./nutritional-plan.component.scss"]
})
export class NutritionalPlanComponent implements OnInit, OnDestroy {

    desktop: boolean;

    // desktop
    breakfasts;
    lunchs;
    meals;
    snacks;
    dinners;
    complements;

    // others
    week;
    schedule;

    //loading
    isReady: boolean = false;

    constructor(
        private nutritionalPlan: NutritionalPlanService,
        public settingGeneralService: SettingGeneralService,
        private modalService: ModalService,
        public deviceService: DeviceDetectorService
    ) {
        this.desktop = this.deviceService.isDesktop();
    }

    ngOnInit(): void {
        this.nutritionalPlan.getNutritionalPlan(this.desktop).subscribe(
            response => {
                if (this.desktop) {
                    this.breakfasts = response.breakfasts;
                    this.lunchs = response.lunches;
                    this.meals = response.meals;
                    this.snacks = response.snacks;
                    this.dinners = response.dinners;
                    this.complements = response.complements;
                } else {
                    this.week = response.week;

                    this.schedule = this.week[0].schedule;
                    this.complements = response.complements_customer;

                }
                this.isReady = true;
                console.log(this.isReady);
            }
        );
    }

    showInfoMeal(meal) {
        this.modalService.init(NutritionalPlanInfoComponent, { meal: meal }, { closeModal: this.closeModal.bind(this) });
    }

    closeModal() {
        this.modalService.destroy();
    }

    changeDay(value) {
        this.schedule = this.week[value].schedule;
    }

    ngOnDestroy(): void {

    }
}