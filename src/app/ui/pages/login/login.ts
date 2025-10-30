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
import { EncryptAsyncronousRepo } from '../../../data/repository/encrypt/encrypt';
import { EncryptRepo } from '../../../domain/encrypt/repository';

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
  private encryptRepo = inject<EncryptRepo>(EncryptAsyncronousRepo);

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

    const { email, password } = this.form.getRawValue();

    const encryptPasswordResult = await this.encryptRepo.encrypt(password);
    if (encryptPasswordResult.isFailure()) {
      return encryptPasswordResult;
    }

    const result = await this.authRepo.logIn({email, password: encryptPasswordResult.value});
    if (result.isFailure()) {
      this.snackBar.open("Erro ao logar", "Fechar");
      return result;
    }

    this.snackBar.open("Logado com sucesso", "Fechar");
    this.router.navigate(["/","admin", "pets"]);

    return result;
  }
}
