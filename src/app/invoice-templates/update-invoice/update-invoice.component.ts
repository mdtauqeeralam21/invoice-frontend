import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../_services/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrl: './update-invoice.component.css'
})
export class UpdateInvoiceComponent implements OnInit {

   companies: string[] = ["Sirian Overseas Educare", "Cherish IT Solutions","Sirian Infotech","Edubot Software And Services","Refinedge Pvt Limited","Stasmen Pvt Limited"];
   tocompanies: string[] = ["Cherish Technologies Inc", "Sirian Group"];

  selectedFromCompany: string = '';
  selectedToCompany: string = '';
  currentStep: number = 1;
  services: any[] = [{ description: '', hsnCode: '', currencyExchange: '', rate: 82 }];
  invoiceNumber:string='';
  invoiceDate:Date=new Date();


  
  constructor(private invoiceService: InvoiceService,
    private toastr:ToastrService,
    private router :Router,
    private route:ActivatedRoute
    ) { }

    ngOnInit(): void {
      const invoiceNumber = this.route.snapshot.paramMap.get('invoiceNumber');
      if (invoiceNumber) {
        this.invoiceService.getInvoiceByNumber(invoiceNumber).subscribe(
          (invoice: any) => {
            console.log(invoice);
            this.selectedFromCompany=invoice.raisingFromCompany;
            this.selectedToCompany=invoice.raisingToCompany;
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

 

  addService(): void {
    this.services.push({ description: '', hsnCode: '', currencyExchange: '', rate: 82 });
  }

  removeService(index: number): void {
    this.services.splice(index, 1);
  }

  nextStep() {
  if (this.currentStep === 1) {
    this.currentStep = 2;
  } else if (this.currentStep === 2) {
    if (this.isValidCompanyCombination()) {
      this.currentStep = 3;
    } else if(this.selectedFromCompany=='Stasmen Pvt Limited' && this.selectedToCompany=='Cherish Technologies Inc'){
      this.currentStep=7;
    } else {
      this.toastr.warning('Please select appropriate companies.','Error');
      console.error('Please select appropriate companies.');
    }
  } else if (this.currentStep === 3 || this.currentStep === 7) {
    const allServicesValid = this.services.every(service => 
      service.description && service.description.trim() !== '' &&
      service.hsnCode && service.hsnCode.trim() !== ''
    );

    if (allServicesValid) {
      if (this.services.length > 0) {
        const allServicesAmountValid = this.services.every(service =>
          (service.amount && service.amount > 0) || (service.currencyExchange && service.currencyExchange > 0)
        );

        if (allServicesAmountValid) {
          this.currentStep = 4;
        } else {
          this.toastr.warning('Please enter valid details for all services.', 'Validation Error');
          console.error('Please enter valid details for all services.');
        }
      } else {
        this.toastr.warning('Please add at least one service.');
        console.error('Please add at least one service.');
      }
    } else {
      this.toastr.warning('Please enter valid details for all services.', 'Validation Error');
      console.error('Please enter valid details for all services.');
    }
  }
}

  
  
  isValidCompanyCombination(): boolean {
    const validCombinations = [
      ['Edubot Software And Services', 'Cherish Technologies Inc'],
      ['Sirian Overseas Educare', 'Cherish Technologies Inc'],
      ['Sirian Infotech', 'Sirian Group'],
      ['Cherish IT Solutions', 'Cherish Technologies Inc'],
      ['Refinedge Pvt Limited', 'Cherish Technologies Inc']
    ];
  
    return validCombinations.some(combination =>
      combination[0] === this.selectedFromCompany && combination[1] === this.selectedToCompany);
  }
  
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goBackToEditing(){
    this.currentStep=2;
  }

  updateInvoice(): void {
     
    const invoiceData = {
        services: this.services
    };
    this.invoiceService.updateInvoiceServices(this.invoiceNumber,invoiceData).subscribe((res: any) => {
        this.toastr.success("Invoice Updated", "Success");
        this.router.navigate(['invoices/' + this.invoiceNumber]);
    }, (error) => {
        console.error('Error updating invoice:', error);
        this.toastr.error("Failed to update invoice", "Error");
    });
}



}
