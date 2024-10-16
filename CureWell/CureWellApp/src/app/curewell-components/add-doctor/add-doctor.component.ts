import { Component } from '@angular/core';
import { IDoctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {
  doctorList: IDoctor[] = [];
  status: boolean = false;
  showMsgDiv: boolean = false;
  msg: string = "";
  errAddMsg: string = "";

  constructor(private _service: CurewellService){}


  addDoctor(doctorId : number, doctorName: string){
    this._service.addDoctor(doctorId, doctorName).subscribe(
      responseData => {
        this.status = responseData;
        this.showMsgDiv = true;
        this.msg = "Doctor successfully added";
      },
      responseError => {
        this.errAddMsg = responseError;
        this.msg = "Some error occured"
      },
      ()=> console.log("Add Doctor completed")
    )
  }
}
