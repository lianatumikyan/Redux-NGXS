import {User} from '../models/user.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddUser, RemoveUser, UpdateUser} from '../actions/user.actions';

export class UserStateModel {
  users: User[];
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: []
  }
})

export class UserState {
  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Action(AddUser)
  add({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
    const state = getState();
    patchState({
      users: [...state.users, payload]
    });
  }

  @Action(RemoveUser)
  remove({getState, patchState}: StateContext<UserStateModel>, {payload}: RemoveUser) {
    patchState({
      users: getState().users.filter(a => a.firstname !== payload)
    });
  }

  @Action(UpdateUser)
  update({getState, patchState}: StateContext<UserStateModel>, {payload}: UpdateUser) {
    patchState({
      users: getState().users.map(a => a.firstname === payload.name ? payload.user : a)
  });
  }
}
