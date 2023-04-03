node ./scripts/create.js
pandoc -H ./scripts/personal.tex resume.md -o satvik-gupta-resume.pdf --pdf-engine=xelatex --highlight-style tango -V block-headings