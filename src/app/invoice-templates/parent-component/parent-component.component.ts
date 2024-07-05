import { Component } from '@angular/core';
import { InvoiceService } from '../../_services/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.css'
})
export class ParentComponentComponent {

  companies: string[] = ["Sirian Overseas Educare", "Cherish IT Solutions","Sirian Infotech","Edubot Software And Services","Refinedge Pvt Limited","Stasmen Pvt Limited"];
  tocompanies: string[] = ["Cherish Technologies Inc", "Sirian Group"];

  selectedFromCompany: string = '';
  selectedToCompany: string = '';
  currentStep: number = 1;
  services: any[] = [{ description: '', hsnCode: '', currencyExchange: '', rate: 82 }];
  invoiceNumber:string='';
  invoiceDate:Date=new Date();

  
  constructor(private invoiceService: InvoiceService,private toastr:ToastrService,private router :Router) { }

  generateInvoice(): void {
    const prefix = 'INV'; 
    const invoiceNumber = this.invoiceService.generateInvoiceNumber(prefix);
    console.log('Generated Invoice Number:', invoiceNumber);
    this.invoiceNumber=invoiceNumber;
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
          this.generateInvoice();
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

  createInvoice(): void {
    const invoiceData = {
        invoiceNumber: this.invoiceNumber,
        raisingFromCompany: this.selectedFromCompany,
        raisingToCompany: this.selectedToCompany,
        services: this.services,
        invoiceDate:this.invoiceDate
    };
    this.invoiceService.createInvoice(invoiceData).subscribe((res: any) => {
        console.log(res);
        const invoiceNum = this.invoiceNumber;
        this.toastr.success("Invoice created", "Success");
        this.router.navigate(['invoices/' + invoiceNum]);
    }, (error) => {
        console.error('Error creating invoice:', error.error.msg);
        this.toastr.error("Failed to create invoice", "Error");
    });
}



}
