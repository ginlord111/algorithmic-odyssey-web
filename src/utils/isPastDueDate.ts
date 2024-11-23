export function isPastDate(dateTimeString: Date): boolean {
    const dateTime = new Date(dateTimeString);
    const now = new Date();
  
    return dateTime < now;
  }