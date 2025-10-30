import { Component, inject, Inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PetProps, Pet } from '../../../domain/pet/entity';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Command } from '../../../utils/command';
import { AsyncResult, Failure } from '../../../utils/result';
import { PetHttpRepo } from '../../../data/repository/pet/pet-http-repo';
import { PetRepo } from '../../../domain/pet/repository';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pets-form',
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pets-form.html',
  styleUrl: './pets-form.scss'
})
export class PetsForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PetsForm>);
  private petRepo = inject<PetRepo>(PetHttpRepo);
  private snackBar = inject(MatSnackBar);

  readonly previewImages = signal<string[]>([]);
  readonly selectedFiles = signal<File[]>([]);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    breed: ['', Validators.required],
    age: ['', Validators.required],
    gender: ['', Validators.required],
    isAdoped: [false],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data?: Pet) {
    if (data) this.form.patchValue(data);
    if (data?.images) this.previewImages.set(data.images);
  }

  readonly saveCommand = new Command(() => this.save());
  
  private async save(): AsyncResult<string | void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return Failure(new Error("invalid form"));
    }

    const body: PetProps = {
      name: this.form.getRawValue().name!,
      description: this.form.getRawValue().description!,
      breed: this.form.getRawValue().breed!,
      age: this.form.getRawValue().age!.toString(),
      gender: this.form.getRawValue().gender!,
      is_adopted: this.form.getRawValue().isAdoped!,
    }

    const result = await (!this.data ? this.petRepo.create(body) : this.petRepo.update(this.data.id, body));
    if (result.isFailure()) {
      this.snackBar.open(`Erro ao ${!this.data ? "salvar" : "editar"}`, "Fechar");
      return result;
    }

    if (this.selectedFiles().length > 0) {
      this.petRepo.saveImagesById(this.data?.id ?? result.value!, this.selectedFiles())
    }

    this.snackBar.open(`${!this.data ? "Salvo" : "Editado"} com sucesso`, "Fechar");
    this.dialogRef.close();

    return result;
  }

  cancel() {
    this.dialogRef.close();
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    Array.from(input.files).forEach((file) => {
      this.selectedFiles.update(value => [...value, file]);
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.previewImages.update(value => [...value, e.target.result]);
      };

      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.previewImages.update(arr => arr.filter((_, i) => i !== index));
    this.selectedFiles.update(arr => arr.filter((_, i) => i !== index));
  }
}
