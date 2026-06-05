$utf8 = [System.Text.UTF8Encoding]::new($false)
$files = @("out\index.html", "out\_not-found.html")

foreach ($file in $files) {
    $bytes = [System.IO.File]::ReadAllBytes("$PSScriptRoot\$file")
    $content = $utf8.GetString($bytes)
    $mapped = New-Object System.Collections.Generic.List[byte]
    foreach ($ch in $content.ToCharArray()) {
        $cp = [int]$ch
        if ($cp -le 255) {
            [void]$mapped.Add([byte]$cp)
        } else {
            $cb = $utf8.GetBytes([string]$ch)
            foreach ($b in $cb) { [void]$mapped.Add($b) }
        }
    }
    [System.IO.File]::WriteAllText("$PSScriptRoot\$file", $utf8.GetString($mapped.ToArray()), $utf8)
}
