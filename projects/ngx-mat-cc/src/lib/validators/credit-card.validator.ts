import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { CreditCard } from '../shared/credit-card';
import { getTypeInfo, types as CardType } from 'credit-card-type';

export class CreditCardValidator {
  static validateCCNumber(control: AbstractControl): ValidationErrors|null {
    if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
      return {ccNumber: true};
    }

    const num = control.value.toString().replace(/\s+|-/g, '');

    if (!/^\d+$/.test(num)) {
      return {ccNumber: true};
    }

    const card = getTypeInfo(num);

    if (!card) {
      return {ccNumber: true};
    }

    if (card.lengths.includes(num.length) && CreditCard.luhnCheck(num)) {
      return null;
    }

    const upperlength = card.lengths[card.lengths.length - 1];
    if (num.length > upperlength) {
      const registeredNum = num.substring(0, upperlength);
      if (CreditCard.luhnCheck(registeredNum)) {
        return null;
      }
    }

    return {ccNumber: true};
  }

  static validateExpDate(control: AbstractControl): ValidationErrors|null {
    if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
      return {expDate: true };
    }

    if (typeof control.value !== 'undefined' && control.value.length >= 5) {
      let [month, year] = control.value.split(/[\s\/]+/, 2);
      let prefix;

      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = new Date().getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10).toString();
      year  = parseInt(year, 10).toString();

      if (/^\d+$/.test(month) && /^\d+$/.test(year) && (month >= 1 && month <= 12)) {
        let currentTime;
        let expiry;
        expiry = new Date(year, month);
        currentTime = new Date();
        expiry.setMonth(expiry.getMonth() - 1);
        expiry.setMonth(expiry.getMonth() + 1, 1);

        if (expiry > currentTime) {
          return null;
        }
      }
    }

    return {expDate: true };

  }
}
