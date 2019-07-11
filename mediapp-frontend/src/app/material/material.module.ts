import { MatPaginatorImpl } from './../_shared/mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatDatepickerModule, MatExpansionModule, MatSelectModule, MatSnackBarModule, MatButtonModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorIntl, MatCardModule, MatMenuModule, MatSidenavModule, MatDividerModule, MatDialogModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class MaterialModule { }
