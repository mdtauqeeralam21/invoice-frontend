import { Component,Input } from '@angular/core';
import { ToWords } from 'to-words';

@Component({
  selector: 'app-invoice-template6',
  templateUrl: './invoice-template6.component.html',
  styleUrl: './invoice-template6.component.css'
})
export class InvoiceTemplate6Component {
  @Input() services:any[]=[];
  @Input() invoiceNumber:string='';
  @Input() invoiceDate : Date | null =null;

  
  
  totalAmount: string = ' ';
  taxableValue: string = '0';
  taxRate: string = '0%';
  taxAmount: string = '0';
  totalTaxAmount: string = '-';

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
