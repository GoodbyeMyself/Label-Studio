$ErrorActionPreference = "Stop"

Push-Location $PSScriptRoot

try {
  $env:LATEST_VERSION_CHECK = "false"
  $env:FRONTEND_HMR = "true"
  $env:FRONTEND_HOSTNAME = "http://localhost:4010"
  $env:DJANGO_HOSTNAME = "http://localhost:4040"
  & ".\.venv\Scripts\python.exe" "label_studio/manage.py" "runserver" "0.0.0.0:4040" "--noreload"
}
finally {
  Pop-Location
}
