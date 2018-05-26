---
title: Project Euler
date: 10/7/2017
---

Project Euler is a website where users solve problems
that require some programming. For me, it's been something to
do on flights and a reminder that no matter how hard I work on a problem, and no
matter how many LOC, there's always somebody out there that can write a pythonic,
one-line equivalent.

Github Repo: [https://github.com/JJTimmons/euler](https://github.com/JJTimmons/euler)

![Euler badge](https://projecteuler.net/profile/jjtimmons.png)

### Problem 59

> Each character on a computer is assigned a unique code and the preferred standard is ASCII (American Standard Code for Information Interchange).
> For example, uppercase A = 65, asterisk (\*) = 42, and lowercase k = 107.
> A modern encryption method is to take a text file, convert the bytes to ASCII, then XOR each byte with a given value, taken from a secret key.
> The advantage with the XOR function is that using the same encryption key on the cipher text, restores the plain text; for example, 65 XOR 42 = 107,then 107 XOR 42 = 65.
> For unbreakable encryption, the key is the same length as the plain text message, and the key is made up of random bytes.
> The user would keep the encrypted message and the encryption key in different locations, and without both "halves", it is impossible to decrypt the message.

> Unfortunately, this method is impractical for most users, so the modified method is to use a password as a key.
> If the password is shorter than the message, which is likely, the key is repeated cyclically throughout the message.
> The balance for this method is using a sufficiently long password key for security, but short enough to be memorable.

> Your task has been made easy, as the encryption key consists of three lower case characters.
> Using cipher.txt (right click and 'Save Link/Target As...'), a file containing the encrypted ASCII codes, and the knowledge that the plain text must contain common English words, decrypt the message and find the sum of the ASCII values in the original text.

This was an interesting problem with decryption of text with 26^3 passphrases, and I liked my approach to identifying the decrypted solution. I turn a text file of english words into a set and count the number of decrypted "words" that can are recognized english. The output: "The Gospel of John..."

```python
PUNC = set(string.punctuation)  # punction characters

ENGLISH_WORDS = set()
with open("59.english.words.txt") as wordsFile:
    for word in wordsFile:
        ENGLISH_WORDS.add(word.strip())


def keyGen():
    """the possible keys are aaa thru zzz
    ascii for lowercase letters is 97 to 123
    """
    for a in range(97, 123):
        for b in range(97, 123):
            for c in range(97, 123):
                yield [a, b, c]


with open("59.input.txt") as encryption:
    """keep the results with the greatest number of words
    """
    maxCount, bestResult, bestByteScore = 0, "", 0
    encryptedChars = [int(k) for k in encryption.read().split(",")]
    for keys in keyGen():
        # XOR with key
        decryptedChars = [char ^ keys[i % 3] for i, char in enumerate(encryptedChars)]
        decryptedText = [chr(c) for c in decryptedChars if chr(c) not in PUNC]
        decryptedText = "".join(decryptedText)

        # join chars and separate into words
        decryptedWords = decryptedText.split(" ")
        wordCount = sum(
            1 for word in decryptedWords if word.lower() in ENGLISH_WORDS)

        # set a new best predicted decryption
        if wordCount > maxCount:
            maxCount, bestResult = wordCount, decryptedWords
            bestByteScore = sum(decryptedChars)

    # output: 107359 in 12.76 seconds
    print(maxCount, bestByteScore, bestResult)
```

### Problem 21

Another Sieve. This solution depends on finding all odd composites that are not
prime numbers, accomplished using a generator on all ints checked against the Sieve map.

```python
n = 10000

def primeCheckGen():
	primes = [True] * n
	for ind in range(2, n):
		if primes[ind]:
			for ind2 in range(ind * 2, n, ind):
				primes[ind2] = False
	primesOnly = [i for i in range(3, n, 2) if primes[i]]
	return primes, primesOnly

primesCheck, primes = primeCheckGen()
twiceSquares = [2*(x**2) for x in range(1, n)]
oddComposites = set([i for i in range(3, len(primesCheck), 2) if primesCheck[i] is False])
primeTwoSquares = sorted(set([i + j for i in primes for j in twiceSquares]))

for num in oddComposites:
	if num not in primeTwoSquares:
		print num
		break
```

### Problem 50

Another prime generator is used to first create the primes. Then a recursive
sumSeq function is used where successive prime next to each other in the number line.
So a sequence of primes requires adding each to one another, until a composite number is
found. The summed prime number and its constituents are returned.
TODO: learn python's reduce function to avoid writing stuff like sumArr.

```python
def sumArr(primesArr):
	total = 0
	for val in primesArr:
		total += val
	return total

def sumSeq(ind, primeSum, primeArr, arrUsedInSum):
	if ind < len(primes): # below upper bound
		primeArr.append(primes[ind])
		if sumArr(primeArr) < lim:
			if primesCheck[sumArr(primeArr)]:
				arrUsedInSum = primeArr[:]
				return sumSeq(ind + 1, sumArr(primeArr), primeArr, arrUsedInSum)
			else:
				return sumSeq(ind + 1, primeSum, primeArr, arrUsedInSum)
	return primeSum, arrUsedInSum

currMax, currArr = 0, []
for ind in range(0, len(primes)):
	nextMax, nextArr = sumSeq(ind, 0, [], [])
	if len(nextArr) > len(currArr):
		currMax, currArr = nextMax, nextArr
print currMax, currArr, len(currArr)
```
