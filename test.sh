API_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdHJpbmciOiJpb3MiLCJrZXlfdmVyc2lvbiI6IjAiLCJpYXQiOjE1MDc3MjM3MDd9.wlhtBwB2e9A4qzA7PdjR-NdER2O_jajPCzlMhcREpig"

for offset in 20 40; do
  echo "OFFSET $offset"
  curl -sS "https://snutt-api-dev.wafflestudio.com/v1/search_query" \
    -H "content-type: application/json" \
    -H "x-access-apikey: $API_KEY" \
    --data-binary "{\"academic_year\":[],\"category\":[],\"categoryPre2025\":[],\"classification\":[],\"course_number\":null,\"credit\":[],\"department\":[],\"etc\":null,\"limit\":20,\"offset\":$offset,\"page\":20,\"semester\":1,\"sortCriteria\":\"강의평 많은 순\",\"times\":[],\"timesToExclude\":[],\"title\":\"\",\"year\":2026}" \
    | jq -r '.[]._id'
done
