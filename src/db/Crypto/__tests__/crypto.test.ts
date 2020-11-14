import { encrypt , decrypt} from '../index';

test('encrypt test', () => {
  const secret = 'Ea4wPbct27asdfasdfasdfVBU6cJgzcN';
  const text = 'pepe+srv://asdfasdfasdasdf:asdfasdfasdfa@cluster0.asdf.123123.net';
  const hash = encrypt(text,secret);
  const result = decrypt(hash, secret)
  expect(text).toBe(result);
});

