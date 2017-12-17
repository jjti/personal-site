---
title: Deploying a React Webpack Build to S3
date: 12/16/2017
---

I'm building a demo application right now for a protein data base (PDB) file comparison website. Truthfully, I'm not discontent with [RCSB](https://www.rcsb.org/pdb/home/home.do), but I went looking for a project where I could use Golang's concurrency. A search website was ideal since each query against the server necessitates numerous fetches to multiple external API's.

**This post is about getting the front-end of the application to the cloud.** I have used two other build tools for the front-end of web-bound sites: Meteor and Gatsby. Meteor has its own build tool, which is never interacted with because of the framework's extreme level of abstraction, and GatsbyJS allows interaction with the Webpack build tool but in a way that makes it [ridiculously simple](https://www.joshuatimmons.com/blog/this-website).

Repo: [https://github.com/JJTimmons/goPDB](https://github.com/JJTimmons/goPDB)

### Single Server vs CDN

There are two ways to get web-app code to the client: through a server or through an asset hosting service. This delineation is often framed as a choice between keeping web app's content on a server versus a content delivery network (still a server, but a dedicated one that just serves static assets (although [AWS' CloudFront promises to serve both](https://aws.amazon.com/cloudfront/dynamic-content/))).

The first of the two options, having a dedicated server that serves both static assets and hosts an API for the application's logic/database transactions, [used to be standard](https://d0.awsstatic.com/whitepapers/cloud-migration-main.pdf). So an instance of an application, that also contains the business logic and database interactions can also be the source of the webpages that the user sees when then visit web app.

The disadvantage to having a single server instance doing everything, including the serving of static front-end resources is that it's a drain on the server and likely a poor separation of client and server side code. There are build tools like [Meteor](https://guide.meteor.com/structure.html) where the distinction between the two is blurred, but for large applications it makes sense to keep the two separate.
