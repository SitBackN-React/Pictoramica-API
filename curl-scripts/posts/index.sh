#!/bin/sh

API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}/${BLOG_ID}/posts/" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
