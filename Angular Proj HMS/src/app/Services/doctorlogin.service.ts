import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorloginService {
  private ApiUrl="http://localhost:63503/drLogin";
  private emailUrl="http://localhost:63503/GetDoctorsByEmail";
  private nameUrl="http://localhost:63503/GetDoctorsByName";
  private getUrl = "http://localhost:63503/GetDoctorsById";
  private getdr="http://localhost:63503/api/Doctors"

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUser(id:number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(this.getUrl+"?id="+id) 
  } 

  getbyemail(email: string): Observable<Doctor> {
    console.log("hello I am in getall");
    let url = this.emailUrl +"?email=" +email
    console.log(url);
    return this.httpClient.get<Doctor>(url);  
  }

  getbyname(name: string): Observable<Doctor> {
    console.log("hello I am in getall");
    let url = this.nameUrl +"?name=" +name
    console.log(url);
    return this.httpClient.get<Doctor>(url);  
  }
  
  Login(doctor: Doctor): Observable<Doctor> {
    return this.httpClient.post<Doctor>(this.ApiUrl, JSON.stringify(doctor), this.httpOptions)
  }

  getDoctor(){
    let doctordetails:any=sessionStorage.getItem('doctor')
    let doctor=JSON.parse(doctordetails)
    return doctor 
  }

  setDoctor(doctor: Doctor){
    sessionStorage.setItem('doctor',JSON.stringify(doctor))
  }

  getDr(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(this.getdr) 
  }
  
}
