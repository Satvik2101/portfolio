f=0; # if f flag is passed, then index.html isn't 
     # shown to the user before the rest of the script continues

d=0; # if d flag is passed, then this is a dry-run. 
    # The script will not commit to git, or upload to S3, or invalidate CloudFront
    # index.html, styles.css , invalidate_files, upload_files will
    # still be created



# Go through flags
while getopts ":d" opt; do
    case $opt in
        d)
            d=1
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            ;;
    esac
done

./aws/scripts/create.sh -t




# Read current git branch 
# store it in variable

branch=$(git branch --show-current)

aws_ids_file="";
if [ $branch == "main" ]; then
    aws_ids_file="./aws/aws_ids"
else if [ $branch == "dev" ]; then
    aws_ids_file="./aws/aws_ids_dev"
else 
    echo "Using branch $branch. No aws_ids file found for this branch, will dry run with dev IDs"
    d=1
    aws_ids_file="./aws/aws_ids_dev"

fi
fi


# Read S3 URI and CloudFront distribution ID from aws/aws_ids (space separated)
# store them in variables

read s3 cf < $aws_ids_file
echo "S3 URI: $s3"
echo "CloudFront distribution ID: $cf"
# Read files to upload from aws/upload_files
# store them in variable

./aws/scripts/calc_diff.sh

node ./aws/scripts/filter.js

read files < ./aws/upload_files
echo "Files to upload: $files"
read -p "Press enter to continue";

#MSYS_NO_PATHCONV=1  -- This line prevents Git-Bash from converting the path to Windows format
# Without it, /xyz/abc is converted to C:/Program Files/Git/xyz/abc
# Only happens with file names starting with a /


# Upload files to S3
if [ $d == 1 ]; then
    echo "Dry run. Not uploading to S3"
else
    for file in $files; do
        # if file is html file, remove the .html extension and add --content-type text/html
        if [[ $file == *.html ]]; then
            MSYS_NO_PATHCONV=1 aws s3 cp web/$file $s3/${file::-5} --content-type text/html
        else
            MSYS_NO_PATHCONV=1 aws s3 cp web/$file $s3/$file
        fi
    done
fi

# Create cloudfront invalidations

read invalidations < ./aws/invalidate_files

echo "Files to invalidate: $invalidations"
read -p "Press enter to continue";

if [ $d == 1 ]; then
    echo "Dry run. Not invalidating CloudFront"
else
    for invalidation in $invalidations; do
        # echo \"$invalidation\"
        # if invalidation is an html file, remove the .html extension

        if [[ $invalidation == *.html ]]; then
            invalidation=${invalidation::-5}
            echo $invalidation
        fi
        
        MSYS_NO_PATHCONV=1 aws cloudfront create-invalidation --distribution-id $cf --paths $invalidation
    done
fi

MSYS_NO_PATHCONV=0

#Commit to git, with timestamp
if [ $d == 1 ]; then
    echo "Dry run. Not committing to git"
else
    git add .
    git commit -m "Push to S3 by script commit $(date)"
    git push -u origin $branch
fi

#et last commit hash and save it to aws/last_commit_hash
git rev-parse HEAD > ./aws/last_commit_hash