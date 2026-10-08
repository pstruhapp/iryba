set -x
mkdir -p mrs4 && cd mrs4
UA="Mozilla/5.0 (iryba.cz data check; pstruhakapr@gmail.com)"
K=$(curl -sSL -A "$UA" https://mrsbrno.cz/appsettings.json | python3 -c "import sys,json;print(json.load(sys.stdin)['api']['apiKey'])")
curl -sSL -A "$UA" -H "WebApiKey: $K" -H "Accept: application/json" "https://mrsbrno.cz/api/public-legislative-document?current_page=1&page_size=200" -o docs.json
head -c 3000 docs.json; echo
python3 ../tools/docs.py
i=0; while read u; do [ -z "$u" ] && continue; i=$((i+1)); curl -sSL -A "$UA" "$u" -o "doc-$i.pdf"; echo "$i $u" >> map.txt; done < urls.txt
curl -sSL -A "$UA" "https://mrsbrno1.cz/wp-content/uploads/2025/12/BPVRP-MP-2026.pdf" -o bpvrp-mp-2026.pdf
curl -sSL -A "$UA" "https://mrsbrno1.cz/wp-content/uploads/2025/12/BPVRP-P-2026.pdf" -o bpvrp-p-2026.pdf
ls -la
