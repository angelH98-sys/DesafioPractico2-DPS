import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModules } from './material';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";


import { CustomerSignupComponent } from './components/customer-signup/customer-signup.component';
import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service';
import { CustomerPanelComponent, UpdateCustomerDialog, DeleteCustomerDialog } from './components/customer-panel/customer-panel.component';
import { AppointmentPanelComponent, NewAppointmentDialog, UpdateAppointmentDialog, DeleteAppointmentDialog, TicketDialog } from './components/appointment-panel/appointment-panel.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerSignupComponent,
    CustomerPanelComponent,
    UpdateCustomerDialog,
    DeleteCustomerDialog,
    AppointmentPanelComponent,
    NewAppointmentDialog,
    UpdateAppointmentDialog,
    DeleteAppointmentDialog,
    TicketDialog,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
