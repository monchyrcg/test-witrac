import { DAYS_OF_WEEK } from 'angular-calendar';

import Spanish from 'flatpickr/dist/l10n/es.js';
import Polish from 'flatpickr/dist/l10n/pl.js';
import French from 'flatpickr/dist/l10n/fr.js';
import Italian from 'flatpickr/dist/l10n/it.js';
import english from 'flatpickr/dist/l10n/default.js';

export class Countries {

    public static countries = ['es', 'us', 'fr', 'it', 'pl'];

    public static settingCountry = {
        'es': {
            'locale': 'es',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY],
            'flatpickr': Spanish.es,
            'formatMoment': 'DD-MM-YYYY',
            'formatFlatpickr': 'd-m-Y',
            'zip_maps': ['es']
        },
        'us': {
            'locale': 'en',
            'legal_age': 21,
            'weekStartsOn': DAYS_OF_WEEK.SUNDAY,
            'weekendDays': [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY],
            'flatpickr': english,
            'formatMoment': 'MM-DD-YYYY',
            'formatFlatpickr': 'm-d-Y',
            'zip_maps': ['gb', 'us']
        },
        'fr': {
            'locale': 'fr',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY],
            'flatpickr': French.fr,
            'formatMoment': 'DD-MM-YYYY',
            'formatFlatpickr': 'd-m-Y',
            'zip_maps': ['fr']
        },
        'it': {
            'locale': 'it',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY],
            'flatpickr': Italian.it,
            'formatMoment': 'DD-MM-YYYY',
            'formatFlatpickr': 'd-m-Y',
            'zip_maps': ['it']
        },
        'pl': {
            'locale': 'en',
            'legal_age': 18,
            'weekStartsOn': DAYS_OF_WEEK.MONDAY,
            'weekendDays': [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY],
            'flatpickr': Polish.pl,
            'formatMoment': 'DD-MM-YYYY',
            'formatFlatpickr': 'd-m-Y',
            'zip_maps': ['pl']
        },
    };
}