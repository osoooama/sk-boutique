# ================================================================
# SK BOUTIQUE - Next.js Development Server & Public Tunnel
# Makes the store accessible from ANY device in the world!
# ================================================================

# Reload Path environment variables so Node and NPM are available
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Add detected Winget NodeJS path
$nodeWingetPath = "C:\Users\osama\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.16.0-win-x64"
if (Test-Path $nodeWingetPath) {
    $env:Path = "$nodeWingetPath;" + $env:Path
}

$Port = 3000
$Root = $PSScriptRoot

Write-Host ""
Write-Host " ==============================================" -ForegroundColor Cyan
Write-Host "   SK BOUTIQUE - Next.js & Public Tunnel Server" -ForegroundColor White
Write-Host " ==============================================" -ForegroundColor Cyan
Write-Host ""

# Start the Next.js dev server in the background
Write-Host " Starting Next.js Development Server on port $Port..." -ForegroundColor Yellow

$npmCmd = "npm"
if ($nodeWingetPath -and (Test-Path "$nodeWingetPath\npm.cmd")) {
    $npmCmd = "$nodeWingetPath\npm.cmd"
}
$devProcess = Start-Process $npmCmd -ArgumentList "run dev" -WorkingDirectory $Root -NoNewWindow -PassThru

# Wait for Next.js to start listening on port 3000
Write-Host " Waiting for local server to become active..." -ForegroundColor Yellow
$serverActive = $false
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    # Check if port 3000 is open using TcpClient
    $tcp = New-Object System.Net.Sockets.TcpClient
    try {
        $tcp.Connect("127.0.0.1", $Port)
        $serverActive = $true
        $tcp.Close()
        break
    } catch {
        # Port not ready yet
    }
}

if (-not $serverActive) {
    Write-Host " [WARNING] Local server did not start on port $Port in a timely manner." -ForegroundColor Yellow
    Write-Host " Please check if Next.js launched correctly by running 'npm run dev' manually." -ForegroundColor Gray
} else {
    Write-Host " [SUCCESS] Local Server is active on http://localhost:3000" -ForegroundColor Green
}

# Start localtunnel in the foreground to make port 3000 accessible over the internet
Write-Host ""
Write-Host " Starting public tunnel via Localtunnel..." -ForegroundColor Yellow
Write-Host " [PUBLIC LINK] Accessible globally from ANY device/network:" -ForegroundColor Green
Write-Host "   https://sk-boutique-977.loca.lt" -ForegroundColor Cyan
Write-Host ""
Write-Host " Share this link with anyone to open the store on their mobile data, other networks, etc.!" -ForegroundColor Yellow
Write-Host " Press Ctrl+C in this window to stop the server." -ForegroundColor Red
Write-Host " ==============================================" -ForegroundColor Cyan
Write-Host ""

# Run localtunnel in the foreground
npx --yes localtunnel --port $Port --subdomain sk-boutique-977

# Cleanup processes on exit (when localtunnel is stopped)
Write-Host " Stopping Next.js server..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
if ($devProcess -and -not $devProcess.HasExited) {
    Stop-Process -Id $devProcess.Id -Force -ErrorAction SilentlyContinue
}

Write-Host " Done. Goodbye!" -ForegroundColor Green
