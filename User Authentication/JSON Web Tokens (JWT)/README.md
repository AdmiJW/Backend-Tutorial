# JSON Web Tokens (JWT)

Author: AdmiJW

__Sessions__ had been the most commonly used user authentication scheme on most servers. However, it had its downsides. Not only it will take longer to process (Look up session in DB, then look up user), it is also harder to scale horizontally. Say you have multiple servers (Like one for Banking, one for Stocks..) which contain their own database, the session might not be shared across different servers even if a user suddenly decides to use another service, resulting in having to log in again. Bad UX?

__JSON Web Tokens__ (JWT) proves to be a game changer, when it proves to be self-contained / stateless (User information is directly stored in the token, unlike sessions which map sessionID -> user in the database). With this, JWT is very usable across different servers, with added benefits like lightweight, faster process time etc.

__Authentication__: Happens during the login process, verifies whether the person loggin in is the actual person himself

__Authorization__: On subsequent request, we have to check if the user is still the same as the one during the authentication process.

---

<br>

## What is Base64 Encoding?

__Base64__ encoding is essentially a way to transfer binary data using plain text format (ASCII). 

For example, you may have a music file (`.mp3`), an image (`.png`) or just plain text in ASCII. All of those underneath is simply formed by series of `0`s and `1`s, aka binary data. Now, if you want to transfer these files or data to somewhere else (or simply want to encode it), but __STRICTLY__ have to encode it in plain text format, how would you do it?

Do you encode it using merely `0` and `1` in plain text? If we were to do this, a simple ASCII character like 'A' would be encoded as `0100 0001`, where each indiviual 'bit' is actually an ASCII character themselves, resulting in total of (1 byte * 8 character) = 8 bytes taken just to store a single character 'A', which originally took 1 byte! 

Instead, __Base64__ introduces a standard where we would encode data using 6 bits, which means we have a total of 64 available characters used to encode binary data. In fact, the available characters are __a-z__, __A-Z__, __0-9__ and __+/__. 

Say we have character 'A' to encode in Base64 again. We would just take the binary representation of 'A': `0100 0001`, split into groups of 6 bits, and map to their representation in Base64 lookup table:

`010000` and `01`

`010000` corresponds to `Q` in Base64, but what about `01`? In this case where it is not enough 6 bit to form a group, we have to __pad__ with zeroes.

`01` ==> `01 0000` ==> `Q` in Base64

### __Padding__

However, we need to also inform that the final byte are padded. How do we do that?

Turns out, we try to group each byte (8 bits) into group of 3. Each group shall have 24 bits then:

`(01000001-________-________)`

Now, we inform padding occurred by appending `=` sign.

* A single `=` means in the last 3 bytes group, we have 1 incomplete bytes and padded it with zero. Eg case: `(10101010-10101010-10______)`
* Double `=` means in the last 3 bytes group, we have 2 incomplete bytes and padded it with zero. Eg case: `(10101010-1010____-________)`

Thus, our final encoding: `QQ==`

---

<br>

## Base64url? What's the difference?

Notice in regular Base64 encoding character set, `+/` are used. This is bad if used in URL, as `+` (Can be used as space character) and `/` (Path delimiter) are both reserved characters in URL scheme. Therefore, Base64url simply changes `+` to `-` and `/` to `_`. That's it!


---

<br>

## How JWT Works?

*(If you haven't looked at Public Key Cryptography Section, review it now)*

[Very Useful Website - jwt.io](jwt.io)

When the user logs in to our website, we need some way to 'remember':

> This user had logged in previously. It should stay logged in for X period of time.

As you already know, __Sessions__ has been one of the way to authenticate logged in users by sending SessionID to the server, and it is the responsibility of the server to lookup the respective sessionID in the database.

Wouldn't it be nice if we can, without looking up into the database, verify that the request sent by the client is indeed the one that just authenticated himself? 

> As an analogy, we want to check if a person is fully vaccinated or not. Any one can simply present a digital certificate to prove himself, but the main problem is whether the certificate is __ACTUALLY__ issued by the government or not, since anyone would forge it!

Similar to the analogy, we want to check if a client is already authorized or not. The client can simply present some proof that he is indeed the account with that username logged in, but the main issue is __WHETHER THE PROOF ITSELF IS ISSUED BY THE SERVER__, since hackers may forge a proof and luckily gain unauthorized access!

---

Therefore, how JWT actually works, is to utilize cryptography! The server itself would be holding the __key__ to encrypt (More important) and decrypt (Less important) the data. 

1. When the user logs in, the server would generate some data regarding the logging in (Especially about who the user is)
1. In the signature part, the server will __hash__ and __encrypt__ (Sign) the data.
1. The encrypted data, JWT will be sent to the client, saving it.
1. Every subsequent request, the client would sent that JWT to the server.
1. Once server receives the JWT, it __decrypts__ it to ensure that
    * The data is not tempered with (Otherwise the hash would be different)
    * The JWT is __INDEED__ issued by the server (Encrypted with the key that only server knows)

JWT can actually be implementing using symmetric keys or asymmetric (public-private) keys. In the former case, the keys __MUST__ not be leaked. In the latter case, the public key can be leaked, but __NOT THE PRIVATE KEY__.

Note that due to the fact that public keys can be shared, we shall never include credentials in JWT. Even if both the keys can be kept secret (Clients no need to know public key), it is a bad practice.

In the case where client knows the public key and is able to decrypt the JWT, even if the client may attempt to temper with the token (Maybe changing userID to disguise as other user), it has to know the secret key the server is using to encrypt it back to the JWT the server accepts! That's what the point of JWT is - __Making sure the token is issued by none other than the server itself, and not tempered__.

---

## Format of JWT

A JWT consists of __3__ parts, each separated by a period (`.`).

* __Header__ - Usually consists of `alg` and `typ`, which tells the hashing algorithm (Eg: `HS256`) and type of the token (`JWT`). __Base64url encoded__.
* __Payload__ - Contains the 'claims' (Eg: claiming that I am the user 'AdmiJW'). Common fields are `sub` (Subject - the main content), `iss` (issuer), `exp` (expires), `aud` (audience). __Base64url encoded__, `iat` (issued at)
* __Signature__ - The core purpose of JWT. It takes the concatenation of __Header__ and __Payload__, and __hashes__ it with the __secret__ key. Anyone with public key can decrypt it and be confident that the JWT is issued by the server.

At the end, you should be having 3 period (.) separated Base64url encoded strings that are easily passed in HTTP / HTML environments.