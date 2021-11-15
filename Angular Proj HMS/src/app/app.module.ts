import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrRegistrationComponent } from './dr-registration/dr-registration.component';
import { DrLoginComponent } from './dr-login/dr-login.component';
import { ProfileComponent } from './profile/profile.component';
import { DrdashboardComponent } from './drdashboard/drdashboard.component';
import { BookappoinmentComponent } from './bookappoinment/bookappoinment.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { GeneratefileComponent } from './generatefile/generatefile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminloginComponent,
    PatientRegistrationComponent,
    HomeComponent,
    PatientLoginComponent,
    AdminhomeComponent,
    DashboardComponent,
    DrRegistrationComponent,
    DrLoginComponent,
    ProfileComponent,
    DrdashboardComponent,
    BookappoinmentComponent,
    EditprofileComponent,
    GeneratefileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
