# CHANGELOG ch01

Date: 2026-03-07
Status: Completed

## Baseline Import
- Extracted `Chapter1Code.zip` to `docs/unity_course/work/ch01`.
- Baseline sample identified as console app `PrintRainMessage`.

## Code Changes Implemented
1. Updated target framework from `net6.0` to `net8.0` in `PrintRainMessage.csproj` for local runtime compatibility.
2. Added `ResolveCondition`, `Normalize`, and `GetAdvice` methods in `Program.cs`.
3. Added argument-driven weather condition handling with normalized mapping and safe fallback to `unknown`.

## Validation Summary
- Manual runtime cases executed: 8
- Passed: 8
- Failed: 0
- Regression risk: low (simple deterministic logic).
