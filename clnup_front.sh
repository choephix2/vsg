for D in `find ./frontend/**  -maxdepth 0 -type d`
do
  rm "${D}/index.html"
  rm "${D}/sw.js"
  rm "${D}/offline.js"
  rm "${D}/offlineClient.js"
done