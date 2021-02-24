import * as crypto  from 'crypto';

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

export type Hash = {
    iv: string,
    content: string
};

export const encrypt = (text: string, secretKey: string): Hash => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export const decrypt = (hash: Hash, secretKey: string) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};
