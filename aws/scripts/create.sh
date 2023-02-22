node ./generators/index_gen.js
node ./generators/style_gen.js

isodate=$(date +"%Y-%m-%dT%H:%M:%S%z")
echo $isodate
#update in sitemap.xml

sed -i "s/<lastmod>.*<\/lastmod>/<lastmod>$isodate<\/lastmod>/g" sitemap.xml