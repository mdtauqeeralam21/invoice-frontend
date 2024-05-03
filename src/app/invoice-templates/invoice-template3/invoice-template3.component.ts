import { Component,Input } from '@angular/core';
import * as numberToWords from 'number-to-words';

@Component({
  selector: 'app-invoice-template3',
  templateUrl: './invoice-template3.component.html',
  styleUrl: './invoice-template3.component.css'
})
export class InvoiceTemplate3Component {
  @Input() services: any[] = [];
  @Input() invoiceNumber:string='';
  @Input() invoiceDate : Date | null =null;

  
  
  taxId: string = '88-4401787';
  natureOfSupply: string = 'Goods';
  modeOfSupply: string = 'Direct';
  natureOfInvoice: string = 'Tax Invoice';
  igstLevy: string = 'Zero vide letter of';
  undertakingRefNo: string = ' ';
  amountInWords: string = 'Nil';
  taxableValue: string = '';
  taxRate: string = '0%';
  taxAmount: string = '0';
  totalTaxAmount: string = '-';
  taxAmountInWords: string = 'Nil';
  companyPanNo: string = 'ABLCS4366A';
  accountNo: string = '491405000030';
  bankName: string = 'ICICI Bank Limited';
  branch: string = 'Vijayawada, Andhra Pradesh';
  ifscCode: string = 'ICIC0004914';
  swiftCode: string = 'ICICINBBCTS';

  getTotalAmount(): number {
    let totalAmount = 0;
    for (let service of this.services) {
      totalAmount += service.currencyExchange * service.rate;
    }
    return totalAmount;
  }

  convertToWords(amount: number): string {
    const words = numberToWords.toWords(amount);

    const result ='INR '+ words.charAt(0).toUpperCase() + words.slice(1);

    return result;
  }
  
}
