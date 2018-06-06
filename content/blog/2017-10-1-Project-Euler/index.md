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

### Problem 206

> Find the unique positive integer whose square has the form 1*2_3_4_5_6_7_8_9_0, where each "*" is a single digit.

```python
def incrementingSquare():
    """
    Notes:

    1. only numbers ending in **70 can produce a square with a 9 in
    the hundreds place. Can start at 70 + sqrt of the target number and
    increment by 100

    2. can write out a string for the target number, and increment thru both it
    and the newly squared number, testing at each index
    """
    target = "1234567890"

    for n in range(70 + 10**9, 2 * 10**9, 100):
        digs = str(n**2)
        if all([digs[i * 2] == c for i, c in enumerate(target)]):
            return (n, digs)


# output: (1389019170, "1929374254627488900") in 9 secs
print(incrementingSquare())
```

### Problem 112

> Working from left-to-right if no digit is exceeded by the digit to its left it is called an increasing number; for example, 134468.

> Similarly if no digit is exceeded by the digit to its right it is called a decreasing number; for example, 66420.

> We shall call a positive integer that is neither increasing nor decreasing a "bouncy" number; for example, 155349.

> Clearly there cannot be any bouncy numbers below one-hundred, but just over half of the numbers below one-thousand (525) are bouncy. In fact, the least number for which the proportion of bouncy numbers first reaches 50% is 538.

> Surprisingly, bouncy numbers become more and more common and by the time we reach 21780 the proportion of bouncy numbers is equal to 90%.

> Find the least number for which the proportion of bouncy numbers is exactly 99%.

```python
def bouncy_and_increment(n):
    """
        n {int} number to test for bounciness

        return a tuple with a boolean for whether it was bouncy and,
        if it's false, a number for how much to increment the current number by
    """
    digs = split(n)
    # direction can be -1: decreasing, 0: constant, 1: increasing
    direction = 0
    for i, d in enumerate(digs[1:], 1):
        if digs[i - 1] < d:
            # this current digit is greater than last
            if direction == -1:
                # it had been decending
                return True
            direction = 1
        elif digs[i - 1] > d:
            # this current digit is less than the last
            if direction == 1:
                # it had been ascending
                return True
            direction = -1

    return False


assert bouncy_and_increment(10) == False
assert bouncy_and_increment(101) == True
assert bouncy_and_increment(10123) == True
assert bouncy_and_increment(11123) == False


def bouncy_numbers(target_ratio=0.99):
    """
    bouncy == not constantly increasing or decreasing

    find the first number at which the ratio of "bouncy" to "non-bouncy"
    numbers reaches, exactly, 99%

    Notes:
        1. should be able to increment thru a large number of digits. The loop should
            be able to self-increment quickly
            ex: at 12000, it's immediately clear that the next 7999 numbers are not-bouncy
            (wound up not needed because it completes in 5 sec)
        2. start at 100, the hint already says the first 99 numbers are not-bouncy
    """
    number, ratio = 1, 0.0  # ratio of bouncy to non-bouncy numbers
    bouncy_numbers = 0.0

    while ratio < target_ratio:
        bouncy = bouncy_and_increment(number)
        if bouncy:
            bouncy_numbers += 1
        ratio = bouncy_numbers / number
        number += 1

    return number - 1


assert bouncy_numbers(0.9) == 21780
print(bouncy_numbers())  # output: 1587000 in 5.55 seconds
```
