import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorregisterService {
  private ApiUrl="http://localhost:63503/api/Doctors";
 

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  create(doctor: Doctor): Observable<Doctor> {
    return this.httpClient.post<Doctor>(this.ApiUrl, JSON.stringify(doctor), this.httpOptions)
  }   
}
