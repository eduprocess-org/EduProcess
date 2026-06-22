#!/bin/bash
set -e

PR_TITLE=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
  "https://api.github.com/repos/${GITHUB_REPOSITORY}/pulls?state=closed&base=main&sort=updated&direction=desc" \
  | jq -r '.[0].title')

echo "Processing Release for PR Title: $PR_TITLE"

if [[ $PR_TITLE =~ (v[0-9]+\.[0-9]+\.[0-9]+) ]]; then
    VERSION="${BASH_REMATCH[1]}"
else
    echo "ERROR: No valid SemVer version found in PR title matching 'vX.Y.Z'."
    exit 1
fi

CURRENT_DATE=$(date +"%d-%m-%Y")
RELEASE_BRANCH_NAME="release/${CURRENT_DATE}"

echo "Extracted Version: $VERSION"
echo "Generated Release Branch Name: $RELEASE_BRANCH_NAME"

git config --global user.name "github-actions[bot]"
git config --global user.email "github-actions[bot]@users.noreply.github.com"

echo "Creating immutable Git Tag..."
git tag -a "$VERSION" -m "Automated Production Release: $PR_TITLE"
git push origin "$VERSION"

echo "Creating archival release branch..."
git checkout -b "$RELEASE_BRANCH_NAME"
git push origin "$RELEASE_BRANCH_NAME"

echo "Scheduling Dual-Tag Ingestion into Docker Hub..."
docker pull ${DOCKERHUB_USERNAME}/eduprocess-backend:prod
docker pull ${DOCKERHUB_USERNAME}/eduprocess-frontend:prod

docker tag ${DOCKERHUB_USERNAME}/eduprocess-backend:prod ${DOCKERHUB_USERNAME}/eduprocess-backend:${VERSION}
docker tag ${DOCKERHUB_USERNAME}/eduprocess-frontend:prod ${DOCKERHUB_USERNAME}/eduprocess-frontend:${VERSION}

docker push ${DOCKERHUB_USERNAME}/eduprocess-backend:${VERSION}
docker push ${DOCKERHUB_USERNAME}/eduprocess-frontend:${VERSION}

echo "Generating automated GitHub Release Notes..."
curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/${GITHUB_REPOSITORY}/releases \
  -d "{
    \"tag_name\": \"$VERSION\",
    \"target_commitish\": \"main\",
    \"name\": \"Release $VERSION\",
    \"body\": \"Automated release generated from production deployment pipeline.\\n\\n**PR Summary:** $PR_TITLE\",
    \"draft\": false,
    \"prerelease\": false,
    \"generate_release_notes\": true
  }"

echo "Release automation completed successfully!"