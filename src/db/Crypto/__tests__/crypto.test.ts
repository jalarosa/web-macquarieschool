import { encrypt , decrypt} from '../index';

test('encrypt test', () => {
  const secret = 'Ea4wPbct27yK8xpYTkYH6KVBU6cJgzcN';
  const text = 'password';
  const hash = encrypt(text,secret);
  console.log(hash);
  const result = decrypt(hash, secret)
  expect(text).toBe(result);
});

