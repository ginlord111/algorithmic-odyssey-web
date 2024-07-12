import bcrypt from 'bcryptjs';
export async function hashPassword(password:string) {
  const saltRounds = 10; // You can adjust the salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}