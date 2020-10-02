import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { MessengerService } from 'src/app/utilities/messenger.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css']
})
export class CustomerSignupComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public messenger: MessengerService,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dui: ['', [Validators.required, Validators.pattern(/^[0-9]{8}-[0-9]$/)]],
      petName: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.form.invalid) return false;
    this.customerService.createCustomer(this.form.value).then(res => {
      this.router.navigate(['customer/panel'])
    });
  }

  errorAlert(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar']
    });
  }

}
