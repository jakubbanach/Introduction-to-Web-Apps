import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../app-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onRegisterSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      console.log('Invalid form');
      return
    }
    const formData = this.registerForm.value;
    console.log(formData);
    let email = this.registerForm.get('email')!.value;
    let password = this.registerForm.get('password')!.value;
    this.authService.registerEmailPass(email, password);
    this.submitted = false;
    this.registerForm.reset();
  }
}
