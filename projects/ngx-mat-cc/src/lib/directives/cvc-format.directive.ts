import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { CreditCard } from '../shared/credit-card';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ccCVC]'
})

export class CvcFormatDirective {

  public target;

  constructor(
    private el: ElementRef,
    @Self() @Optional() private control: NgControl
  ) {
    this.target = this.el.nativeElement;
  }

  /**
   * Updates the value to target element, or FormControl if exists.
   * @param value New input value.
   */
  private updateValue(value: string) {
    if (this.control) {
      this.control.control.setValue(value);
    } else {
      this.target.value = value;
    }
  }

  @HostListener('keypress', ['$event']) onKeypress(e) {
    if (!CreditCard.restrictNumeric(e) && !CreditCard.restrictCvc(e.which, this.target)) {
      e.preventDefault();
    }
  }
  @HostListener('paste', ['$event']) onPaste(e) {
    this.reformatCvc(e);
  }
  @HostListener('change', ['$event']) onChange(e) {
    this.reformatCvc(e);
  }
  @HostListener('input', ['$event']) onInput(e) {
    this.reformatCvc(e);
  }


  private reformatCvc(e) {
    setTimeout(() => {
      let val = CreditCard.replaceFullWidthChars(this.target.value);
      val = val.replace(/\D/g, '').slice(0, 4);
      const oldVal = this.target.value;
      if (val !== oldVal) {
        this.target.selectionStart = this.target.selectionEnd = CreditCard.safeVal(val, this.target, (safeVal => {
          this.updateValue(safeVal);
        }));
      }
    });
  }

}