import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]]
  }, {
    validators: this.passwordConfirmationValidator('password', 'repeatPassword')
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.authService.registerUser(new User(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.username)).subscribe((res: any) => {
        if (res?.nickname === false) {
          this.messageService.add({key: 'registerStatus', severity:'error', summary: 'Error', detail: 'Username exists.'});
          return;
        }
        if (res?.email === false) {
          this.messageService.add({key: 'registerStatus', severity:'error', summary: 'Error', detail: 'Email exists.'});
          return;
        }
        this.messageService.add({key: 'registerStatus', severity:'success', summary: 'Success', detail: 'Account created succesfully. You will be redirected to login page.'});
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      });
    }
  }

  passwordConfirmationValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
