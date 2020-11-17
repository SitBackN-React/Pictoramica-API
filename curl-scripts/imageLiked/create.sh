API="http://localhost:4741"
URL_PATH="/image-liked"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "imageLiked": {
      "liked": "'"${LIKED}"'",
      "likedImageId": "'"${IMAGEID}"'"
    }
  }'

echo
