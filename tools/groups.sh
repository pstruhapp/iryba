set -x
mkdir -p mrs5/g && cd mrs5
UA="Mozilla/5.0 (iryba.cz data check; pstruhakapr@gmail.com)"
K=$(curl -sSL -A "$UA" https://mrsbrno.cz/appsettings.json | python3 -c "import sys,json;print(json.load(sys.stdin)['api']['apiKey'])")
curl -sSL -A "$UA" -H "WebApiKey: $K" -H "Accept: application/json" "https://mrsbrno.cz/api/public-group?current_page=1&page_size=500&sort_column=name&sort_direction=asc&search=" -o groups.json
head -c 800 groups.json; echo
python3 -c "import json;d=json.load(open('groups.json'));it=d.get('items',d);print(len(it));open('gids.txt','w').write('\n'.join(str(x['id']) for x in it))"
while read id; do curl -sSL -A "$UA" -H "WebApiKey: $K" -H "Accept: application/json" "https://mrsbrno.cz/api/public-group/$id" -o "g/$id.json"; sleep 0.25; done < gids.txt
ls g | wc -l
