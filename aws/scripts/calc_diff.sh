lastHash=$(< ./aws/last_commit_hash)
echo "Last commit hash: $lastHash"
git diff --name-status $lastHash > ./aws/changed_files
git ls-files --other --exclude-standard > ./aws/added_files