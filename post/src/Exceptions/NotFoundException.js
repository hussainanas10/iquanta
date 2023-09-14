import Exception from "./Exception.js";

export default class ConflictException extends Exception{
    constructor(message){
        super()
        this.constructor = ConflictException;
        this.name = this.constructor.name;
        this.message = message || 'This request could not be completed due to conflict issue'
    }
}