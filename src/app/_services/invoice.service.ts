import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  //private apiUrl = 'http://localhost:4000/api/v1';
  private apiUrl = 'https://invoice-backend-2yup.onrender.com/api/v1';


  constructor(private http: HttpClient) { }

  createInvoice(invoiceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/invoices`, invoiceData);
  }

  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/invoices`);
  }

  getAllInvoicesForAdmin():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/admin`);
  }

  getInvoiceByNumber(invoiceNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/invoices/${invoiceNumber}`);
  }

  updateInvoiceServices(invoiceNumber: string, servicesData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/invoices/${invoiceNumber}`, servicesData);
  }

  deleteInvoice(invoiceNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/invoices/${invoiceNumber}`);
  }

  generateInvoiceNumber(prefix: string): string {
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}-${random}`;
  }
}
