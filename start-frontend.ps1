$ErrorActionPreference = "Stop"

Push-Location (Join-Path $PSScriptRoot "web")

try {
  $env:NX_DAEMON = "false"
  $env:NX_ISOLATE_PLUGINS = "false"
  $env:NX_PLUGIN_NO_TIMEOUTS = "true"
  $env:FRONTEND_HMR = "true"
  $env:FRONTEND_HOSTNAME = "http://localhost:4010"
  $env:DJANGO_HOSTNAME = "http://localhost:4040"
  yarn ls:dev
}
finally {
  Pop-Location
}
