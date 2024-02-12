import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-and-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-and-register.component.html',
  styleUrl: './login-and-register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginAndRegisterComponent implements OnInit {
  isRegisterMode: boolean = false;
  isLoading: boolean = false;
  errorMessage!: string;

  loginRegisterForm!: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (!this.loginRegisterForm.valid && this.loginRegisterForm.touched) {
      return;
    }

    this.isLoading = true;

    const email = this.loginRegisterForm.get('email')?.value;
    const password = this.loginRegisterForm.get('password')?.value;

    let authObs: Observable<User | any>;

    if (this.isRegisterMode) {
      authObs = this._authService.signUp(email, password);
    } else {
      authObs = this._authService.login(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        if (resData === null) {
          this.isRegisterMode = false;
          this._toastr.success('Successfully registered in!');
        } else {
          this._router.navigate(['/recipes']);
          this._toastr.success('Succssesfully logged in!');
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err;
        this.isLoading = false;
      },
    });

    this.loginRegisterForm.reset();
  }

  private initForm() {
    let email = '';
    let password = '';

    this.loginRegisterForm = new FormGroup({
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
        ),
      ]),
      password: new FormControl(password, [Validators.required]),
    });
  }
}
