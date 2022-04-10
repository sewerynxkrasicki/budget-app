import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import { BalanceComponent } from './balance/balance.component';
import { BottomTransactionCardComponent } from './bottom-transaction-card/bottom-transaction-card.component';
import { TransactionComponent } from './bottom-transaction-card/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomNavigationComponent,
    HeaderComponent,
    BalanceComponent,
    BottomTransactionCardComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    BadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
