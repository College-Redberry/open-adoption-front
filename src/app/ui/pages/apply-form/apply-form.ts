import { Component, inject, input } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Command } from '../../../utils/command';
import { AsyncResult, Failure } from '../../../utils/result';
import { RequestHttpRepo } from '../../../data/repository/request/request-http-repo';
import { RequestRepo } from '../../../domain/request/repository';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-apply-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './apply-form.html',
  styleUrl: './apply-form.scss'
})
export class ApplyForm {
  private formBuider = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private requestRepo = inject<RequestRepo>(RequestHttpRepo);

  readonly petId = input.required<string>({ alias: "id"  });

  readonly form = this.formBuider.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0)]],
    house_hold_agreed: [false, Validators.required],
    already_pets: [0, [Validators.required, Validators.min(0)]],
    already_pets_castrated_and_vaccinated: [false, Validators.required],
    property: ['house', Validators.required],
    own_property: [false, Validators.required],
    address: ['', Validators.required],
    income: [0, [Validators.required, Validators.min(0)]],
    suitable_location: ['', Validators.required],
    access_to_the_street: [false, Validators.required]
  });

  readonly submitCommand = new Command(() => this.submit());

  private async submit(): AsyncResult<string> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return Failure(new Error("invalid form"));
    }

    const result = await this.requestRepo.create({...this.form.getRawValue(), pet_id: this.petId()});
    if (result.isFailure()) {
      this.snackBar.open("Erro ao submeter", "Fechar");
      return result;
    }

    this.snackBar.open("Submetido com sucesso", "Fechar");
    this.router.navigate(["pets"]);

    return result;
  }
}
