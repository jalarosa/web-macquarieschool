import * as token from 'token-generator';

export const TokenGenerator = token({
    salt: 'your secret ingredient for this magic recipe',
    timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
});