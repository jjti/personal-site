---
title: This Website
date: 10/18/2017
---
I decided to make this site when after starting grad applications. All of them
had some field saying something like "Link to personal website (optional)."
I did not make this just because of those input fields, but it was the impetus.
Other reasons for making it are that 1) joshuatimmons.com wasn't taken and 2)
I like the idea of having a repository for stuff that I work on. 

Right now, despite it having a "Blog" section, I'm planning to just use it to post results
from my projects. Like a portfolio website for an arts major.
I.e. I don't plan to rant about Trump in my free time. 

### Needs
All I needed was a static website that I could easily add content to. So what I should
have done was another Wordpress or Wix site, but I program with React/Node at work
and didn't feel like going back to Wordpress with all its PHP hooks
(I'm 2 years out of date on Wordpress' tech stack, so they might have moved on by now).

All the pages/routes I was initially planning on having were: Home/About/Contact and
Publications/Posters/Talks/Resume. In hindsight, I should have just gone with that.

### React-Create-App
Instead, I forked React-Create-App and started to write. I made two mistakes in making this site and my
first was thinking that it might also be cool to have a blog section. That led to wondering
how to import markdown into Webpack. Solutions have already been made for this
([markdown-loader](https://www.npmjs.com/package/markdown-loader)), but the pain was associating
meta with each post. Then I found out about YAML and frontmatter, solutions for this exact,
non-original problem. So I looked at [markdown-with-frontmatter-loader](https://github.com/matthewwithanm/markdown-with-front-matter-loader).
That worked well until I tried to embed an image in the post. The image uri wasn't persisting to post-build.
In hind-sight there's probably some existing "copy-links" transformer that does this in Webpack,
but I decided instead to have each post be a jsx module
that exports the meta as fields on the object. The index.js would then load each .jsx subFile
and sort on the date field. This worked, I made the first round of the site, and posted it to an
S3 bucket.

To me, the only interesting this about the S3 pipeline was using aws-cli for syncing.
My sync file is, in its entirety, the following:
```javascript
"use strict";

const child_process = require("child_process");
const path = require("path");
const buildDir = path.resolve("./public");

console.log(buildDir);

child_process.exec(
	`aws s3 sync ${buildDir} s3://www.joshuatimmons.com --delete`,
	(error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	}
);
```

### Performance
I wasn't happy about the performance with this solution. It being React, the routes were
being rendered client-side with javascript on an empty index.html. The results were apparent.
I was getting ~40 on the Chrome Lighthouse Performance audit and initial page loads were hovering
around 5 seconds on what I thought was a pretty light page. 

These findings led to my second mistake making this website: Googling "react router static website markdown."
In otherwords, all the things I wanted. The third result was for a static website generator called [Gatsby](https://www.gatsbyjs.org/),
and it read like a wish-list. Markdown transformers were simply plugins and images would be optimized
during the build. Every route is build into a static html page and all the Webpack optimizations
are handled by the library developers. The library's original author called it, in some talk, a "meta-compiler,"
which is exactly what I was looking for. I knew I wanted it to be fast but didn't want to spend
days searching for the "best" Webpack configuration (or, rather, I wanted to keep myself from doing that).

The library is also "powered by GraphQL," which felt like overkill to me, since my only data-source was going to
be these markdown posts and their linked images, but I also work with GraphQL so it wasn't too much of
a turn-off. Finally, the Gatsby allows for use of stateful React Components, which I thought might be interesting
(fantasy football draft optimizer or plasmid map viewer, etc).

### Rebuild in GatsbyJS
Moving from React-Create-App (definitely not React-Create-Website in retrospect) was straightforward given
the number of guides on setting up a blog with the library. This was a particularly helpful post:
[Creating a Blog with Gatsby](https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/).
I'm happy to say that I got the main two things I was looking for: posts in markdown with copied/optimized
images and better overall performance results from "server-rendered" pages. I'm now hovering around 98 though
Google audit. My last steps will be to gzip everything (or get CloudFront to do it) and fix the S3 object
cache headers. Finally, given the 20+ hours I spent working on the site, we'll see how many posts I actually create.
My guess is 2 more.

### Updates
Turns out that aws-cli has its shortfalls. For me, it was the inability to invalidate the CloudFront cache post S3 sync.
In otherwords, the ability to immediately update the site when I push changes.
The solution is relatively straightforward with S3cmd, with the flag "--cf-invalidate," and its Windows equivelant
but I did not want to pay $99 for some Windows software. An open issue on this feature, or lack thereof, is [here](https://github.com/aws/aws-cli/issues/920). I now invalidate the index file after a sync:

```javascript
child_process.exec(
	`aws s3 sync ${buildDir} s3://www.joshuatimmons.com --delete`,
	(error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		} else if (stdout) {
			child_process.exec(
				`aws cloudfront create-invalidation --distribution-id XXXXXXXXXXXXX --paths /index.html`,
				(errorcf, stdoutcf, stderrcf) => {
					console.log(`error-cf: ${error}`);
					console.log(`stdout-cf: ${stdoutcf}`);
					console.log(`stderr-cf: ${stderrcf}`);
				}
			);
		} else {
			console.log(`stderr: ${stderr}`);
		}
	}
);
```
