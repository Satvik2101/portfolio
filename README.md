# Portfolio

This is the code for my website, hosted at [https://www.satvikgupta.com](https://www.satvikgupta.com).

I'm using S3 and CloudFront to host the website. The website is built using my own templating engine, [Lucid](https://github.com/Satvik2101/lucid). Lucid converts Typescript code to static HTML files, which are then uploaded to S3 using the AWS CLI. 

This project contains a lot of scripts and tools that I use to manage my website. I've documented them below.

## lucid

Lucid is a templating engine that I built to generate static HTML files. It's written in Typescript, and is compiled to JS using tsc. It's best explained as a new way to write HTML. In this project, it is included as a node module.
As a very basic example, 

```html
<a href="www.google.com" target="_blank"> Google </a>
 ```

can be written as

```ts
new A().href("wwww.google.com").target("_blank").populate("Google")
```
 
For more information, see the [Lucid repo](https://www.github.com/Satvik2101/lucid).

## src

Contains the actual TypeScript code for the website. Each class represents an HTML element, and those elements can be nested to create a tree. The tree is then converted to a string, which is written to a file.

## build

Contains the compiled JS code for the [src](##src) and [lucid](##lucid) typescript files.

## web

Contains the static HTML files that are uploaded to S3. The files are generated using helpers/gen.js.

There are also other files that are generated in other ways, for example, all the HTML files in /web/notes. Those are generated using Pandoc, from a Markdown file. 

Also contains images, favicon, CSS files, etc. 

This is the only folder that is uploaded to S3, and everything in this folder is uploaded.

## helpers 

Contains helper scripts that do various things. 

### gen.js
Generates the HTML files from the built JS files, builds sitemap.xml from src/, and adds Google Analytis tag (ganalyticstag.txt) to each HTML file.

### manifest.js
Recurively goes through all the files in web/ and creates a manifest.json that has each file and a hash of it's contents. This manifest is later uploaded to S3. 
When doing an update of the website, we compare the remote manifest with the locally generated one to figure out which files need to be added, updated (and hence have their Cloudfront caches invalidated), or deleted.

### notes_gen.js

Misnamed actually, it doesn't generate the notes, it modifies the HTML files generated from Markdown. It adds a link to styles.css, links the PDF file, etc.

### resetAnalytics.js

Resets the Google Analytics tracking code in all the HTML files in web/. It's used mainly for development purposes.

## upload.js

Compares build/manifest.json with the remote manifest stored on S3. 
For each file it figures out which are new, which are updated, and which have been deleted. 
New and updated files are uploaded to S3. Deleted files are deleted from S3. 
Updated files also have their Cloudfront caches invalidated. 

## CI/CD 

A GitHub action has been setup that deploys the website. 
The CI/CD flow assumes an AWS role with web identity. This role has access to make changes in the prod S3 bucket, as well as invalidate the Cloudfront caches associated with that bucket. 

For changes merged to the `staging` branch, they're deployed to a separate S3 bucket, which can be viewed at dev.satvikgupta.com. This bucket has a separate CF distribution. A different IAM role is used which doesn't have access to the prod bucket. 

For other branches, the action can be triggered manually from the GH UI. All such actions will push to staging and not to prod.

## TODO

1. The AWS things, such as the buckets, CF distributions, and roles, should be present as Terraform in this repository. 
   1. This does come with a bootstrapping problem though.