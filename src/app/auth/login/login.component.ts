import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	submitted = false;
	param = { year: new Date().getFullYear() };

	private subscription = new Subscription();

	constructor(
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

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		// display form values on success
		this.subscription.add(this.loginService.sanctum().subscribe(
			(response: Response) => {
				this.loginService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
					res => {
						this.loginService.probar().subscribe(
							res => {
								console.log(res);
							}, error => {
								console.log(error);
							}
						)
					}, error => {
						console.log(error);
					}
				)
			}
		));
		/* this.subscription.add(
			this.loginService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
				res => {
					console.log(res);
				}, error => {
					console.log(error);
				}
			)
		); */

	}
}