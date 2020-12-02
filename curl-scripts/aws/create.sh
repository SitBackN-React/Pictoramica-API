#!/bin/bash

API="http://localhost:4741"
URL_PATH="/post-image"

curl "${API}${URL_PATH}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request POST \
  -F "imageUrl=@/Users/christine/sei/projects/Pictoramica-API/curl-scripts/tiny-cat.jpg" \
  -F "tag=Tiny cat 2" \
  # -F "description=Tiny pic of tiny cat" \

  echo
