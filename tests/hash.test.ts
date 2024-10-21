import { hashPassword, comparePassword } from '@/lib/hash';

test('hashPassword should hash a password correctly', async () => {
  const password = 'mysecret';
  const hashedPassword = await hashPassword(password);

  expect(hashedPassword).not.toBe(password);
  expect(await comparePassword(password, hashedPassword)).toBe(true);
});

test('comparePassword should fail for wrong passwords', async () => {
  const password = 'mysecret';
  const wrongPassword = 'notmypassword';
  const hashedPassword = await hashPassword(password);

  expect(await comparePassword(wrongPassword, hashedPassword)).toBe(false);
});
