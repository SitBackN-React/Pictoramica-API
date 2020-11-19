API="http://localhost:4741"
URL_PATH="/images"

curl "${API}${URL_PATH}/${IMAGE_ID}/imageLikes" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "imageLike": {
      "liked": "'"${LIKED}"'",
      "userId": "'"${USERID}"'"
    }
  }'

echo
