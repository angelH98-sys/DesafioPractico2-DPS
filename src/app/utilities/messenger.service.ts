import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  getInputError(formGroup: FormGroup, inputName: string){
    let formControl: FormControl;
    formControl = formGroup.get(inputName) as FormControl;

    for(let error in formControl.errors){
      switch(error){
        case "required":{
          return "Campo requerido";
        }
        case "pattern":{
          return "Formato incorrecto";
        }
      }
    }
  }

}
