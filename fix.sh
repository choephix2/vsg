for D in `find ./frontend/* -maxdepth 0 -type d`
do
  echo -n ${D}
  cp frontend_fix/game.html ${D}/game.html
  echo -n '       del:'
  mv ${D}/c2runtime.js ${D}/analytics.js 2>/dev/null && echo -n ' .js'
  rm ${D}/index.html                     2>/dev/null && echo -n ' index'
#   rm ${D}/sw.js                          2>/dev/null && echo -n ' sw'
#   rm ${D}/offline.js                     2>/dev/null && echo -n ' off'
#   rm ${D}/offlineClient.js               2>/dev/null && echo -n ' offc'
  rm ${D}/icon-*.png                     2>/dev/null && echo -n ' icons'
  echo ''
done