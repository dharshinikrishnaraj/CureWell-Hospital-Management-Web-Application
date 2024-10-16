import { Component, OnInit } from '@angular/core';
import { IDoctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.css'
})
export class ViewDoctorComponent implements OnInit{

  doctorList: IDoctor[] = [];
  showMsgDiv: boolean = false;
  errMsg: string = " ";
  status: boolean = false;

  constructor(private _service: CurewellService, private _router: Router){}

  ngOnInit(): void {
    this.getDoctors();
  }
  
  getDoctors(){
      this._service.getDoctors().subscribe(
        responseData => {
          this.doctorList = responseData;
          this.showMsgDiv = true;
        },
        responseError => {
          this.doctorList = [];
          this.errMsg = responseError;
          console.log(this.errMsg);
        },
        () => console.log("Doctors Fetched Successfully")
      );
  }

  editDoctorDetails(doctorId : number, doctorName: string){
    this._service.editDoctorDetails(doctorId, doctorName).subscribe(
        responseData => {
          //this.status = responseData;
          this._router.navigate(['/update-doctor', doctorId]);
        }
    );
  }

  removeDoctor(doctorId: number){
    this._service.deletedoctor(doctorId).subscribe(
      responseData =>{
        this.status = responseData;
        if (this.status){
          alert("Doctor detailed deleted successfully!")
        }
        else{
          alert("Doctor's name not deleted")
        }
      },
      responseError =>{
        this.errMsg = responseError;
      },
      () => console.log("Some error occured")
    )
  }
}
