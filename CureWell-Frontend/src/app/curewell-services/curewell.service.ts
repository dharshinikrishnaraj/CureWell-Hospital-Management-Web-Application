import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IDoctor } from '../curewell-interfaces/doctor';
import { ISpecialization } from '../curewell-interfaces/specialization';
import { IDoctorSpecialization } from '../curewell-interfaces/doctorspecialization';
import { ISurgery } from '../curewell-interfaces/surgery';

@Injectable({
  providedIn: 'root'
})
export class CurewellService {

  constructor(private http: HttpClient) { }

  doctors: IDoctor[] = [];
  specialization: ISpecialization[] = [];
  doctorSpecialization: IDoctorSpecialization[] = [];
  surgerys: ISurgery[] = [];
  baseUrl : string = 'https://localhost:44388/api/CureWell';

  getDoctors() : Observable<IDoctor[]>{   //(url, options)
    const url = `${this.baseUrl}/GetAllDoctors`;
    console.log(url);
    return this.http.get<IDoctor[]>(url).pipe(catchError(this.errorHandler));
  }

  getDoctorsById(doctorId: number): Observable<IDoctor[]>{
    const url = `${this.baseUrl}/GetAllDoctorsById/${doctorId}`;
    return this.http.get<IDoctor[]>(url).pipe(catchError(this.errorHandler));
  }

  getAllSpecializations(): Observable<ISpecialization[]>{
    const url = `${this.baseUrl}/GetSpecializations`
    return this.http.get<ISpecialization[]>(url).pipe(catchError(this.errorHandler));
  }
 
  getSurgeriesForToday(): Observable<ISurgery[]> {
    const url = `${this.baseUrl}/GetAllSurgeryTypeForToday`
    return this.http.get<ISurgery[]>(url).pipe(catchError(this.errorHandler));
  }

  addDoctor(doctorName: string): Observable<boolean>{ //(url, body, options)
    const url = `${this.baseUrl}/AddDoctor`;
    const doctor = { 
      doctorName: doctorName
    };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<boolean>(url, doctor, httpOptions).pipe(catchError(this.errorHandler));
  }

  editDoctorDetails(doctor: IDoctor): Observable<boolean>{  //(url, body, options)
    const url = `${this.baseUrl}/UpdateDoctorDetails`;
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<boolean> (url, doctor, httpOptions).pipe(catchError(this.errorHandler));
  }

  editSurgery(surgery: ISurgery): Observable<boolean>{  
    const url = `${this.baseUrl}/UpdateSurgery`;
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<boolean>(url, surgery, httpOptions).pipe(catchError(this.errorHandler));
  }

  deletedoctor(doctorId: number): Observable<boolean>{    //(url, options)
    const url = `${this.baseUrl}/DeleteDoctor/${doctorId}`;
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.delete<boolean>(url, httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
