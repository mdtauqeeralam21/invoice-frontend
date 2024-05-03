import { Component,Input } from '@angular/core';
import * as numberToWords from 'number-to-words';

@Component({
  selector: 'app-invoice-template2',
  templateUrl: './invoice-template2.component.html',
  styleUrl: './invoice-template2.component.css'
})
export class InvoiceTemplate2Component {
  @Input() services: any[] = [];
  @Input() invoiceNumber:string='';
  @Input() invoiceDate : Date | null =null;

  

  taxId: string = '81-3630750';
  natureOfSupply: string = 'Goods';
  modeOfSupply: string = 'Direct';
  natureOfInvoice: string = 'Tax Invoice';
  igstLevy: string = 'Zero vide Letter of Undertaking';
  undertakingRefNo: string = 'AD370422005178B';
  taxableValue: string = '';
  taxRate: string = '0%';
  amountdemo:number=210098;
  taxAmount: string = '0';
  totalTaxAmount: string = '-';
  taxAmountInWords: string = 'Nil';
  companyPanNo: string = 'ABECS9313G';
  accountNo: string = '920020070841142';
  bankName: string = 'Axis Bank Limited';
  branch: string = 'Vijayawada, Andhra Pradesh';
  ifscCode: string = 'UTIB0000069';
  swiftCode: string = 'AXISINBB069';

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
