import { Component,Input, OnInit } from '@angular/core';
import * as numberToWords from 'number-to-words';

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

  convertToWords(amount: number): string {
    const words = numberToWords.toWords(amount);

    const result =words.charAt(0).toUpperCase() + words.slice(1);

    return result;
  }

  amountInUsd(): number {
    let totalAmount = 0;
    for (let service of this.services) {
      totalAmount += service.amount / service.rate;
    }
    return parseFloat(totalAmount.toFixed(2));
  }
  
  
  

}
