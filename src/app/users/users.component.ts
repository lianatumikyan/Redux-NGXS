import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddUser, RemoveUser, UpdateUser} from '../actions/user.actions';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  updating: User;
  users$: Observable<User>;
  constructor(private fb: FormBuilder, private store: Store) {
    this.userForm = this.fb.group({
      firstname: '',
      lastname: ''
    });
    this.users$ = this.store.select(state => state.users.users);
  }

  addUser() {
    const userData = this.userForm.getRawValue();
    this.store.dispatch(new AddUser(userData));
    this.userForm.reset();
  }

  removeUser(name) {
    this.store.dispatch(new RemoveUser(name));
  }

  updateUser() {
    const userData = this.userForm.getRawValue();
    this.store.dispatch(new UpdateUser({name: this.updating.firstname, user: userData}));
    this.updating = null;
    this.userForm.reset();
  }

  setInForm(user: User) {
    this.updating = user;
    this.userForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname
    });
  }
  ngOnInit() {
  }

}
