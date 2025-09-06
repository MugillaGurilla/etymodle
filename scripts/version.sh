echo '{"message": "'$(git log -1 --pretty=%B)'"}' > src/ts/data/version.json
echo '{"message": "'$(git log -1 --pretty=%B)'"}' > dist/src/ts/data/version.json