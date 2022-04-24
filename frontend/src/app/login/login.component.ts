import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]]
  });

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService
        .userLogin(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
