import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { NgFor, NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-employee', 
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  filteredEmployees: Employee[] = [];
  searchQuery: string = '';
  newEmp:Employee={ename:"",salary:0};

  emp:Employee[]=[];

  editEmp:Employee|null=null;

  updateEmp:Employee={ename:"",salary:0};


  constructor(private empservice:EmployeeService)  { }


  ngOnInit(): void {
    this. getAllEmployees();
  }

  createEmployee():void{
    this.empservice.createEmployee(this.newEmp).subscribe((createEmp)=>{
      this.newEmp={ename:"",salary:0};
      this.emp.push(createEmp)

    })
  }


  getAllEmployees()
  {
    this.empservice.getAllEmployee().subscribe((employee)=>{
      this.emp=employee;
     // this.filteredEmployees = employee;
    })
  }

  onSearch() {
    if (this.searchQuery) {
      this.filteredEmployees = this.emp.filter((employee) =>
        employee.ename.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      //this.filteredEmployees = this.emp;
    }
  }



  editEmployee(emp:Employee)
  {
    this.editEmp=emp;
    this.updateEmp={...emp};//create  a copy for editing
  }

  updateEmployee():void
  {
      if(this.editEmp)
      {
         this.empservice.updateEmployee(this.editEmp.eid!,this.editEmp).subscribe((result)=>{
         const index= this.emp.findIndex((employee)=>employee.eid==this.editEmp!.eid)
         if(index!==-1)
         {
          this.emp[index]=result;
          //close edit
          this.cancelEdit()
         }
         })
      }
  }

  cancelEdit()
  {
    this.editEmp=null;
    this.updateEmp={ename:"",salary:0};
  }


  deleteEmployee(empId:any)
  {
     if(confirm('Are u want to delete?'))
     {
     this.empservice.deleteEmployee(empId)
  .subscribe(()=>{
      this.emp=this.emp.filter((employee)=>employee.eid!==empId)
      if(this.editEmp && this.editEmp.eid==empId)
      {
        this.cancelEdit();
      }
    })
  }
}












  // ngOnInit(): void {
  //   this.getAllEmployees();
    
  // }
  // getAllEmployees()
  // {
  //   this.empservice.getAllEmployee().subscribe((empl)=>{this.emp=empl;})
  // }

  // createEmployee():void
  // {
  //   this.empservice.createEmployee(this.newEmp).subscribe((createEmployee)=>{
  //     this.newEmp={ename:"",salary:0};//reset employee
  //     this.emp.push(createEmployee)

  //   })

  // }

  // editEmployee(emp:Employee)
  // {
  //   this.editEmp=emp;
  //   this.updateEmp={...emp}//create a cpoy for editing

  // }

  // updateEmployee():void{
  //   if(this.editEmp)
  //   {
  //     this.empservice.updateEmployee(this.editEmp.eid!,this.updateEmp).subscribe((result)=>{
  //       const index=this.emp.findIndex((emp)=>emp.eid==this.editEmp!.eid)
  //       if(index!==-1)
  //       {
  //         this.emp[index]=result;
  //         //close edit
  //         this.cancelEdit()
  //       }
  //     })

  //   }
  // }

  // cancelEdit()
  // {
  //   this.editEmp=null;
  //   this.updateEmp={ename:" ",salary:0}
  // }

  // deleteEmployee(empId:any)
  // {
  //   if(confirm('Are you want to delete?'))
  //   {
  //     this.empservice.deleteEmployee(empId).subscribe(()=>{
  //       this.emp=this.emp.filter((emp)=>emp.eid!==empId)
  //       if(this.editEmp && this.editEmp.eid==empId)
  //       {
  //         this.cancelEdit();
  //       }
  //     })

  //   }
  // }


 

}
