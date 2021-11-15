import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientRegistrationComponent } from '../patient-registration/patient-registration.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
signup=  () => {
  console.log('signup');
  this.router.navigate(['/Registration']);
};

adminlogin=  () => {
  console.log('adminlogin');
  this.router.navigate(['/AdminLogin']);
};

patientlogin=  () => {
  console.log('patientlogin');
  this.router.navigate(['/PatientLogin']);
};

doctorlogin=  () => {
  console.log('doctorlogin');
  this.router.navigate(['/DrLogin']);
};

}
