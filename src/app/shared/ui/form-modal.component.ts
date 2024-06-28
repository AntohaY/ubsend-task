import { KeyValuePipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  standalone: true,
  selector: 'app-form-modal',
  template: `
    <div class='form-modal-container'>
      <header>
        <h2 mat-dialog-title>{{ title }}</h2>
      </header>
      <section>
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
          @for (control of formGroup.controls | keyvalue; track control.key){
            @if (control.key === 'deliverAtDate') {
              <div>
                <mat-form-field class="date-form-field">
                  <mat-label>Choose a date</mat-label>
                  <input [id]="control.key" [formControlName]="control.key" matInput [matDatepicker]="picker">
                  <mat-hint>MM/DD/YYYY</mat-hint>
                  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
              </div>
            } @else {
              <div>
                <mat-form-field class="text-form-field">
                  <mat-label>{{ control.key | uppercase }}</mat-label>
                  <input 
                    matInput
                    [id]="control.key"
                    type="number"
                    [formControlName]="control.key"
                  >
                </mat-form-field>
              </div>
            }
          }
          <mat-dialog-actions class="dialog-actions">
            <button mat-raised-button color="primary" [disabled]="formGroup.invalid" type="submit">Save</button>
            <button mat-raised-button color="warn" (click)="close.emit()">close</button>
          </mat-dialog-actions>
        </form>
      </section>
    </div>
    
  `,
  styles: [
    `
      .form-modal-container {
        background: ghostwhite;
      }

      .dialog-actions {
        display: flex;
        justify-content: space-between;
      }
    `
  ],
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, KeyValuePipe, MatDialogActions, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule, UpperCasePipe],
})
export class FormModalComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) title!: string;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onSubmit() {
    if (this.formGroup.valid) {
      this.save.emit();
      this.close.emit();
    }
  }
}