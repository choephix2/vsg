@echo off
FOR /d %%F IN (.\frontend\*) DO (
    echo %%F
    del %%F\index.html
    del %%F\icon*.png
    move /y %%F\c2runtime.js %%F\analytics.js
    xcopy /y .\frontend_fix\game.html %%F\game.html
)