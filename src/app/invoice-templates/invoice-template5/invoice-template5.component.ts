import { Component,Input, OnInit } from '@angular/core';
import { ToWords } from 'to-words';

@Component({
  selector: 'app-invoice-template5',
  templateUrl: './invoice-template5.component.html',
  styleUrl: './invoice-template5.component.css'
})
export class InvoiceTemplate5Component implements OnInit {
  @Input() services: any[] = [];
  @Input() invoiceNumber:string='';
  @Input() invoiceDate : Date | null =null;


  ngOnInit(): void {
    console.log(this.services);
  }

  getTotalAmount(): number {
    let total = 0;
    for (const service of this.services) {
      total += service.amount;
    }
    return total;
  }


  private toWords: ToWords;

  constructor() {
    this.toWords = new ToWords();
  }


  convertToWords(amount: number): string {
    const words = this.toWords.convert(amount);
    return 'INR ' + words.charAt(0).toUpperCase() + words.slice(1);
  }

  amountInUsd(): number {
    let totalAmount = 0;
    for (let service of this.services) {
      totalAmount += service.amount / service.rate;
    }
    return parseFloat(totalAmount.toFixed(2));
  }
  
  
  

}
