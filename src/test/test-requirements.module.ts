import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrameworkModule } from '../app/framework/framework.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FrameworkModule,
    BrowserAnimationsModule,
    HttpClientTestingModule,
  ],
  declarations: [],
  exports: [
    BrowserModule,
    FormsModule,
    FrameworkModule,
    BrowserAnimationsModule,
  ],
  providers: [],
})
export class TestRequirementsModule {}
