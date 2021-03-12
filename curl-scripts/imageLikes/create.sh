API="http://localhost:4741"
URL_PATH="/imageLikes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "imageLike": {
      "liked": "'"${LIKED}"'",
      "imageId": "'"${IMAGEID}"'"
    }
  }'

echo
