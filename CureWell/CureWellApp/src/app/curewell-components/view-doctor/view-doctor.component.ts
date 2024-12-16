import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { IDoctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class ViewDoctorComponent implements OnInit{

  doctorList: IDoctor[] = [];
  showMsgDiv: boolean = false;
  errMsg: string = " ";
  status: boolean = false;
  
  selectedDoctorData !: number; 
  isUpdateFormVisible : boolean = false;

  constructor(private _service: CurewellService, private _router: Router){}

  ngOnInit(): void {
    this.getDoctors();
  }
  
  getDoctors(){
      this._service.getDoctors().subscribe({
        next: response => {
          this.doctorList = response;
          this.showMsgDiv = true;
        },
        error: responseError => {
          this.doctorList = [];
          this.errMsg = responseError;
          console.log(this.errMsg);
        },
        complete: () => console.log("Doctors Fetched Successfully")
      });
  }


  openUpdate(doctor: any): void {
    this.isUpdateFormVisible = true;
    this.selectedDoctorData = doctor;
  }

  closeUpdateForm(): void {
    setTimeout(() => {
      this.isUpdateFormVisible = false;
    }, 10);
  }

  removeDoctor(doctorId: number){
    this._service.deletedoctor(doctorId).subscribe({
      next: responseData =>{
        this.getDoctors();
      },
      error: responseError =>{
        this.errMsg = responseError;
      },
      complete: () => console.log("Some error occured")
  })
  }
}
