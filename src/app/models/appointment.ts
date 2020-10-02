export class Appointment {

    constructor(){
        this.treatment = "";
        this.drug = "";
        this.regularCost = 0;
        this.discount = 0;
        this.realCost = 0;
    }

    treatment: string;
    drug: string;
    regularCost: number;
    discount: number;
    realCost: number;

}
