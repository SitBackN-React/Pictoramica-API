API="http://localhost:4741"
URL_PATH="/image"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "image": {
    "tag": "'"${TAG}"'",
    "caption": "'"${CAPTION}"'",
    "imageUrl": "'"${IMAGE}"'",
    "forSale": "'"${SALE}"'",
    "price": "'"${PRICE}"'"
  }
}'

echo
