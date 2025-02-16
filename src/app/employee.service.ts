import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Employee} from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url="http://localhost:5118/api/Employee";

  constructor(private httpclient:HttpClient) { }
  createEmployee(newEmp:Employee):Observable<Employee>
  {
    return this.httpclient.post<Employee>(this.url,newEmp)
  }
  getAllEmployee():Observable<Employee[]>
  {
    return this.httpclient.get<Employee[]>(this.url);
  }

  updateEmployee(empId:number,updateEmployee:Employee):Observable<Employee>
  {
    return this.httpclient.put<Employee>(this.url+'/'+empId,updateEmployee)
  }
  deleteEmployee(empId:number)
  {
    return this.httpclient.delete(this.url+'/'+empId)
  }
}
