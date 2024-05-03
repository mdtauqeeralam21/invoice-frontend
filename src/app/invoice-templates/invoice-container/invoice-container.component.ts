import { Component,Input,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-invoice-container',
  templateUrl: './invoice-container.component.html',
  styleUrl: './invoice-container.component.css'
})
export class InvoiceContainerComponent {

  @Input() fromCompany: string = '';
  @Input() toCompany: string = '';
  @Input() services: any[] = [];
  @Input() invoiceNumber:string='';
  @Input() invoiceDate: Date |null = null;

  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
  constructor(){

  }


  determineTemplate(): string {
    if (this.fromCompany === 'Edubot Software And Services' && this.toCompany === 'Cherish Technologies Inc') {
      return 'template1';
    } else if (this.fromCompany === 'Sirian Overseas Educare' && this.toCompany === 'Cherish Technologies Inc') {
      return 'template2';
    } else if (this.fromCompany === 'Sirian Infotech' && this.toCompany === 'Sirian Group'){
      return 'template3';
    }else if (this.fromCompany === 'Cherish IT Solutions' && this.toCompany === 'Cherish Technologies Inc'){
      return 'template4';
    }else if (this.fromCompany === 'Stasmen Pvt Limited' && this.toCompany === 'Cherish Technologies Inc'){
      return 'template5';
    }else if (this.fromCompany === 'Refinedge Pvt Limited' && this.toCompany === 'Cherish Technologies Inc'){
      return 'template6';
    }else{
      return 'default';
    }
  }

  printInvoice(): void {
    const printContents = this.invoiceContent.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;
  
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  } 
}
