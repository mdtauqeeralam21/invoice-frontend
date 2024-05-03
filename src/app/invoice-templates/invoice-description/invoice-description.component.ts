import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { InvoiceService } from '../../_services/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-invoice-description',
  templateUrl: './invoice-description.component.html',
  styleUrl: './invoice-description.component.css'
})
export class InvoiceDescriptionComponent implements OnInit {

   fromCompany: string = '';
   toCompany: string = '';
   services: any[] = [];
   invoiceNumber:string='';
   invoiceDate :Date |null= null;

   isAdmin:Boolean =false;
   showConfirmation = false;
  invoiceNumberToDelete: string='';

  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
  constructor( 
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private toastr:ToastrService,
    private router:Router,
    private authService:AuthService
  ){
  }

  ngOnInit(): void {
    this.checkUser();
    const invoiceNumber = this.route.snapshot.paramMap.get('invoiceNumber');
    if (invoiceNumber) {
      this.invoiceService.getInvoiceByNumber(invoiceNumber).subscribe(
        (invoice: any) => {
          this.fromCompany=invoice.raisingFromCompany;
          this.toCompany=invoice.raisingToCompany;
          this.invoiceNumber= invoiceNumber;
          this.services=invoice.services;
          this.invoiceDate=invoice.createdAt;
        },
        error => {
          console.error('Error fetching invoice:', error);
        }
      );
    }
  }


  checkUser(){
    this.authService.getUserProfile().subscribe((res)=>{
      this.isAdmin=res.isAdmin;
    })
  }

  determineTemplate(): string {
    if (this.fromCompany === 'Edubot Software And Services' && this.toCompany === 'Cherish Technologies Inc') {
      return 'template1';
    } else if (this.fromCompany === 'Sirian Overseas Educare' && this.toCompany === 'Cherish Technologies Inc') {
      return 'template2';
    } else if (this.fromCompany === 'Sirian Infotech' && this.toCompany === 'Sirian Group'){
      return 'template3';
    }else if (this.fromCompany === 'Cherish IT Solutions' && this.toCompany === 'Cherish Technologies Inc'){
      return 'template4';
    }else if (this.fromCompany === 'Stasmen Pvt Limited' && this.toCompany === 'Cherish Technologies Inc'){
      return 'template5';
    }else if (this.fromCompany === 'Refinedge Pvt Limited' && this.toCompany === 'Cherish Technologies Inc'){
      return 'template6';
    }else{
      return 'default';
    }
  }

  printInvoice(): void {
    
    const printContents = this.invoiceContent.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;
  
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  deleteInvoice(invoiceNumber: string): void {
    this.invoiceService.deleteInvoice(invoiceNumber).subscribe(
      () => {
        console.log('Invoice deleted successfully');
        this.showConfirmation = false;
        this.toastr.success('Invoice deleted','Success');
        this.router.navigate(['']);
      },
      error => {
        this.toastr.error('Invoice not deleted','Error')
        console.error('Error deleting invoice:', error);
        this.showConfirmation = false;
      }
    );
  }

  cancelDelete(): void {
    this.showConfirmation = false;
  }

  confirmDelete(invoiceNumber: string): void {
    this.invoiceNumberToDelete = invoiceNumber;
    this.showConfirmation = true;
  }

  updateInvoice(invoiceNumber:String){
    this.router.navigate(['update/'+invoiceNumber])
  }
  
}
