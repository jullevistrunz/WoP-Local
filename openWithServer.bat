@echo Opening Browser
start "" http://localhost:6944
@echo.
@echo Starting Server with python3 http.server
python3 -m http.server 6944
