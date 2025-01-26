import { Component, OnInit } from '@angular/core';
import { ISpecialization } from '../../curewell-interfaces/specialization';
import { CurewellService } from '../../curewell-services/curewell.service';

@Component({
  selector: 'app-view-specialization',
  templateUrl: './view-specialization.component.html',
  styleUrl: './view-specialization.component.css'
})
export class ViewSpecializationComponent implements OnInit {

  specializationList: ISpecialization[] = [];
  showMsgDiv: boolean = false;
  errMsg: string = " ";

  constructor(private _service: CurewellService){}

  ngOnInit(): void {
    this.getSpecialization()
  }

  getSpecialization(){
    this._service.getAllSpecializations().subscribe({
      next: responseData => {
      this.specializationList = responseData
      this.showMsgDiv = true;
    }, 
    error: responseError => {
      this.specializationList = [];
      this.errMsg = responseError
      this.showMsgDiv = false;
    },
   complete: ()=> console.log("Specialization Fetched Successfully")
  });
  }
}
