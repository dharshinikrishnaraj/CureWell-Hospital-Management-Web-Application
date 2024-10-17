import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this.http.get<IDoctor[]>('https://localhost:44388/api/CureWell/GetAllDoctors');
  }

  getAllSpecializations(): Observable<ISpecialization[]>{
    return this.http.get<ISpecialization[]>('https://localhost:44388/api/CureWell/GetSpecializations').pipe(catchError(this.errorHandler));
  }
 
  getSurgeriesForToday(): Observable<ISurgery[]> {
    return this.http.get<ISurgery[]>('https://localhost:44388/api/CureWell/GetAllSurgeryTypeForToday').pipe(catchError(this.errorHandler));
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

  deletedoctor(doctorId: number): Observable<boolean>{
    const url = `${'https://localhost:44388/api/CureWell/DeleteDoctor'+ doctorId}`;
    return this.http.delete<boolean>(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
