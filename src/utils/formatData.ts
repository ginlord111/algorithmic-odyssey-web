export function formatDateToYYYYMMDD(createdAt: Date): string {
  // Validate that the createdAt date is valid
  const createdAtDate = new Date(createdAt).getTime();
  if (isNaN(createdAtDate)) {
    throw new Error("Invalid createdAt date.");
  }

  // Format the result as yyyy-mm-dd
  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(createdAt.getDate()).padStart(2, '0');

  // Return formatted date
  return `${year}-${month}-${day}`;
}

// Example usage
const data = {
  createdAt: new Date("2024-11-22T13:29:04.227Z") // Date object
};

try {
  const resultDate = formatDateToYYYYMMDD(data.createdAt);
  console.log(`Formatted Date: ${resultDate}`); // Output format: yyyy-mm-dd
} catch (error) {
  console.error(error);
}
