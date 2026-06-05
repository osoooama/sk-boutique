param([switch]$Prod)

$project = "C:\Users\osama\Documents\sk-boutique"
Set-Location $project

Write-Host "=== SK BOUTIQUE DEPLOY ===" -ForegroundColor Yellow

# 1. Build
Write-Host "`n[1/3] Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed!" -ForegroundColor Red; exit 1 }

# 2. Deploy
if ($Prod) {
  Write-Host "`n[2/3] Deploying to PRODUCTION..." -ForegroundColor Cyan
  npx netlify-cli deploy --prod --dir=out
} else {
  Write-Host "`n[2/3] Deploying to draft URL..." -ForegroundColor Cyan
  npx netlify-cli deploy --dir=out
}

if ($LASTEXITCODE -ne 0) { Write-Host "Deploy failed!" -ForegroundColor Red; exit 1 }

Write-Host "`n=== DONE ===" -ForegroundColor Green
