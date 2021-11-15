import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../Models/patient';
import { NotificationService } from '../Services/notification.service';
import { PatientloginService } from '../Services/patientlogin.service';
import { RegisterpatientService } from '../Services/registerpatient.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor() { }    
  
  ngOnInit() {    
  }
  
} 
