import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CreditCardDirectivesModule } from 'ngx-mat-cc';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
