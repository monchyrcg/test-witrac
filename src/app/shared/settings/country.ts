import { DAYS_OF_WEEK } from 'angular-calendar';

export class Countries {

    public static countries = ['es', 'en', 'fr', 'it', 'pl'];

    public static settingCountry = {
        'es': {
            'locale': 'es',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY]
        },
        'en': {
            'locale': 'en',
            'legal_age': 21,
            'weekStartsOn': DAYS_OF_WEEK.SUNDAY,
            'weekendDays': [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY]
        },
        'fr': {
            'locale': 'fr',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY]
        },
        'it': {
            'locale': 'it',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY]
        },
        'pl': {
            'locale': 'en',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY]
        },
    };
}