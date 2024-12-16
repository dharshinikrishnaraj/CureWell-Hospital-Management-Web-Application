import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-update-surgery',
  templateUrl: './update-surgery.component.html',
  styleUrl: './update-surgery.component.css'
})
export class UpdateSurgeryComponent {

  @Input() surgeryData: any;  // surgeryData holds functionality in child and binds to the databound property of parent. while modal opens, populates data.
  @Output() close = new EventEmitter<void>(); 

  updateSurgeryForm !: FormGroup;
  status: boolean = false;
  errorMsg: string = "";

  constructor(private _service: CurewellService, private _router: Router, private fb: FormBuilder){}

  ngOnInit(){
    this.updateSurgeryForm = this.fb.group({
      surgeryId : [{ value: '', disabled: true }],
      doctorId:  [{ value: '', disabled: true }],
      surgeryDate:  [{ value: '', disabled: true }],
      startTime:  ['', Validators.required],    // fields are required
      endTime:  ['', Validators.required],      // fields are required
      surgeryCategory: [{ value: '', disabled: true }]
    },
    { validators: timeRangeValidator }   // INCLUDE timeRangeValidator FUNCTION
  )
  }
  
  //POPULATE EXISTING DATA USING ngOnChanges
  ngOnChanges(changes: SimpleChanges) {   // A lifecycle hook that is called when any data-bound property of a directive changes.
    if (changes['surgeryData'] && this.surgeryData) {
      this.updateSurgeryForm.patchValue({
        surgeryId: this.surgeryData.surgeryId,
        doctorId: this.surgeryData.doctorId,
        surgeryDate: this.surgeryData.surgeryDate,
        startTime: this.surgeryData.startTime,
        endTime: this.surgeryData.endTime,
        surgeryCategory: this.surgeryData.surgeryCategory
      });
    }
  }

  editSurgery(){
    const surgery = {
      surgeryId: this.updateSurgeryForm.get('surgeryId')?.value,
      doctorId: this.updateSurgeryForm.get('doctorId')?.value,
      surgeryDate: this.updateSurgeryForm.get('surgeryDate')?.value,
      startTime: this.updateSurgeryForm.get('startTime')?.value,
      endTime: this.updateSurgeryForm.get('endTime')?.value,
      surgeryCategory: this.updateSurgeryForm.get('surgeryCategory')?.value
    }
    this._service.editSurgery(surgery).subscribe({
      next: (responseData) => {
        this.status = responseData;
        if(this.status){
          alert("Surgery details updated successfully!");
          this.close.emit();
          this._router.navigate(['/view-todaySurgery']);
        }
        else{
          alert("Surgery details not updated successfully!");
          this._router.navigate(['/view-todaySurgery']);
        }
      },
      error: (responseError) =>{
        this.errorMsg = responseError;
        alert("Some error occured");
        this._router.navigate(['/view-todaySurgery']);
      },
      complete: () => console.log("Updated surgery details successfully!")
  })
  }

}

// VALIDATE RANGE = startTime >= endTime
function timeRangeValidator(updateSurgeryForm: AbstractControl): ValidationErrors | null {
  const startTime = updateSurgeryForm.get('startTime')?.value;
  const endTime = updateSurgeryForm.get('endTime')?.value;
  if (startTime && endTime && startTime >= endTime) {
    return { invalidRange: true };
  }
  return null;
}