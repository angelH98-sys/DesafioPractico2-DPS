import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentPanelComponent } from './components/appointment-panel/appointment-panel.component';
import { CustomerPanelComponent } from './components/customer-panel/customer-panel.component';
import { CustomerSignupComponent } from './components/customer-signup/customer-signup.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"login", component: LoginComponent},
  {path:"customer/signup", component: CustomerSignupComponent},
  {path:"customer/panel", component: CustomerPanelComponent},
  {path:"appointment/panel/:id", component: AppointmentPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
