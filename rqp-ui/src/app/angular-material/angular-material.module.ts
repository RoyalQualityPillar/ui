import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({

  declarations: [],
  exports:[
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AngularMaterialModule { }
