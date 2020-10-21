import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { User } from '../interfaces/user.interface';
import { Roles } from '../settings/rol';

@Injectable()
export class AuthenticationGeneralService {
    data;

    constructor(private router: Router, private rolesService: NgxRolesService,
        private permissionsService: NgxPermissionsService) {
        if (this.isLoggedIn()) {
            this.data = this.getUser();
        }
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getUserVariable(name) {
        const user = this.getUser();
        return user[name];
    }

    setToken(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    isLoggedIn() {
        const data = this.getUser();
        if (!data) {
            return false;
        }

        const user: User = this.getUser();

        const currentTeam = (user.teams).filter(x => x.id == user.current_team_id)[0];

        const rol = Roles.roles.filter(x => x.id == currentTeam.rol)[0];
        // refresh permissions
        this.permissionsService.flushPermissions();
        this.permissionsService.loadPermissions(rol.permissions);

        // refresh roles
        this.rolesService.flushRoles();
        this.rolesService.addRole(rol.name, rol.permissions);

        return true;
    }

    clearUser() {
        localStorage.removeItem('currentUser');
    }

    logout() {
        this.clearUser();
        this.router.navigate(['/login']);
    }
}
