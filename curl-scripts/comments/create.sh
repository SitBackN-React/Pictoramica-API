API="http://localhost:4741"
URL_PATH="/blogs/${BLOG_ID}/blogPosts/${BLOGPOST_ID}/comments"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "remark": "'"${REMARK}"'",
      "commenter": "'"${COMMENTER_ID}"'"
    }
  }'

echo
