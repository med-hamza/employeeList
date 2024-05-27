import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';

  newEmployeeId: number = 0;
  newEmployeeAge: number = 0;
  newEmployeeEmail: string = '';
  newEmployeeSalary: number = 0;
  newEmployeeAddress: string = '';
  newEmployeeImageUrl: string = '';
  newEmployeeLastName: string = '';
  newEmployeeFirstName: string = '';
  newEmployeeContactNumber: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = [...this.employees];
    });
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(employee => {
      return Object.values(employee).some(val =>
        String(val).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  sortEmployees(column: string): void {
    this.filteredEmployees.sort((a, b) => a[column] > b[column] ? 1 : -1);
  }

  deleteEmployee(index: number): void {
    this.filteredEmployees.splice(index, 1);
  }

  addEmployee(): void {
    const newEmployee = {
      id: this.newEmployeeId,
      age: this.newEmployeeAge,
      email: this.newEmployeeEmail,
      salary: this.newEmployeeSalary,
      address: this.newEmployeeAddress,
      imageUrl: this.newEmployeeImageUrl,
      lastName: this.newEmployeeLastName,
      firstName: this.newEmployeeFirstName,
      contactNumber: this.newEmployeeContactNumber
    };
    this.employees.unshift(newEmployee);
    this.filteredEmployees.unshift(newEmployee);

    this.newEmployeeId = 0;
    this.newEmployeeAge = 0;
    this.newEmployeeEmail = '';
    this.newEmployeeSalary = 0;
    this.newEmployeeAddress = '';
    this.newEmployeeImageUrl = '';
    this.newEmployeeLastName = '';
    this.newEmployeeFirstName = '';
    this.newEmployeeContactNumber = '';
  }
  isFormValid(): boolean {
    return this.newEmployeeId !== 0 &&
      this.newEmployeeAge !== 0 &&
      this.newEmployeeEmail !== '' &&
      this.newEmployeeSalary !== 0 &&
      this.newEmployeeAddress !== '' &&
      this.newEmployeeLastName !== '' &&
      this.newEmployeeFirstName !== '' &&
      this.newEmployeeContactNumber !== '';
  }
}
