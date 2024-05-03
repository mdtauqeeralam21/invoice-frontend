import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterLink } from '@angular/router';
import { httpInterceptorProviders } from './_helper/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ListInvoicesComponent } from './invoice-templates/list-invoices/list-invoices.component';
import { InvoiceTemplate1Component } from './invoice-templates/invoice-template1/invoice-template1.component';
import { InvoiceTemplate2Component } from './invoice-templates/invoice-template2/invoice-template2.component';
import { InvoiceTemplate3Component } from './invoice-templates/invoice-template3/invoice-template3.component';
import { InvoiceTemplate4Component } from './invoice-templates/invoice-template4/invoice-template4.component';
import { InvoiceTemplate5Component } from './invoice-templates/invoice-template5/invoice-template5.component';
import { InvoiceContainerComponent } from './invoice-templates/invoice-container/invoice-container.component';
import { ParentComponentComponent } from './invoice-templates/parent-component/parent-component.component';
import { InvoiceTemplate6Component } from './invoice-templates/invoice-template6/invoice-template6.component';
import { NoInvoiceComponent } from './invoice-templates/no-invoice/no-invoice.component';
import { InvoiceDescriptionComponent } from './invoice-templates/invoice-description/invoice-description.component';
import { UpdateInvoiceComponent } from './invoice-templates/update-invoice/update-invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ListInvoicesComponent,
    InvoiceTemplate1Component,
    InvoiceTemplate2Component,
    InvoiceTemplate3Component,
    InvoiceTemplate4Component,
    InvoiceTemplate5Component,
    InvoiceContainerComponent,
    ParentComponentComponent,
    InvoiceTemplate6Component,
    NoInvoiceComponent,
    InvoiceDescriptionComponent,
    UpdateInvoiceComponent,

    

  ],
  imports: [
    BrowserModule,AppRoutingModule,RouterLink,ReactiveFormsModule,
    AppRoutingModule,FormsModule,HttpClientModule,BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
