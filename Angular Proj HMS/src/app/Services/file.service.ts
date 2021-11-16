import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../Models/filet';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ApiUrl="http://localhost:63503/api/Filets";
  
  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  postFilet(file:File): Observable<File> {
    return this.httpClient.post<File>(this.ApiUrl, JSON.stringify(file), this.httpOptions)
  } 

  getFiles(): Observable<File[]> {
    return this.httpClient.get<File[]>(this.ApiUrl+'/GetFiles' ) 
  }

}
