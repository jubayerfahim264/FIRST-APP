# Android Build Script for FIRST_APP
# Usage: .\build-android.ps1 -Profile production
# Profiles: production (default), preview, development

param(
    [string]$Profile = "production"
)

$PackageName = "com.firstapp.todos"

Write-Host "=========================================="
Write-Host "FIRST_APP - Android Build Script" -ForegroundColor Cyan
Write-Host "=========================================="
Write-Host "Profile: $Profile" -ForegroundColor Yellow
Write-Host "Package: $PackageName" -ForegroundColor Yellow
Write-Host ""

# Check if eas-cli is installed
try {
    $easVersion = npm list -g eas-cli 2>$null | Select-String "eas-cli"
    if (-not $easVersion) {
        Write-Host "Installing EAS CLI..." -ForegroundColor Yellow
        npm install -g eas-cli
    }
} catch {
    Write-Host "Error checking EAS CLI: $_" -ForegroundColor Red
}

# Check if logged in
Write-Host "Checking Expo login..." -ForegroundColor Cyan
try {
    $loginCheck = eas whoami 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Not logged in. Running: eas login" -ForegroundColor Yellow
        eas login
    } else {
        Write-Host "✓ Already logged in" -ForegroundColor Green
    }
} catch {
    Write-Host "Error checking login: $_" -ForegroundColor Red
}

# Clean and install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# Build APK
Write-Host ""
Write-Host "Starting Android build (Profile: $Profile)..." -ForegroundColor Cyan
Write-Host "This may take 10-15 minutes on first build..." -ForegroundColor Yellow
Write-Host ""

eas build --platform android --buildType apk --profile $Profile

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=========================================="
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "=========================================="
    Write-Host ""
    Write-Host "Your APK is ready. Visit https://expo.dev/builds to download." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To install on device:" -ForegroundColor Yellow
    Write-Host "  adb install -r app-release.apk"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "=========================================="
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host "=========================================="
    Write-Host ""
    Write-Host "Check the logs above for details." -ForegroundColor Yellow
    exit 1
}
