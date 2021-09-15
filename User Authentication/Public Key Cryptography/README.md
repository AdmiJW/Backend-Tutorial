# Public Key Cryptography - Introduction 🔐

My note on public key cryptography without going into the details of Mathematics.

[Reference VIDEO](https://www.youtube.com/watch?v=F-sFp_AvHc8)

---

<br>

Talking about cryptographic, there are mainly 2 ways of cryptography:

* __Secret key Cryptography__ / (Symmetric Cryptography)
* __Public key Cryptography__ / (Asymmetric Cryptography)

### __1.0 - Secret key Cryptography__ 

Secret key cryptography works by having both parties that are meant to communicate with each other, to hold the same Secret Key. Therefore, both parties has to come to an agreement on the secret key before the communication process even started. However, it is also the process of exchanging secret key that introduces weaknesses to this method of cryptography.

Say Alice and Bob wants to communicate with each other by passing notes. However, they want their messages encrypted so that anyone intercepting their message would not understand the message even if they viewed the contents. Using the secret key cryptography scheme, they both agreed to use __Caesar Cipher__ method to shift their messages by, say 2 characters. Therefore, when Alice wants to send "HELLO", it would be encrypted as "JGNNQ", and Bob will then decrypt it back into "HELLO". *(From here, you'll see the method to encrypt and decrypt are 'symmetric'. Both parties share the same key)*

However, during the agreement of the secret key, perhaps John eavesdropped and get to know that they are using Caesar Cipher shift 2. Now, if John intercepted their messages, John would know everything Alice and Bob sent to each other.

In history where governments are using this method of encryption to sending government messages (Of course, they wouldn't simply use Caesar Cipher), the transfer of the secret key is the most crucial part, and usually involved armored cars and armed forces during the transportation, all to prevent the secret key from being leaked. What if there are spies?

### __2.0 - Public Key Cryptography__

__Public key Cryptography__ are much more powerful, and are widely used nowadays (HTTPS, cryptocurrency, user authentication, digital signature...). 

Public key Cryptography works by essentially having __2__ keys: __Public key__ and __Private key__. The public key can be distributed publicly to everyone, while the private key is known by none other than yourself.

The way it works is interesting: 
* A message encrypted by public key __can ONLY be decrypted by PRIVATE KEY__ (Not even public key itself can decrypt it, otherwise what's the point of encrypting if everyone knows public key?). 
* Vice versa, a message encrypted by private key __can ONLY be decrypted by PUBLIC KEY__.

This introduces two main usages of public key cryptography:

1. __Encryption__ - The sender will know the public key of the receiver, and encrypts the message using the public key. Once message is received by receiver, it is decrypted using private key.

1. __Signing__ - To prove that one document is not manipulated and signed by none other than the signer itself, the signer will encrypt the hashed document using private key, and everyone can use the public key to decrypt and verify the document is indeed encrypted using private key.

---

Under the hood of public key cryptography, we have to understand a bit about __Trapdoor functions__.

__Trapdoor functions__ have properties:

* __Deterministic__ - Same input, same output
* __One way__ - Easy to compute from one way to other, but very hard to reverse the process
* __Large number space__ - Large enough "output" space so collision almost never occurs
* __Small enough output__ - To be efficiently transported, say over the network.

One example would be __Prime factor of large numbers__. Given two prime numbers `a` and `b`, we easily compute its multiplication result by `a*b`, but given a multiplication result, it is hard to derive what `a` and `b` originally was, unless one of `a` or `b` is provided.

---

### Elliptic Curve Cryptography

[Reference](https://www.youtube.com/watch?v=dCvB-mhkT0w)

One of such trapdoor 'method' (It is not mathematically a function) is elliptic curve cryptography (ECC).

From the elliptic curve graph, take one arbitrary point as our starting point (Called generator point). Determine our private key `n`, then we are going to repeat the process `n` times to obtain our public key.

1. Draw a tangent line on the point currently at. The line should only intersect on one other point.
1. From that point, draw a vertical line to intersect at another point (The graph is symmetric around x axis). That point will be our new point.

The whole point is, it is relatively easy to compute public key by having the private key. However, it is almost impossible to deduce back what the private key was just by having the public key and no other information.

---

<br>

### __Signing Process__

One suggested signing process is to 

__Server__:
1. Decide a hashing algorithm to use (Eg: sha256)
1. Hash the data using the hasing algorithm
1. Take the hashed data and encrypt it using private key.
1. Pack into data package which includes the following:
    * Algorithm (SHA256)
    * Original, Unmodified data
    * Encrypted hashed data in Step (3)

__Client__:
1. Initialize the hashing algorithm from the data package received.
1. Hash the original data included in the data package.
1. From the encrypted hashed data in data package, decrypt it using public key.
1. Now, both the data from Step (2) and (3) shall match.

This signing process essentially ensures two things:
* The document/data is not tempered, it is the same version as seen from the signer. Otherwise the hash would be different
* It is indeed the intended signer who signed the document/data, provided the fact that private key is used to encrypt the data which only public key can decrypt.