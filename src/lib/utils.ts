import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR').format(d);
}

export function generateQuoteNumber(prefix: string, id: number): string {
  return `${prefix}${String(id).padStart(5, '0')}`;
}

export function calculateTotals(items: any[]) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price * (1 - (item.discount || 0) / 100)), 0);
  const totalTax = items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.price * (1 - (item.discount || 0) / 100);
    return sum + (itemSubtotal * (item.taxRate || 0) / 100);
  }, 0);
  
  return {
    subtotal,
    tax: totalTax,
    total: subtotal + totalTax
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}