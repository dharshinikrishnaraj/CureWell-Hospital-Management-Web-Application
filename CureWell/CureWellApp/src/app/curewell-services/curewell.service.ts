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

  getDoctors() : Observable<IDoctor[]>{
    let tempVar = this.http.get<IDoctor[]>('https://localhost:44388/api/CureWell/GetAllDoctors');
    return tempVar;
  }

  getAllSpecializations(): Observable<ISpecialization[]>{
    let tempVar = this.http.get<ISpecialization[]>('https://localhost:44388/api/CureWell/GetSpecializations').pipe(catchError(this.errorHandler));
    return tempVar;
  }
 
  getSurgeriesForToday(): Observable<ISurgery[]> {
    let tempVar = this.http.get<ISurgery[]>('https://localhost:44388/api/CureWell/GetAllSurgeryTypeForToday').pipe(catchError(this.errorHandler));
    return tempVar;
  }

  addDoctor(doctorId : number, doctorName: string): Observable<boolean>{
    var obj: IDoctor = {doctorId: doctorId , doctorName: doctorName};
    return this.http.post<boolean>('https://localhost:44388/api/CureWell/AddDoctor', obj).pipe(catchError(this.errorHandler));
  }

  editDoctorDetails(doctorId : number, doctorName: string): Observable<boolean>{
    var obj: IDoctor = {doctorId: doctorId, doctorName: doctorName};
    return this.http.put<boolean> ('https://localhost:44388/api/CureWell/UpdateDoctorDetails', obj).pipe(catchError(this.errorHandler));
  }

  editSurgery( surgeryId: number, doctorId: number, surgeryDate: Date, startTime: number, endTime: number, surgeryCategory: string): Observable<boolean>{
    var obj: ISurgery = { surgeryId: surgeryId, doctorId: doctorId, surgeryDate: surgeryDate, startTime: startTime, endTime: endTime, surgeryCategory: surgeryCategory};
    return this.http.put<boolean>('https://localhost:44388/api/CureWell/UpdateSurgery', obj).pipe(catchError(this.errorHandler));
  }

  deletedoctor(doctorId: number, doctorName: string): Observable<boolean>{
    var obj: IDoctor = {doctorId: doctorId, doctorName: doctorName};
    let httpOptions =  { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: obj }
    return this.http.delete<boolean>('https://localhost:44388/api/CureWell/DeleteDoctor', httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
