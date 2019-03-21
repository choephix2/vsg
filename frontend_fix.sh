for D in `find ./frontend/* -maxdepth 0 -type d`
do
  echo -n "${D}"
  cp "frontend_fix/game.html" "${D}/game.html"
  mv "${D}/c2runtime.js" "${D}/analytics.js" 2>% || echo -n " - - - (c2runtime.js not found)"
  echo ""
#   rm "${D}/index.html"
#   rm "${D}/sw.js"
#   rm "${D}/offline.js"
#   rm "${D}/offlineClient.js"
done