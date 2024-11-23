export function formatDate(dateString: Date): string {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Extract year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero if needed
  const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

  // Format the date string
  return `${year}-${month}-${day}`;
}