import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MessengerService } from 'src/app/utilities/messenger.service';

@Component({
  selector: 'app-appointment-panel',
  templateUrl: './appointment-panel.component.html',
  styleUrls: ['./appointment-panel.component.css']
})
export class AppointmentPanelComponent implements OnInit {

  customer: Customer = new Customer();
  list;
  id;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void{

    this.id = this.route.snapshot.paramMap.get('id');
    this.getCustomer();
  }

  getCustomer(){
    this.customerService.getCustomer(this.id).subscribe(
      (res: any) => {
        this.customer.name = res.name;
        this.customer.dui = res.dui;
        this.customer.petName = res.petName;
        this.customer.appointments = res.appointments;
        this.list = new MatTableDataSource(res.appointments);
      }
    )
  }

  openNewAppointmentDialog(): void {
    const dialogRef = this.dialog.open(NewAppointmentDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        let appointments;
        if(this.customer.appointments != null){
          appointments = this.customer.appointments;
        }else{
          appointments = [];
        }

        let discount = 0;
        if(appointments.length >= 2){
          discount = 0.05 * result.regularCost;
        }
        if(appointments.length >= 5){
          discount = 0.08 * result.regularCost;
        }

        let realCost = result.regularCost - discount;
        appointments.push({
          treatment: result.treatment,
          drug: result.drug,
          regularCost: result.regularCost,
          discount,
          realCost
        });

        this.customerService.updateAppointments(this.id, appointments).then(
          res => {
            this.showMessage("Cita registrada exitosamente");
            this.customer.appointments = appointments;
            this.list = new MatTableDataSource(appointments);
          }
        )
      }
    });
  }

  openUpdateAppointmentDialog(item): void {
    let index = this.customer.appointments.indexOf(item);
    const dialogRef = this.dialog.open(UpdateAppointmentDialog, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.customer.appointments[index].treatment = result.treatment;
        this.customer.appointments[index].drug = result.drug;
        
        this.customerService.updateAppointments(this.id, this.customer.appointments).then(
          res => {
            this.list = new MatTableDataSource(this.customer.appointments);
            this.showMessage("Cita modificada exitosamente");
          }
        );
      }
    });
  }

  openDeleteAppointmentDialog(item): void {
    let index = this.customer.appointments.indexOf(item);
    const dialogRef = this.dialog.open(DeleteAppointmentDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.customer.appointments.splice(index, 1);
        
        this.customerService.updateAppointments(this.id, this.customer.appointments).then(
          res => {
            this.list = new MatTableDataSource(this.customer.appointments);
            this.showMessage("Cita eliminada exitosamente");
          }
        );
      }
    });
  }

  openTicketDialog(item: Appointment): void {
    const dialogRef = this.dialog.open(TicketDialog, {
      data: {
        customer: this.customer.name,
        petName: this.customer.petName,
        appointment: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        let ticket: string;
        ticket = "  Veterina de la Dra. Lissete\n";
        ticket += "---------------------------------\n";
        ticket += "Cliente..........." + this.customer.name + "\n";
        ticket += "Mascota..........." + this.customer.petName + "\n";
        ticket += "Tratamiento......." + item.treatment + "\n";
        ticket += "Medicamento......." + item.drug + "\n";
        ticket += "---------------------------------\n";
        ticket += "Costo regular.....$" + item.regularCost.toFixed(2) + "\n";
        ticket += "Descuento.........$" + item.discount.toFixed(2) + "\n";
        ticket += "Costo real........$" + item.realCost.toFixed(2) + "\n";
        this.dyanmicDownloadByHtmlTag({
          fileName: 'Ticket',
          text: ticket
        });
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

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

}

@Component({
  selector: 'new-appointment-dialog',
  templateUrl: 'new-appointment-dialog.html',
})
export class NewAppointmentDialog {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentDialog>,
    private formBuilder: FormBuilder,
    public messenger: MessengerService) {
      this.setForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setForm(){
    this.form = this.formBuilder.group({
      treatment: ['', Validators.required],
      drug: '',
      regularCost: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
    });
  }

}

@Component({
  selector: 'update-appointment-dialog',
  templateUrl: 'update-appointment-dialog.html',
})
export class UpdateAppointmentDialog {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private formBuilder: FormBuilder,
    public messenger: MessengerService) {
      this.setForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setForm(){
    this.form = this.formBuilder.group({
      treatment: [this.data.treatment, Validators.required],
      drug: this.data.drug
    });
  }

}

@Component({
  selector: 'delete-appointment-dialog',
  templateUrl: 'delete-appointment-dialog.html',
})
export class DeleteAppointmentDialog {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DeleteAppointmentDialog>) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'ticket-dialog',
  templateUrl: 'ticket-dialog.html',
})
export class TicketDialog {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DeleteAppointmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}