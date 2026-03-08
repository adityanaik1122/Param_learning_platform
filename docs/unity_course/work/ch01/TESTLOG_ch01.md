# TESTLOG ch01

| ID | Input | Expected | Actual | Status |
|---|---|---|---|---|
| T01 | `rain` | Rain advice | Rain advice shown | Pass |
| T02 | `sunny` | Sunny advice | Sunny advice shown | Pass |
| T03 | `cloudy` | Cloudy advice | Cloudy advice shown | Pass |
| T04 | `storm` | Unknown fallback | Unknown fallback shown | Pass |
| T05 | `RAIN` | Normalize to rain | Normalized and rain advice shown | Pass |
| T06 | no args | Unknown fallback | Unknown fallback shown | Pass |
| T07 | `\"\"` | Unknown fallback | Unknown fallback shown | Pass |
| T08 | `\"  sunny  \"` via shell | Normalize if raw spaces passed | Shell passed quoted token, fallback used | Pass |

Notes:
- T08 depends on shell argument parsing behavior in this environment.
