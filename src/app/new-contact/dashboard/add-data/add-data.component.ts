import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  createContactForm: any = FormGroup;
  gender = ['Male', 'Female', 'Others'];
  status = ['True', 'False']
  today = new Date();
  maxDate: any = Date;
  addDataSpinner = false;
  getQueryParamsValues: any;

  constructor(private fb: FormBuilder, private service: MainserviceService,
    private fromQueryParams: ActivatedRoute, private route:Router
  ) { }

  ngOnInit(): void {
    this.createContactFormMethod();
    this.retrieveQueryParams();
  }

  createContactFormMethod() {
    this.createContactForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.pattern(/^[A-Za-z -]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z -]*$/), Validators.minLength(2), Validators.maxLength(30)]],
      gender: ['', [Validators.required]],
      email_id: ['', [Validators.required, Validators.pattern('[[a-zA-Z0-9+_.-.]+@+[a-zA-Z0-9]+[.]+[.a-z]{2,7}')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$'), Validators.minLength(10), Validators.maxLength(10)]],
      panNumber: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      status: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      adhaarNumber: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }

  retrieveQueryParams() {
    this.fromQueryParams.queryParams.subscribe(res => {
      this.getQueryParamsValues = res;
      this.createContactForm?.get('firstName').patchValue(this.getQueryParamsValues?.first_name);
      this.createContactForm?.get('lastName').patchValue(this.getQueryParamsValues?.last_name);
      this.createContactForm?.get('gender').patchValue(this.getQueryParamsValues?.gender);
      this.createContactForm?.get('email_id').patchValue(this.getQueryParamsValues?.emailId);
      this.createContactForm?.get('mobileNumber').patchValue(this.getQueryParamsValues?.mobilenumber);
      this.createContactForm?.get('panNumber').patchValue(this.getQueryParamsValues?.pan_no);
      this.createContactForm?.get('status').patchValue(this.getQueryParamsValues?.status);
      this.createContactForm?.get('age').patchValue(this.getQueryParamsValues?.age);
      this.createContactForm?.get('adhaarNumber').patchValue(this.getQueryParamsValues?.adhaar_no);
      this.createContactForm?.get('date').patchValue(this.getQueryParamsValues?.createdAt);

    })
  }

  submitFormValue() {
    console.log(this.createContactForm.value);
    console.log(this.createContactForm.valid);
    const dateObject = new Date(this.createContactForm?.get('date').value);
    // Extract the date portion in YYYY-MM-DD format
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const dateOnly = `${year}-${day}-${month}`;

    if (Object.keys(this.getQueryParamsValues).length !== 0) {
      this.editAllDetails();      
    } else {   
      if (this.createContactForm.valid) {
        const reqBody = {
          first_name: this.createContactForm?.get('firstName').value,
          last_name: this.createContactForm?.get('lastName').value,
          emailId: this.createContactForm?.get('email_id').value,
          pan_no: this.createContactForm?.get('panNumber').value,
          gender: this.createContactForm?.get('gender').value,
          mobilenumber: +this.createContactForm?.get('mobileNumber').value,
          status: Boolean(this.createContactForm?.get('status').value),
          age: +this.createContactForm?.get('age').value,
          adhaar_no: this.createContactForm?.get('adhaarNumber').value,
          createdAt: dateOnly
          // date:this.today
        }
        this.addDataSpinner = true;
        this.service.postData(reqBody).subscribe((res) => {
          if (res) {
            // res['Status'] === 201
              console.log(res);
              this.addDataSpinner = false;
              this.route.navigate(['contact','create','get-data'])
            
          } else {
            this.addDataSpinner = false;
          }
        })
      } else {
        this.addDataSpinner = false;
        this.createContactForm.markAllAsTouched()
      }
    }
  }
  
  editAllDetails(){
    if (this.createContactForm.valid) {
      const dateObject = new Date(this.createContactForm?.get('date').value);
    // Extract the date portion in YYYY-MM-DD format
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const dateOnly = `${year}-${day}-${month}`;
      const reqBody = {
        first_name: this.createContactForm?.get('firstName').value,
        last_name: this.createContactForm?.get('lastName').value,
        emailId: this.createContactForm?.get('email_id').value,
        pan_no: this.createContactForm?.get('panNumber').value,
        gender: this.createContactForm?.get('gender').value,
        mobilenumber: +this.createContactForm?.get('mobileNumber').value,
        status: Boolean(this.createContactForm?.get('status').value),
        age: +this.createContactForm?.get('age').value,
        adhaar_no: this.createContactForm?.get('adhaarNumber').value,
        createdAt: dateOnly
        // date:this.today
      }
      this.addDataSpinner = true;
      const id = this.getQueryParamsValues?.id;
      this.service.editData(id,reqBody).subscribe((res) => {
        if (res) {
          console.log(res);
          this.addDataSpinner = false;
          this.route.navigate(['contact','create','get-data'])
        } else {
          this.addDataSpinner = false;
        }
      })
    } else {
      this.addDataSpinner = false;
      this.createContactForm.markAllAsTouched()
    }
  }


  handleAlphaChar(event: any) {
    if (
      (event.charCode > 32 && event.charCode < 48) ||
      (event.charCode > 57 && event.charCode < 127)
    ) {
      event.preventDefault();
    }
  }
}


