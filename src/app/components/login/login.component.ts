import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { MessengerService } from 'src/app/utilities/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public messenger: MessengerService,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  AuthLogin() {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((result) => {
       this.ngZone.run(() => {
          this.showMessage(result.user, 1);
          this.router.navigate(['/customer/panel']);
        })
    }).catch((error) => {
      window.alert(error)
    })
  }

  onSubmit(): void{
    if(this.form.get('user').value == "admin" && this.form.get('pass').value == "admin"){
      this.showMessage("usuario administrador", 2);
      this.router.navigate(['/customer/panel']);
    }else{
      this.showMessage("", 3);
    }
  }

  showMessage(user, type){
    let message = "";
    switch(type){
      case 1:{
        message = "Bienvenido " + user.displayName;
      }
      case 2:{
        message = "Bienvenido " + user;
      }
      case 3:{
        message = "Credenciales incorrectas";
      }
    }
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar']
    });
  }

}
