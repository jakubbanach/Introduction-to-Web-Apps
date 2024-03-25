import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../app-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLoginSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      console.log('Invalid login form');
      return
    }
    const formData = this.loginForm.value;
    console.log(formData);
    let email = this.loginForm.get('email')!.value
    let password = this.loginForm.get('password')!.value
    this.authService.signInEmailPass(email,password)
    this.submitted = false;
    this.loginForm.reset()
  }
}
