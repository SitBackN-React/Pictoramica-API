API="http://localhost:4741"
URL_PATH="/image"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "image": {
      "tag": "'"${TAG}"'",
      "caption": "'"${CAPTION}"'",
      "imageUrl": "'"${IMAGE}"'",
      "like": "'"${LIKE}"'",
      "forSale": "'"${SALE}"'"
    }
  }'

echo