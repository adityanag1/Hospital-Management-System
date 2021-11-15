import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrRegistrationComponent } from './dr-registration/dr-registration.component';
import { DrLoginComponent } from './dr-login/dr-login.component';
import { ProfileComponent } from './profile/profile.component';
import { DrdashboardComponent } from './drdashboard/drdashboard.component';
import { BookappoinmentComponent } from './bookappoinment/bookappoinment.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { GeneratefileComponent } from './generatefile/generatefile.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Home", component: HomeComponent},
  {path: "Registration", component: PatientRegistrationComponent},
  {path:"AdminLogin", component: AdminloginComponent},
  {path:"PatientLogin",component: PatientLoginComponent},
  {path:"AdminHome",component:AdminhomeComponent},
  {path:"Dashboard",component:DashboardComponent},
  {path:"DrRegistration",component:DrRegistrationComponent},
  {path:"DrLogin",component:DrLoginComponent},
  {path:"Profile",component:ProfileComponent},
  {path:"DrDashboard",component:DrdashboardComponent},
  {path:"BookAppoinment",component:BookappoinmentComponent},
  {path:"BookAppoinment/:aid",component:BookappoinmentComponent},
  {path:"EditProfile",component:EditprofileComponent},
  {path:"GenerateFile/:patientId/:aid",canActivate:[AuthGuardService] ,component:GeneratefileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[HomeComponent,EditprofileComponent,GeneratefileComponent,AdminhomeComponent,PatientRegistrationComponent,AdminloginComponent,PatientLoginComponent,AdminhomeComponent,DashboardComponent,DrRegistrationComponent,DrLoginComponent,ProfileComponent,DrdashboardComponent,BookappoinmentComponent]