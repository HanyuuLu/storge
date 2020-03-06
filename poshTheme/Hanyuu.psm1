#requires -Version 2 -Modules posh-git

function Write-Theme {

    param(
        [bool]
        $lastCommandFailed,
        [string]
        $with
    )

    $lastColor = $sl.Colors.PromptBackgroundColor
    $cursorColor = $lastColor

    $prompt = Write-Prompt -Object $sl.PromptSymbols.StartSymbol -ForegroundColor $sl.Colors.UserInfoForeGroundColor -BackgroundColor $sl.Colors.UserInfoBackGroundColor

    #check the last command state and indicate if failed
    If ($lastCommandFailed) {
        $prompt += Write-Prompt -Object "$($sl.PromptSymbols.FailedCommandSymbol) " -ForegroundColor $sl.Colors.UserInfoForeGroundColor -BackgroundColor $sl.Colors.UserInfoBackGroundColor
    }

    #check for elevated prompt
    If (Test-Administrator) {
        $prompt += Write-Prompt -Object "$($sl.PromptSymbols.ElevatedSymbol) " -ForegroundColor $sl.Colors.AdminIconForegroundColor -BackgroundColor $sl.Colors.SessionInfoBackgroundColor
    }

    $user = $sl.CurrentUser
    $computer = [System.Environment]::MachineName
    if (Test-NotDefaultUser($user)) {
        $prompt += Write-Prompt -Object "$user@$computer " -ForegroundColor $sl.Colors.UserInfoForeGroundColor -BackgroundColor $sl.Colors.UserInfoBackGroundColor
        $cursorColor = $sl.Colors.UserInfoBackGroundColor
    }

    $timeStamp = Get-Date -UFormat %T
    $timeStamp = " $timeStamp "
    $prompt += Write-Prompt -Object "$($sl.PromptSymbols.SegmentForwardSymbol)" -ForegroundColor $cursorColor -BackgroundColor $sl.Colors.TimeStampBackGroundColor
    $prompt += Write-Prompt -Object "$timeStamp" -ForegroundColor $sl.Colors.TimeStampForeGroundColor -BackgroundColor $sl.Colors.TimeStampBackGroundColor
    $cursorColor = $sl.Colors.TimeStampBackGroundColor

    if (Test-VirtualEnv) {
        $prompt += Write-Prompt -Object "$($sl.PromptSymbols.SegmentForwardSymbol) " -ForegroundColor $cursorColor -BackgroundColor $sl.Colors.VirtualEnvBackgroundColor
        $prompt += Write-Prompt -Object "$($sl.PromptSymbols.VirtualEnvSymbol) $(Get-VirtualEnvName) " -ForegroundColor $sl.Colors.VirtualEnvForegroundColor -BackgroundColor $sl.Colors.VirtualEnvBackgroundColor
        $cursorColor = $sl.Colors.VirtualEnvBackgroundColor
    }

    # Writes the drive portion
    $prompt += Write-Prompt -Object "$($sl.PromptSymbols.SegmentForwardSymbol)" -ForegroundColor $cursorColor -BackgroundColor $sl.Colors.DriveBackColor
    $path = " $($(Get-FullPath -dir $pwd).Replace('\',[char]::ConvertFromUtf32(0xE0B1))) "
    $prompt += Write-Prompt -Object $path -ForegroundColor $sl.Colors.DriveForeColor -BackgroundColor $sl.Colors.DriveBackColor
    $cursorColor = $sl.Colors.DriveBackColor

    $status = Get-VCSStatus
    if ($status) {
        $themeInfo = Get-VcsInfo -status ($status)
        $lastColor = $themeInfo.BackgroundColor
        $prompt += Write-Prompt -Object $sl.PromptSymbols.SegmentForwardSymbol -ForegroundColor $cursorColor -BackgroundColor $lastColor
        $prompt += Write-Prompt -Object " $($themeInfo.VcInfo) " -BackgroundColor $lastColor -ForegroundColor $sl.Colors.GitForegroundColor
        $cursorColor = $sl.Colors.GitForegroundColor
    }
    
    if ($with) {
        $prompt += Write-Prompt -Object $sl.PromptSymbols.SegmentForwardSymbol -ForegroundColor $lastColor -BackgroundColor $sl.Colors.WithBackgroundColor
        $prompt += Write-Prompt -Object " $($with.ToUpper()) " -BackgroundColor $sl.Colors.WithBackgroundColor -ForegroundColor $sl.Colors.WithForegroundColor
        $lastColor = $sl.Colors.WithBackgroundColor
    }

    # Writes the postfix to the prompt
    $prompt += Write-Prompt -Object $sl.PromptSymbols.SegmentForwardSymbol -ForegroundColor $lastColor
    $prompt += Write-Prompt "`n"
    $prompt += Write-Prompt -Object " $([Char]9634)$($([Char]9651))$([Char]9634) " -ForegroundColor $sl.Colors.TagForegroundColor -BackgroundColor $sl.Colors.TagBackgroundColor
    $prompt += Write-Prompt -Object "$($sl.PromptSymbols.SegmentForwardSymbol)" -ForegroundColor $sl.Colors.TagBackgroundColor -BackgroundColor $sl.Colors.SessionInfoBackgroundColor
    $prompt += Write-Prompt " "
}

$sl = $global:ThemeSettings #local settings
$sl.PromptSymbols.SegmentForwardSymbol = [char]::ConvertFromUtf32(0xE0B0)
$sl.Colors.UserInfoBackGroundColor = [ConsoleColor]::DarkGray
$sl.Colors.UserInfoForeGroundColor = [ConsoleColor]::Gray
$sl.Colors.TimeStampBackGroundColor = [ConsoleColor]::Gray
$sl.Colors.TimeStampForeGroundColor = [ConsoleColor]::Black
$sl.Colors.PromptForegroundColor = [ConsoleColor]::White
$sl.Colors.PromptBackgroundColor = [ConsoleColor]::Cyan
$sl.Colors.PromptSymbolColor = [ConsoleColor]::White
$sl.Colors.DriveForeColor = [ConsoleColor]::Black
$sl.Colors.DriveBackColor = [ConsoleColor]::Cyan
$sl.Colors.PromptHighlightColor = [ConsoleColor]::Cyan
$sl.Colors.GitForegroundColor = [ConsoleColor]::Black
$sl.Colors.WithForegroundColor = [ConsoleColor]::White
$sl.Colors.WithBackgroundColor = [ConsoleColor]::DarkRed
$sl.Colors.VirtualEnvBackgroundColor = [System.ConsoleColor]::DarkCyan
$sl.Colors.VirtualEnvForegroundColor = [System.ConsoleColor]::White
$sl.Colors.TagForegroundColor = [System.ConsoleColor]::Black
$sl.Colors.TagBackgroundColor = [System.ConsoleColor]::Cyan
