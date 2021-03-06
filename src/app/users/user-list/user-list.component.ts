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

  constructor(private userService : UserService, public dialog: MatDialog,
                                    private authService : AuthService) { }
  displayedColumns = ['select', 'image', 'firstName', 'lastName', 'birthDate', 'country',
                      'status', 'action'];
  dataSource = new MatTableDataSource<User>(this.getUsers());
  selection = new SelectionModel<User>(true, []);


  filterCountries = 0;
  showStatusFilter = false;
  showCountryFilter = false;
  currentPage = "Cases";

  statusFilterText = "All Cases";
  defaultFilterText = "";
  countryFilterList = [];

  applyFilter(){
      if(this.defaultFilterText != "" && this.statusFilterText != "All Cases"
      && this.countryFilterList.length > 0){
          this.dataSource.filterPredicate = (data: User, filter) =>
                         (data.firstName.toLowerCase().indexOf(this.defaultFilterText) > -1 ||
                          data.lastName.toLowerCase().indexOf(this.defaultFilterText) > -1 ) &&
                          (data.status.indexOf(this.statusFilterText) > -1) &&
                          (this.countryFilterList.indexOf(data.country) > -1);
      }
      else if(this.defaultFilterText != "" && this.statusFilterText != "All Cases"){
          this.dataSource.filterPredicate = (data: User, filter) =>
                          (data.firstName.toLowerCase().indexOf(this.defaultFilterText) > -1 ||
                          data.lastName.toLowerCase().indexOf(this.defaultFilterText) > -1 ) &&
                          (data.status.indexOf(this.statusFilterText) > -1);
      }
      else if(this.defaultFilterText != "" && this.countryFilterList.length > 0){
          this.dataSource.filterPredicate = (data: User, filter) =>
                          (data.firstName.toLowerCase().indexOf(this.defaultFilterText) > -1 ||
                          data.lastName.toLowerCase().indexOf(this.defaultFilterText) > -1) &&
                          (this.countryFilterList.indexOf(data.country) > -1);
      }
      else if(this.statusFilterText != "All Cases" && this.countryFilterList.length > 0){
          this.dataSource.filterPredicate = (data: User, filter) =>
                                    (data.status.indexOf(this.statusFilterText) > -1) &&
                                    (this.countryFilterList.indexOf(data.country) > -1);
      }
      else if(this.defaultFilterText != ""){
          this.dataSource.filterPredicate = (data: User, filter) =>
                            data.firstName.toLowerCase().indexOf(this.defaultFilterText) > -1 ||
                            data.lastName.toLowerCase().indexOf(this.defaultFilterText) > -1 ;
      }
      else if(this.statusFilterText != "All Cases"){
          this.dataSource.filterPredicate = (data: User, filter) =>
                           data.status.indexOf(this.statusFilterText) > -1;
      }
      else if(this.countryFilterList.length > 0){
          this.dataSource.filterPredicate =
          (data: User, filter) => this.countryFilterList.indexOf(data.country) > -1 ;
      }
      else{
          this.dataSource.filterPredicate = (data: User, allCase) => allCase === 'All Cases';
      }
      this.dataSource.filter = 'All Cases';
  }

  resetFilter(){
     this.statusFilterText = "All Cases";
     this.countryFilterList = [];
     this.applyFilter();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  onCountryChange(countryList) {
    this.countryFilterList = countryList;
    this.applyFilter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
       birthDate: user.birthDate, id: user.id, phoneNumber: user.phoneNumber}
    });
  }

  ngOnInit() {
    let user = new User();
    for(var i in USER_DATA){
      user = USER_DATA[i]
      this.addUser(user)
    }
  }

  logout(){
      this.authService.logout();
  }

}


const USER_DATA: User[] = [
  {id: 1, firstName: 'Shajith', lastName: 'PV', birthDate: '1990-08-16', 'country': 'India', 'image':'image1',
   'status': 'Incomplete', 'phoneNumber': '1234567890'},
  {id: 2, firstName: 'David', lastName: 'warner', birthDate: '1980-07-16', 'country': 'Albania', 'image':'image1',
  'status': 'Complete', 'phoneNumber': '1234567890'},
  {id: 3, firstName: 'Iain', lastName: 'Hume', birthDate: '1950-08-11', 'country': 'Algeria', 'image':'image1',
  'status': 'Complete', 'phoneNumber': '1234567890'},
  {id: 4, firstName: 'Jithin', lastName: 'PV', birthDate: '1993-08-16', 'country': 'India', 'image':'image1',
  'status': 'Incomplete', 'phoneNumber': '1234567890'},
  {id: 5, firstName: 'Melvin', lastName: 'Mathew', birthDate: '1970-01-01', 'country': 'Singapore', 'image':'image1',
  'status': 'Complete', 'phoneNumber': '1234567890'},
  {id: 6, firstName: 'Jithin', lastName: 'PV', birthDate: '1993-08-16', 'country': 'Singapore', 'image':'image1',
  'status': 'Complete', 'phoneNumber': '1234567890'},
  {id: 7, firstName: 'Justin', lastName: 'Langer', birthDate: '1992-07-01', 'country': 'Australia', 'image':'image1',
  'status': 'Incomplete', 'phoneNumber': '1234567890'},
  {id: 8, firstName: 'Saleem', lastName: 'Malik', birthDate: '1995-11-11', 'country': 'Pakistan', 'image':'image1',
  'status': 'Complete', 'phoneNumber': '1234567890'},
  {id: 9, firstName: 'Vivek', lastName: 'Singh', birthDate: '1983-02-16', 'country': 'India', 'image':'image1',
  'status': 'Complete', 'phoneNumber': '1234567890'},
  {id: 10, firstName: 'George', lastName: 'bush', birthDate: '1953-03-11', 'country': 'United States of America (USA)', 'image':'image1',
  'status': 'Incomplete', 'phoneNumber': '1234567890'},
  {id: 11, firstName: 'Muhammed', lastName: 'Haneef', birthDate: '2000-07-28', 'country': 'India', 'image':'image1',
  'status': 'Incomplete', 'phoneNumber': '1234567890'}
];


const STATUS_LIST = ["All Cases", "Complete", "Incomplete"]
