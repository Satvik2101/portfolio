# Portfolio

This is the code for my website, hosted at [https://www.satvikgupta.com](https://www.satvikgupta.com).

I'm using S3 and CloudFront to host the website. The website is built using my own templating engine, [Lucid](https://github.com/Satvik2101/lucid). Lucid converts Typescript code to static HTML files, which are then uploaded to S3 using the AWS CLI. 

This project contains a lot of scripts and tools that I use to manage my website. I've documented them below.

## AWS/Scripts

### calc_diff.sh

Calculates the difference between the local version of files, and the ones that were last uploaded. It does using git diff. Whenever [sync.sh](#syncsh) is run, it commits the changes to the git repo, and stores the hash of that commit in aws/last_commit_hash.

### create.sh

A convenience script that just runs other scripts, namely: 

1. Compiles the TS files into JS using tsc, only if the -t flag is passed.
2. Generates index.html using [index_gen.js](#index_genjs)
3. Generates styles.css using [style_gen.js](#style_genjs). 
4. Adds Google Analytics tracking code to all the HTML files in web/, using [addAnalytics.js](#addAnalyticsjs)
5. Generates sitemap using [sitemap_gen.js](#sitemap_genjs)

### filter.js

Runs [calc_diff.sh](#calc_diffsh), which calculates changed, added, renamed, etc. files
Filter.js sorts them into the "Files to upload", and "Files to invalidate (on Cloudfront, so it doesn't serve a cached version)". Files to upload are the ones that have changed, added, or renamed. Files to invalidate are the ones that have been changed. 
For new or renamed files, we don't need to invalidate their Cloudfront caches, since they don't exist yet. The request to Cloudfront will be forwared to S3, which will serve the new file.

## lucid

Lucid is a templating engine that I built to generate static HTML files. It's written in Typescript, and is compiled to JS using tsc. It's best explained as a new way to write HTML. In this project, it is included as a Git submodule.

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

## styles 

> Not the same as web/styles

While developing I find it helpful to logically separate the CSS files based on which section of the website they're for. This folder contains those files.
They're all combined into one file, styles.css, using [style_gen.js](#style_genjs). Only styles.css is served to the client. The files in this folder are not even uploaded to S3.

## web

Contains the static HTML files that are uploaded to S3. The files are generated using [index_gen.js](#index_genjs), and [style_gen.js](#style_genjs). 

There are also other files that are generated in other ways, for example, all the HTML files in /web/notes. Those are generated using Pandoc, from a Markdown file. 

Also contains images, favicon, other CSS files, etc. 

This is the only folder that is uploaded to S3, and everything in this folder is uploaded.

### web/styles

The web/styles folder contains other CSS files, for other pages on the website, such as timetable, notes, etc. They are separate from the main styles.css file, which is generated using [style_gen.js](#style_genjs).

## helpers 

Contains helper scripts that do various things. 

### addAnalytics.js

Adds the Google Analytics tracking code to all the HTML files in web/.

### indexGen.js

Generates index.html, which is the homepage. It uses the [src](##src) folder to generate the HTML.

### notes_gen.js

Misnamed actually, it doesn't generate the notes, it modifies the HTML files generated from Markdown. It adds a link to styles.css, links the PDF file, etc.

### sitemap_gen.js

Generates sitemap.xml from web/, which is used by search engines to index the website.

### style_gen.js

Combines all the CSS files in [styles](##styles) into one file, styles.css, which is then uploaded to S3.

### resetAnalytics.js

Resets the Google Analytics tracking code in all the HTML files in web/. It's used mainly for development purposes.

## sync.sh

This is the main script that uploads the website to S3. It runs [create.sh](#createsh), which compiles the TS files, generates the HTML files, etc. Then it runs [filter.js](#filterjs), which sorts the files into "Files to upload", and "Files to invalidate". Then it uploads the files to S3, and invalidates the Cloudfront cache for the files that need to be invalidated.

At the end, it commits the changes to the git repo, and stores the hash of that commit in aws/last_commit_hash. This is used (the next time) by [calc_diff.sh](#calc_diffsh) to calculate the difference between the local files, and the ones that were last uploaded.

## watch.sh

Used for development. Watched TS files in the Project directory. Whenever they change, it recompiles them and runs [create.sh](#createsh). 