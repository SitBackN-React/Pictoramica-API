API="http://localhost:4741"
URL_PATH="/images/${IMAGE_ID}/imageLikes"

curl "${API}${URL_PATH}/${IMAGELIKE_ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

  echo
