export default function removeNonNumericChars(str: string): number {
    return +str.replace(/\D/g, '');
  }