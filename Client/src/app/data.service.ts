import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL: string = "http://localhost:8080/";

  constructor(
    private http: HttpClient
  ) { }

  generateFile() {

    return this.http.get(this.baseURL + 'file/generate');
  }

  getReport() {
    return this.http.get(this.baseURL + 'file/report');
  }
  download(): Observable<Blob> {
    return this.http.get(this.baseURL + 'file/download', {
      responseType: 'blob'
    })
  }

}
