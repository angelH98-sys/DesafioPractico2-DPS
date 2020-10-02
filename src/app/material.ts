import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSnackBarModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatDividerModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSnackBarModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatDividerModule
    ]
})

export class MaterialModules{}