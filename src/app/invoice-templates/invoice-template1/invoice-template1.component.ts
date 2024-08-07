import { Component, Input } from '@angular/core';
import { ToWords } from 'to-words';

@Component({
  selector: 'app-invoice-template1',
  templateUrl: './invoice-template1.component.html',
  styleUrls: ['./invoice-template1.component.css']
})
export class InvoiceTemplate1Component {
  @Input() services: any[] = [];
  @Input() invoiceNumber: string = '';
  @Input() invoiceDate: Date | null = null;

  taxId: string = '81-3630750';
  natureOfSupply: string = 'Goods';
  modeOfSupply: string = 'Direct';
  natureOfInvoice: string = 'Tax Invoice';
  igstLevy: string = 'Zero vide letter of';
  undertakingRefNo: string = ' ';
  taxableValue: string = '';
  taxRate: string = '0%';
  taxAmount: string = '0';
  totalTaxAmount: string = '-';
  taxAmountInWords: string = 'Nil';
  companyPanNo: string = 'AAKFE64081';
  accountNo: string = '50200087016767';
  bankName: string = 'HDFC Bank Limited';
  branch: string = 'Vijayawada, Andhra Pradesh';
  ifscCode: string = 'HDFC0004259';
  swiftCode: string = 'HDFCINBB';

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
