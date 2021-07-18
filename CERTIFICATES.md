## HOW TO CREATE CERTS 

### Create Pem files
First create PEM files using openssl
These files add in server.ts.
* `openssl genrsa -out key.pem`
* `openssl req -new -key key.pem -out csr.pem`
* `openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`
* `rm csr.pem`

### Create CRT and Key file
These files add to nginx certs folder
* `openssl crl2pkcs7 -nocrl -certfile cert.pem | openssl pkcs7 -print_certs -out cert.crt`
* `openssl pkey -in key.pem -out cert.key`
