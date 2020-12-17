import { Schedule } from "./schedule.class";

export class Day {

    public name: string;
    public schedule: Schedule[];

    constructor(name) {
        this.name = name;
        this.schedule = [
            new Schedule('Breakfast', 'breakfast'),
            new Schedule('Lunch', 'lunchs'),
            new Schedule('Meals', 'meals'),
            new Schedule('Snack', 'snscks'),
            new Schedule('Dinner', 'dinners'),
        ];
    }
}