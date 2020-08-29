import {Deserializable} from "./deserializable.model";

export class Task implements Deserializable {
    id : number;
    description : string;
    duration : number;
    date : Date;
    creationDate : Date;
    gridRowValue : string;
    colCssClass : string;

    deserialize(input: any) {
        Object.assign(this, input);
        this.date = new Date(input.date);
        this.creationDate = new Date(input.creationDate);
        this.gridRowValue = "";
        this.colCssClass = "";
        return this;
    }
}