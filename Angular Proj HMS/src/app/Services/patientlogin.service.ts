import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Patient } from '../Models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientloginService {
  private ApiUrl="http://localhost:63503/patientLogin";
  private emailUrl="http://localhost:63503/GetPatientsByEmail";
  private getUrl = "http://localhost:63503/GetPatientsById";
  private getus="http://localhost:63503/api/Patients"

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getUser(id:number): Observable<Patient> {
    return this.httpClient.get<Patient>(this.getUrl+"?id="+id) 
  }
  getuser(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.getus ) 
  }
   
  getbyemail(email: string): Observable<Patient> {
    console.log("hello I am in getall");
    let url = this.emailUrl +"?email=" +email
    console.log(url);
    return this.httpClient.get<Patient>(url);  
  }
  Login(patient: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(this.ApiUrl, JSON.stringify(patient), this.httpOptions)
  }   
  getPatient(){
    let patientdetails:any=sessionStorage.getItem('patient')
    let patient=JSON.parse(patientdetails)
    return patient 
  } 
  setPatient(patient: Patient){
    sessionStorage.setItem('patient',JSON.stringify(patient))
  }
}