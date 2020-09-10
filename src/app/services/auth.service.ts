import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
	data;
	_renewGapSeconds = 200;
	interval: any;

	constructor(private http: HttpClient, private router: Router) {
		if (this.isLoggedIn()) {
			this.data = this.getUser();
			this.setRenewer();
		}
	}

	login(username: string, password: string) {
		const body = {
			username,
			password,
		};
		return this.http
			.post(`${environment.apiUrl}/api/login`, body)
			.pipe(
				map((response: Response) => {
					return this.initUser(response);
				})
			)
			.toPromise();
	}

	renew() {
		const body = {
			token: this.getUser().token,
		};

		this.http
			.post(`${environment.apiUrl}/users/auth/token/refresh`, body)
			.subscribe(
				(res) => {
					return this.initUser(res);
				},
				(error) => {
					this.router.navigate(['/login']);
				}
			);
	}

	initUser(response) {
		const user = <any>response;
		if (user && user.token) {
			this.data = user;
			this.setUser();
			this.setRenewer();
		}
		return user;
	}

	initUserUsingToken(user: string, token: string, expiration: string) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `JWT ${token}`,
			}),
		};

		return this.http
			.get(`${environment.apiUrl}/users/auth/me`, httpOptions)
			.pipe(
				map((response: any) => {
					response.token = token;
					return this.initUser(response);
				})
			)
			.toPromise();
	}

	getUser() {
		return JSON.parse(localStorage.getItem('currentUser'));
	}

	setUser() {
		this.data.expires = new Date().getTime() + this.data.expiration_time * 1000;
		localStorage.setItem('currentUser', JSON.stringify(this.data));
	}

	setRenewer() {
		const diff = <any>new Date(this.data.expires) - <any>new Date();
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = setTimeout(() => {
			this.renew();
		}, diff - this._renewGapSeconds * 1000);
	}

	isLoggedIn() {
		const data = this.getUser();
		if (!data || !data.token) {
			return false;
		}
		return <any>new Date(data.expires) - <any>new Date() > 0;
	}

	clearUser() {
		localStorage.removeItem('currentUser');
	}

	logout() {
		localStorage.removeItem('currentUser');
		this.router.navigate(['/login']);
	}
}
