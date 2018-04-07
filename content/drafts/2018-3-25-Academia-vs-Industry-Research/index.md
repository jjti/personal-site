---
title: Academia vs. Industry
date: 3/25/2018
---

It's late March and I'm running out of time to choose a graduate program. Applications were due in December, "interviews" were done in February, and the deadline is April 15th. Including time spent on a Fellowship application in September and October, I've been thinking about graduate school for seven straight months. But now, in March -- after all that -- I'm not sure it's worth it.

I'm lucky to be choosing between three great schools. And, on the surface, graduate school makes sense. I like programming... I like research -- there will be plenty of both in graduate school. But my concern is that I'll do eight or more years of concerted research, including postdocs, only to wind up in a position I didn't need a PhD to get to. If I become a computational biologist, building tools to help biologists and find trends in medical data, is that any different from what I'm already doing? If I become an inference-focused [data scientist](https://bits.blogs.nytimes.com/2015/04/28/less-noise-but-more-money-in-data-science/) on the other side, would the marginal benefit of graduate school outweight its marginal cost?

There are undeniable perks to getting a PhD. Working and networking with graduate students, learning under professors that are experts, and doing the kind of foundational research that only happens in academia.

But books on the graduate process stress the need to understand why you're getting the PhD is critical. And making the decision has been difficult. I'm working with a sparse data set: I have no more information than impressions made during the interview weekends and a list of alumni to cross reference in LinkedIn. To get a better sense of how to compare programs, I compared research in academia and industry. I wanted to know whether there are research trends in the ivory tower that don't translate to academia or visa versa.

### Aggregation and Google Blacklisting

Industry was easy. Companies post their [abstracts online](https://research.google.com/pubs/papers.html).

Getting the academic data turned out to be difficult. I had a better go at it than Aaron Swartz... but the journals weren't real forthcoming with the words. I started with the [Crossref api](https://github.com/CrossRef/rest-api-doc). It stood out for being well documented and allowing filters on metadata -- namely author affiliation, which is why I did this in the first place. But the results were broad and the abstracts rare. Authors with hundreds of papers on Google Scholar returned two hits on Crossref (when filtering on the presence of abstracts). Conversely, authors with common names and tens of papers on Google Scholar returned hundreds of papers through Crossref.

Then I tried scraping Google Scholar. I had a list of names pulled from the faculty pages of schools in a [USNews ranking](https://www.usnews.com/best-graduate-schools/top-science-schools/computer-science-rankings). I had a python wrapper for a Google Scholar scraper ([scholarly.py](https://github.com/ckreibich/scholar.py)). But I got 503'ed immediately and then wasted a bunch of time trying to get around. I added 10-45 second delays between http requests; I created a dozen [fake User-Agents](https://pypi.python.org/pypi/fake-useragent) and cycled between them; I tried hundreds of [proxy addresses](https://github.com/constverum/ProxyBroker), which turned out to be pointless: every one was a exit node that had also been blacklisted by Google. In the end, the best I could do was the random delay through local with the User-Agents. But with >1,100 researchers, each with >50 papers -- every paper is another request to get to the abstract -- Google Scholar was out of the question (pending access to some trove of non-blacklisted proxies or a Google Scholar API).
