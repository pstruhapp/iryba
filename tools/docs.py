import json,re
s=open("docs.json").read()
urls=sorted(set(re.findall(r'https?://[^"\\\s]+?\.pdf',s,re.I)))
print("\n".join(urls)); open("urls.txt","w").write("\n".join(urls)+"\n")
