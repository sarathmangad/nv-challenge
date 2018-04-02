import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {


  lastId = 0;


  users: User[] = [];

  constructor() { }

  addUser(user: User): UserService{
    if (!user.id) {
      user.id = ++this.lastId;
    }
    this.users.push(user);
    return this;
  }


  getAllUsers(): User[] {
    return this.users;
  }


  getUserById(id: number): User {
    return this.users
      .filter(user => user.id === id)
      .pop();
  }


  updateUserById(id: number, values: Object = {}): User {
    const user = this.getUserById(id);
    if (!user) {
      return null;
    }
    Object.assign(user, values);
    return user;
  }


}
