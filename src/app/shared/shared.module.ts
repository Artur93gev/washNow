import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
/*import { AuthService } from './auth.service';*/

@NgModule({
	imports: [
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		RouterModule,
		BrowserAnimationsModule,
		MatIconModule
	],
	exports: [
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		RouterModule,
		MatIconModule,
		BrowserAnimationsModule
	]
})
export class SharedModule {}
