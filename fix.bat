@echo off
set back=%cd%
for /d %%i in ((frontend\*) do (
cd "%%i"
echo current directory:
cd
pause
)
cd %back%