import { Appointment } from './appointment';

export class Customer {

    constructor(){
        this.id = "";
        this.name = "";
        this.dui = "";
        this.petName = "";
        this.appointments = [];
    }

    id: string;
    name: string;
    dui: string;
    petName: string;
    appointments: Appointment[];

}
