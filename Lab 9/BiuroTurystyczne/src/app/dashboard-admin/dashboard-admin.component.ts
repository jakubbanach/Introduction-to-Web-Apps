import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../app-services/auth.service';
import { DaneService } from '../app-services/dane.service';
import { KoszykService } from '../app-services/koszyk.service'
import { ListaWycieczekService } from '../app-services/lista-wycieczek.service';
import { Role, User } from '../app-interfaces/interfaceUser';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  constructor(public authService: AuthService,
    private koszykService: KoszykService,
    private listaWycieczekService: ListaWycieczekService,
     private daneService: DaneService) {
    if(this.daneService.usingFirebase) this.selectedSource = "FIREBASE";
    else this.selectedSource = "SERWER";
  }
  selectedPersistence = this.authService.persistenceSetting;
  selectedSource = "";

  selectedRoleToAdd: any;
  selectedRoleToDismiss: any;

  users: User[] = [];
  usersSub: Subscription | undefined;

  ngOnInit(): void {
    console.log(this.authService?.userData);
    this.usersSub = this.daneService.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users) {
        let userToAdd = new User(user.payload.val());
        console.log(user.payload.val());
        userToAdd.password = user.payload.key || 'undefined';
        this.users.push(userToAdd);
      }
    });
  }

  chosenData() {
    console.log(this.selectedSource);
    this.daneService.changeDataSource(this.selectedSource);
    this.listaWycieczekService.resetujListe();
    this.koszykService.resetujKoszyk();
  }

  chosenPersistence() {
    console.log(this.selectedPersistence);
    this.authService.changePersistence(this.selectedPersistence);
  }

  banUser(uid: string) {
    this.daneService.changeUserRole(uid, 'banned', 'true');
  }
  setRole(uid: string, role: string, value: boolean) {
    this.daneService.changeUserRole(uid, role, String(value));
  }

  getUserRoles(uid: string): Role | null {
    let searchedUser = this.findUserByUid(uid);
    if (searchedUser != null) return searchedUser.role;
    return null;
  }

  findUserByUid(uid: string): User | null {
    for (let user of this.users) {
      if (user.password == uid) return user;
    }
    return null;
  }

  // deleteUser(uid: string) {
  //   this.daneService.deleteUser(uid);
  // }
}
