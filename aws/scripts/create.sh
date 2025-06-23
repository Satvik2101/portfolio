# check flags
t=0


while getopts ":t" opt; do
    case $opt in
        t)
            t=1
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            ;;
    esac
done


if [ $t == 1 ]; then
    tsc --project ./tsconfig.json
fi
node ./helpers/indexGen.js
node ./helpers/addAnalytics.js
node ./helpers/sitemap_gen.js
# node ./helpers/minifyHtml.js

isodate=$(date -Is)
echo $isodate
#update in sitemap.xml

sed -i "s/<lastmod>.*<\/lastmod>/<lastmod>$isodate<\/lastmod>/g" web/sitemap.xml