./aws/scripts/create.sh
check for -f flag
if [ "$1" != "-f" ]; then
    C:/Windows/explorer.exe index.html
    read -p "Press enter to continue";
fi
./aws/scripts/calc_diff.sh
node ./aws/scripts/filter.js

