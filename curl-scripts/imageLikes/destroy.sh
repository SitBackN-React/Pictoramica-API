API="http://localhost:4741"
URL_PATH="/images"

curl "${API}${URL_PATH}/${IMAGE_ID}/imageLikes/${IMAGELIKE_ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

  echo
