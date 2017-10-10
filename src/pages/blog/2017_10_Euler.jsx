const title = "Project Euler";
const blurb = "Solutions to some Project Euler questions.";
const date = "10/7/2017";

const post = `
Project Euler is a website where users solve problems
that require some programming. For me, it's been something to
do on flights and a reminder that no matter how hard I work on a problem, and no
matter how many LOC, there's always somebody out there that can write a pythonic,
one-liner equivelant.

![Euler badge](https://projecteuler.net/profile/jtrickster333.png)

### Problem 47

I started this problem using the Sieve of Eratosthenes
(used everywhere is problems < 100) in one step,
and the incrementing in another, but found, after some refactoring,
that I could reduce the solution down to a single loop thru the limit. It increments
every composite number in a nested for-loop and, at the end, returns the
answer.

\`\`\`python
def PE47(lim=200000,dpf=4):
    L=[0]*(lim+1)
    for i in xrange(2,lim/2+1):
        if L[i]==0:
            for j in range(i,lim+1,i): L[j]+=1
    return ''.join(map(str,L)).index(''.join(map(str,[dpf]*dpf)))

print PE47()
\`\`\`

### Problem 21

Another Sieve. This solution depends on finding all odd composites that are not
prime numbers, accomplished using a generator on all ints checked against the Sieve map.

\`\`\`python
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
\`\`\`

### Problem 50

Another prime generator is used to first create the primes. Then a recursive
sumSeq function is used where successive prime next to eachother in the numberline.
So a sequence of primes requires adding each to one another, until a composite number is
found. The summed prime number and its constituents are returned.
TODO: learn python's reduce function to avoid writing stuff like sumArr.

\`\`\`python
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
\`\`\`

`;

const IHCQuant = {
	title: title,
	date: date,
	blurb: blurb,
	__content: post
};

export default IHCQuant;
