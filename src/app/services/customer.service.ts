import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: AngularFirestore) { }

  createCustomer(data) {
    return this.firestore.collection("customers").add({
      name: data.name,
      dui: data.dui,
      petName: data.petName,
      appointments: null
    });
  }

  getCustomers(){
    return this.firestore.collection("customers").snapshotChanges();
  }

  updateCustomer(customer: Customer){
    return this.firestore.collection("customers").doc(customer.id)
      .set({
        name: customer.name,
        dui: customer.dui,
        petName: customer.petName
      });
  }

  deleteCustomer(id){
    return this.firestore.collection("customers").doc(id).delete();
  }

  getCustomer(id){
    return this.firestore.doc(`customers/${id}`).valueChanges();
  }

  updateAppointments(id, data){
    return this.firestore.doc(`customers/${id}`).update({
      appointments: data
    });
  }

}
