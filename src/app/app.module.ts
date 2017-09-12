import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { AdminLinkDirective } from './admin-link.directive';
import { CdkTableModule } from '@angular/cdk/table';
import {MdTableModule, MdPaginatorModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    AdminLinkDirective
  ],
  imports: [
    BrowserModule,
    MdTableModule,
    CdkTableModule,
    MdPaginatorModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [CdkTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
