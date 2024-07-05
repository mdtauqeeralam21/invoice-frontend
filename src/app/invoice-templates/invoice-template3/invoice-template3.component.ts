import { Component,Input } from '@angular/core';
import { ToWords } from 'to-words';

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
