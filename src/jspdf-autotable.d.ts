import { jsPDF } from 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: any; // You can replace `any` with a more specific type if needed.
    lastAutoTable: any; // Same here for the lastAutoTable property.
  }
}
