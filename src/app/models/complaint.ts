import { Customer } from "./customer";
import { Employee } from "./employee";

export interface Complaint{
    complaintId:string,
    employee:Employee,
    customer:Customer,
    rating:number,
    title:string,
    description:string
    complaintStatus:number,
    employeeNote:string
}