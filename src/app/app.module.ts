import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RunComponent } from './run.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { AdminLinkDirective } from './admin-link.directive';
import { CdkTableModule } from '@angular/cdk/table';
import {MdTableModule, MdPaginatorModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';



const appRoutes: Routes = [
  { path: 'run',
    component: RunComponent },
  {
    path:'',
    component: AppComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RunComponent,
    SiteHeaderComponent,
    AdminLinkDirective
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
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
