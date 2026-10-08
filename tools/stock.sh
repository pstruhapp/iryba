set -x
mkdir -p mrs6 && cd mrs6
UA="Mozilla/5.0 (iryba.cz data check; pstruhakapr@gmail.com)"
curl -sSL -A "$UA" https://www.rybariboskovice.cz/zarybneni/ -o boskovice.html
curl -sSL -A "$UA" https://www.rybariboskovice.cz/aktuality/ -o boskovice-akt.html
curl -sSL -A "$UA" https://www.rybariboskovice.cz/rss.xml -o boskovice-rss.xml
curl -sSL -A "$UA" https://www.mrshodo.cz/ -o hodonin.html
curl -sSL -A "$UA" "https://www.mrshodo.cz/wp-json/wp/v2/posts?per_page=30&search=zaryb" -o hodonin-wp.json
curl -sSL -A "$UA" "https://www.mrshodo.cz/wp-json/wp/v2/posts?per_page=30" -o hodonin-wp-all.json
curl -sSL -A "$UA" "https://www.mrshodo.cz/feed/" -o hodonin-feed.xml
curl -sSL -A "$UA" https://www.crsmosumperk.cz/informace/ -o sumperk.html
ls -la
