import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {

	loginForm: FormGroup;
	submitted = false;
	param = { year: new Date().getFullYear() };
	passwordLength = 8;
	error: number;

	private subscription = new Subscription();

	constructor(
		private router: Router,
		private builder: FormBuilder,
		private loginService: LoginService
	) { }


	ngOnInit(): void {
		this.loginForm = this.builder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}


		this.subscription.add(this.loginService.sanctum().subscribe(
			(response) => {
				this.loginService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
					res => {
						this.loginService.getUser().subscribe(
							res => {
								this.router.navigate(['/']);
							}, error => {
								console.log(error.status);
							}
						)
					}, error => {
						this.error = error.status;

					}
				)
			}
		));
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}