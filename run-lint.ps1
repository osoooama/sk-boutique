$nodePath = "C:\Users\osama\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.16.0-win-x64"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;" + $env:Path
}
npm run lint
