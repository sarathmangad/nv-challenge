import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';


import { UserService } from '../user.service'

@Component({
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

  constructor(
    private userService : UserService,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  updateUser(data) {
     this.userService.updateUserById(data.id, data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.updateUser(this.data)
    this.dialogRef.close();
  }

  phoneNumberControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]{10}$")
  ]);
  birthDateControl = new FormControl('', [
    Validators.required,
  ]);
  firstNameControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameControl = new FormControl('', [
    Validators.required,
  ]);
}
