import { Component,Input } from '@angular/core';
import { ToWords } from 'to-words';

@Component({
  selector: 'app-invoice-template4',
  templateUrl: './invoice-template4.component.html',
  styleUrl: './invoice-template4.component.css'
})
export class InvoiceTemplate4Component {
  @Input() services: any[] = [];
  @Input() invoiceNumber:string='';
  @Input() invoiceDate : Date | null =null;

  
  
  taxId: string = '81-3630750';
  natureOfSupply: string = 'Goods';
  modeOfSupply: string = 'Direct';
  natureOfInvoice: string = 'Tax Invoice';
  igstLevy: string = 'Zero vide letter of';
  undertakingRefNo: string = 'AD360422006362L';
  amountInWords: string = ' Rupees Only';
  taxableValue: string = '0';
  taxRate: string = '0%';
  taxAmount: string = '0';
  totalTaxAmount: string = '0';
  taxAmountInWords: string = 'Nil';
  accountNo: string = '50200062870667';
  bankName: string = 'HDFC Bank Limited';
  branch: string = 'Kukatpally,Telangana';
  ifscCode: string = 'HDFC0003995';
  swiftCode: string = 'HDFCINBBHYD';

  private toWords: ToWords;

  constructor() {
    this.toWords = new ToWords();
  }


  getTotalAmount(): number {
    let totalAmount = 0;
    for (let service of this.services) {
      totalAmount += service.currencyExchange * service.rate;
    }
    return totalAmount;
  }

  convertToWords(amount: number): string {
    const words = this.toWords.convert(amount);
    return 'INR ' + words.charAt(0).toUpperCase() + words.slice(1);
  } 
}
