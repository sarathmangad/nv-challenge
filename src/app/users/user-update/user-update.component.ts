import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
    alert(this.data.id)
    this.updateUser(this.data)
    this.dialogRef.close();
  }
}
