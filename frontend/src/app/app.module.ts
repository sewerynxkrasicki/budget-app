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
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {InputTextModule} from "primeng/inputtext";
import { RegisterComponent } from './register/register.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {CdkScrollableModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    AppComponent,
    BottomNavigationComponent,
    HeaderComponent,
    BalanceComponent,
    BottomTransactionCardComponent,
    TransactionComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TransactionHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    BadgeModule,
    InputTextModule,
    InputSwitchModule,
    FormsModule,
    MultiSelectModule,
    CdkScrollableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
