import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../_services/invoice.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html'
})
export class ListInvoicesComponent implements OnInit {

  isAdmin:Boolean=false;
  invoices: any[]=[];

  constructor(private invoiceService: InvoiceService, 
    private router:Router,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.checkUser();
    
  }


  checkUser(){
    this.authService.getUserProfile().subscribe((res)=>{
      console.log(res.isAdmin);
      this.isAdmin=res.isAdmin;
      this.listInvoices();
    })
  }

  listInvoices(){
    if(this.isAdmin){
      this.invoiceService.getAllInvoicesForAdmin().subscribe(invoices=>{
        this.invoices=invoices;
      })
    }else{
      this.invoiceService.getAllInvoices().subscribe(invoices => {
        console.log(invoices);
        this.invoices = invoices;
      });
    }
  }

  navigateToInvoiceDetails(invoiceNumber:string){
    this.router.navigate(['invoices/'+invoiceNumber])
  }

  addInvoice(){
    this.router.navigate(['create']);
  }

  
}
