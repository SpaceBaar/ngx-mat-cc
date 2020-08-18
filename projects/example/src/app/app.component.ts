import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CreditCardValidators, CreditCard } from 'ngx-mat-cc';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public demoForm: FormGroup;
  public submitted = false;

  public type$ = defer(() => this.demoForm.get('creditCard').valueChanges)
    .pipe(map((num: string) => CreditCard.cardType(num)));

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.demoForm = this.fb.group({
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
  }

  public goToNextField(controlName: string, nextField: HTMLInputElement) {
    if (this.demoForm.get(controlName)?.valid) {
      nextField.focus();
    }
  }

  public onSubmit(demoForm: FormGroup) {
    this.submitted = true;
    console.log(demoForm.value);
  }
}
