import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../user.service'
import { User } from '../user'
import { UserUpdateComponent } from '../user-update/user-update.component'
import { CountryFilterComponent } from '../country-filter/country-filter.component'
import { AuthService } from 'app/auth/auth.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService : UserService, public dialog: MatDialog, private authService : AuthService) { }
  displayedColumns = ['select', 'image', 'firstName', 'lastName', 'birthDate', 'country', 'status', 'action'];

  dataSource = new MatTableDataSource<User>(this.getUsers());

  selection = new SelectionModel<User>(true, []);

  statusFilter = "";
  filterCountries = 0
  showStatusFilter = false;
  showCountryFilter = false;
  countryList = [];
  currentPage = "Cases";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  onCountryChange(countryList) {
    this.countryList = countryList;
    this.applyCustomFilter(this.statusFilter)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.dataSource.slice(0, 3)
  }

  applyCustomFilter(filterValue: string){
    filterValue = filterValue.trim(); // Remove whitespace
    if(this.showStatusFilter){
      this.statusFilter = filterValue;
    }
    if(this.countryList.length > 0){
      this.dataSource.filterPredicate =
    (data: User, filter: string) => (data.status == filterValue && this.countryList.indexOf(data.country) >=0) ||
     (filterValue === 'All Cases' && this.countryList.indexOf(data.country) >=0);
    }
    else{
      this.dataSource.filterPredicate = (data: User, filter: string) => data.status == filterValue ||
      filterValue === 'All Cases';
    }

    this.dataSource.filter = filterValue;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    this.dataSource.filter = filterValue;
    console.log(filterValue)
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  addUser(user) {
    this.userService.addUser(user);
  }

  getUsers() {
    return this.userService.getAllUsers();
  }

  getAllStatus() {
    return STATUS_LIST;
  }

  toggleStatusFilter(){

    if(this.showStatusFilter)
      this.showStatusFilter = false;
    else
      this.showStatusFilter = true;

    this.showCountryFilter = false;
  }
  toggleCountryFilter(){
    if(this.showCountryFilter)
      this.showCountryFilter = false;
    else
      this.showCountryFilter = true;

    this.showStatusFilter = false;
  }

   openDialog(user): void {
    let dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '500px',
      data: {firstName: user.firstName, lastName: user.lastName,
       birthDate: user.birthDate, id: user.id}
    });
  }

  ngOnInit() {
    this.authService.canActive();
    let user = new User();
    //user = {'title' : 'Task1', 'complete': false, 'id' : null , category: 1 };
    for(var i in USER_DATA){
      user = USER_DATA[i]
      this.addUser(user)
    }
    this.statusFilter = "All Cases";

  }

  logout(){
      this.authService.logout();
  }

}


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const USER_DATA: User[] = [
  {id: 1, firstName: 'Complete', lastName: 'PV', birthDate: '1990-08-16', 'country': 'India', 'image':'image1',
   'status': 'Incomplete'},
  {id: 2, firstName: 'Sarath', lastName: 'PV', birthDate: '1990-08-16', 'country': 'Albania', 'image':'image1',
  'status': 'Complete'},
  {id: 3, firstName: 'Sarath', lastName: 'PV', birthDate: '1990-08-16', 'country': 'Algeria', 'image':'image1',
  'status': 'Complete'},
  {id: 4, firstName: 'Sarath', lastName: 'PV', birthDate: '1990-08-16', 'country': 'India', 'image':'image1',
  'status': 'Complete'}
];

const STATUS_LIST = ["All Cases", "Complete", "Incomplete"]
