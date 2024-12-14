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

  getDoctors() : Observable<IDoctor[]>{
    const url = `${this.baseUrl}/GetAllDoctors`;
    console.log(url);
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

  addDoctor(doctorName: string): Observable<boolean>{
    const url = `${this.baseUrl}/AddDoctor`
    console.log(url);
    const doctor = { // Or use null if the backend auto-generates this value
      doctorName: doctorName
    };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<boolean>(url, doctor, httpOptions).pipe(catchError(this.errorHandler));
  }

  editDoctorDetails(doctorId : number, doctorName: string): Observable<boolean>{
    const url = `${this.baseUrl}/UpdateDoctorDetails`;
    var obj: IDoctor = {doctorId: doctorId, doctorName: doctorName};
    return this.http.put<boolean> (url, obj).pipe(catchError(this.errorHandler));
  }

  editSurgery( surgeryId: number, doctorId: number, surgeryDate: Date, startTime: number, endTime: number, surgeryCategory: string): Observable<boolean>{
    const url = `${this.baseUrl}/UpdateSurgery`;
    var obj: ISurgery = { surgeryId: surgeryId, doctorId: doctorId, surgeryDate: surgeryDate, startTime: startTime, endTime: endTime, surgeryCategory: surgeryCategory};
    return this.http.put<boolean>(url, obj).pipe(catchError(this.errorHandler));
  }

  deletedoctor(doctorId: number): Observable<boolean>{
    const url = `${this.baseUrl}/DeleteDoctor/${doctorId}`;
    return this.http.delete<boolean>(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
