import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const createPasswordStrengthValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    if (!hasUpperCase) {
      return { hasNotUpperCase: true};
    }

    const hasLowerCase = /[a-z]/.test(value);
    if (!hasLowerCase) {
      return { hasNotLowerCase: true};
    }

    const hasNumber = /[0-9]/.test(value);
    if (!hasNumber) {
      return { hasNotNumber: true};
    }

    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    if (!hasSpecialChar) {
      return { hasNotSpecialChar: true};
    }

    return null;
  };
}