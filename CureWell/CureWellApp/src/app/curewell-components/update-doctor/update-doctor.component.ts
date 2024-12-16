import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrl: './update-doctor.component.css'
})
export class UpdateDoctorComponent implements OnInit {

  @Input() doctorData !: any; // doctorData holds functionality in child and binds to the databound property of parent. while modal opens, populates data.

  updateForm !: FormGroup;
  status: boolean = false;
  errorMsg: string = "";
  closeUpdateForm: boolean = false;

  constructor(private _service: CurewellService, private _router: Router, private fb: FormBuilder){}

  ngOnInit() {
    this.updateForm = this.fb.group({
      doctorId: [{ value: '', disabled: true }],  // disabled field
      doctorName: ['', Validators.required],      // fields are required
    });
  }
  
  //POPULATE EXISTING DATA USING ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {  // A lifecycle hook that is called when any data-bound property of a directive changes.
    if (changes['doctorData'] && this.doctorData) {
      this.updateForm.patchValue({
        doctorId: this.doctorData.doctorId,
        doctorName: this.doctorData.doctorName,
      });
    }
  }

  updateDoctor(){
    this.closeUpdateForm = false;
    const doctor = {
      doctorId: this.updateForm.get('doctorId')?.value,
      doctorName: this.updateForm.get('doctorName')?.value,
    };

    this._service.editDoctorDetails(doctor).subscribe({
      next: (responseData) => {
        this.status = responseData;
        if (this.status) {
          alert("Doctor Name updated successfully!");
          this.closeUpdateForm = true;
          this._router.navigate(['/view-doctor']);
        } 
      },
      error: (error) => {
        this.errorMsg = error;
        alert('An error occurred while updating.');
        this._router.navigate(['/view-doctor']);
      },
      complete: () => console.log("Doctor details successfully!")
  });
  }


}
