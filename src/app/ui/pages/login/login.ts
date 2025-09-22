import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthHttpRepo } from '../../../data/repository/auth/auth-http-repo';
import { AuthRepo } from '../../../domain/auth/repository';
import { Command } from '../../../utils/command';
import { AsyncResult, Failure } from '../../../utils/result';
import { MatIconModule } from '@angular/material/icon';
import { createPasswordStrengthValidator } from '../../../domain/user/validation';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private formBuider = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private authRepo = inject<AuthRepo>(AuthHttpRepo);

  readonly showPassword = signal(false);

  readonly form = this.formBuider.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
  });

  readonly loginCommand = new Command(() => this.login());

  private async login(): AsyncResult<string> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return Failure(new Error("invalid form"));
    }

    // TODO: implement private/public pem crypt to send passoword
    const { email, password } = this.form.getRawValue();

    const result = await this.authRepo.logIn({email, password});
    if (result.isFailure()) {
      this.snackBar.open("Error to login", "Close");
      return result;
    }

    this.snackBar.open("Successfully logged", "Close");
    this.router.navigate(["home"]);

    return result;
  }
}
