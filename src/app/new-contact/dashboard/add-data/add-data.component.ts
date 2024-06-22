import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  addDataSpinner=false;

  constructor(private fb: FormBuilder,private service:MainserviceService) { }

  ngOnInit(): void {
    this.createContactFormMethod();
  }

  createContactFormMethod() {
    this.createContactForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.pattern(/^[A-Za-z -]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z -]*$/), Validators.minLength(2), Validators.maxLength(30)]],
      gender: ['', [Validators.required]],
      email_id: ['', [Validators.required, Validators.pattern('[[a-zA-Z0-9+_.-.]+@+[a-zA-Z0-9]+[.]+[.a-z]{2,7}')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$'),Validators.minLength(10),Validators.maxLength(10)]],
      panNumber: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      status: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      adhaarNumber: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }
  submitFormValue() {
    console.log(this.createContactForm.value);
    console.log(this.createContactForm.valid);

    if (this.createContactForm.valid) {
      const reqBody = {
        first_name: this.createContactForm?.get('firstName').value,
        last_name: this.createContactForm?.get('lastName').value,
        emailId: this.createContactForm?.get('email_id').value,
        pan_no: this.createContactForm?.get('panNumber').value,
        gender: this.createContactForm?.get('gender').value,
        mobilenumber: this.createContactForm?.get('mobileNumber').value,
        status: this.createContactForm?.get('status').value,
        age: this.createContactForm?.get('age').value,
        adhaar_no: this.createContactForm?.get('adhaarNumber').value,
        createdAt: this.createContactForm?.get('date').value
        // date:this.today
      }
      this.addDataSpinner = true;
      this.service.postData(reqBody).subscribe((res)=>{
        if(res){
          console.log(res);
          this.addDataSpinner = false;
        } else {
          this.addDataSpinner = false;
        }
      })
    } else {
      this.addDataSpinner = false;
      this.createContactForm.markAllAsTouched()
    }
  }
  // newData = moment(new Date()).format('YYYY-MM-DD')

  //  "Date format purpose" only written in ts
  // dateFormatChanger(date: Date) {
  //   this.result = moment(date).format('YYYY-MM-DD');
  //   return this.result;
  // }
  handleAlphaChar(event: any) {
    if (
      (event.charCode > 32 && event.charCode < 48) ||
      (event.charCode > 57 && event.charCode < 127)
    ) {
      event.preventDefault();
    }
  }
}


