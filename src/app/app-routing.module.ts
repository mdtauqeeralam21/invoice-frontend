import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './authguard.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ListInvoicesComponent } from './invoice-templates/list-invoices/list-invoices.component';
import { ParentComponentComponent } from './invoice-templates/parent-component/parent-component.component';
import { InvoiceDescriptionComponent } from './invoice-templates/invoice-description/invoice-description.component';
import { UpdateInvoiceComponent } from './invoice-templates/update-invoice/update-invoice.component';
import { adminGuard } from './admin.guard';


const routes: Routes = [
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'invoices', component: ListInvoicesComponent,canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'forgotpassword', component:ForgotPasswordComponent},
  { path: 'invoices/:invoiceNumber', component: InvoiceDescriptionComponent,canActivate: [AuthGuard] },
  {path:'create',component:ParentComponentComponent,canActivate: [AuthGuard]},
  {path:'update/:invoiceNumber', component:UpdateInvoiceComponent, canActivate:[AuthGuard,adminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
