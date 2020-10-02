import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MessengerService } from 'src/app/utilities/messenger.service';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.css']
})
export class CustomerPanelComponent implements OnInit {

  list;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(res => {
      let list = [];
      res.forEach((single: any) => {
        list.push({
          id: single.payload.doc.id,
          name: single.payload.doc.data().name,
          dui: single.payload.doc.data().dui,
          petName: single.payload.doc.data().petName,
          appointments: []
        });
        this.list = new MatTableDataSource(list);
      })
    })
  }

  openUpdateDialog(customer): void {
    const dialogRef = this.dialog.open(UpdateCustomerDialog, {
      width: '250px',
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != customer){
        this.customerService.updateCustomer(result).then(
          res => {
            this.showMessage("Registro modificado exitosamente");
            this.getCustomers();
          }
        )
      }
    });
  }

  openDeleteDialog(customer: Customer): void{
    const dialogRef = this.dialog.open(DeleteCustomerDialog, {
      width: '250px',
      data: customer.name
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.customerService.deleteCustomer(customer.id).then(
          res => {
            this.showMessage("Registro eliminado exitosamente");
            this.getCustomers();
          }
        )
      }
    });
  }

  showMessage(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar']
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.list.filter = filterValue.trim().toLowerCase();
  }

}

@Component({
  selector: 'update-customer-dialog',
  templateUrl: 'update-customer-dialog.html',
})
export class UpdateCustomerDialog {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private formBuilder: FormBuilder,
    public messenger: MessengerService) {
      this.setForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setForm(){
    this.form = this.formBuilder.group({
      id: this.data.id,
      name: [this.data.name, Validators.required],
      dui: [this.data.dui, [Validators.required, Validators.pattern(/^[0-9]{8}-[0-9]$/)]],
      petName: [this.data.petName, Validators.required]
    })
  }

}

@Component({
  selector: 'delete-customer-dialog',
  templateUrl: 'delete-customer-dialog.html',
})
export class DeleteCustomerDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public customer: string) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
