import { Component, OnInit } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { ISurgery } from '../../curewell-interfaces/surgery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-todays-surgery',
  templateUrl: './view-todays-surgery.component.html',
  styleUrl: './view-todays-surgery.component.css'
})
export class ViewTodaysSurgeryComponent implements OnInit{
  
  surgeryList: ISurgery[] = [];
  errMsg: string = " ";
  
  constructor(private _service: CurewellService, private _router: Router){}

  ngOnInit(): void {
    this.getTodaySurgery();
  }

  getTodaySurgery(){
    this._service.getSurgeriesForToday().subscribe(
      responseData => {
        this.surgeryList = responseData;
      },
      responseError => {
        this.surgeryList = [];
        this.errMsg = responseError
      }
    );
  }

  editSurgery(surgeryId: number, doctorId: number, surgeryDate: Date, startTime: number, endTime: number, surgeryCategory: string){
    this._service.editSurgery(surgeryId, doctorId, surgeryDate, startTime, endTime, surgeryCategory).subscribe(
      responseData => {
        this._router.navigate(['/update-surgery', surgeryId]);
      }
    );
  }
}
