# System Settings Reference

## Power Management (set 2026-04-03)

### Why
Keep Discord bot gateway running 24/7 when plugged in, save battery when unplugged.

### Terminal Settings (pmset)

**Plugged in (AC):**
```
sleep 0          # never sleep
displaysleep 0   # display never sleeps
disksleep 0      # disk never sleeps
standby 0        # no standby
autopoweroff 0   # no auto power off
networkoversleep 1  # keep network alive
tcpkeepalive 1   # keep TCP connections
powernap 1       # background tasks run
```

**On battery:**
```
sleep 15         # sleep after 15 min
displaysleep 5   # display off after 5 min
disksleep 10     # disk sleep after 10 min
standby 1        # standby enabled
```

**To re-apply these settings:**
```bash
sudo pmset -c sleep 0 displaysleep 0 disksleep 0 standby 0 autopoweroff 0 networkoversleep 1 tcpkeepalive 1 powernap 1
sudo pmset -b sleep 15 displaysleep 5 disksleep 10 standby 1
```

### macOS GUI Settings (System Settings > Battery > Options)
- Slightly dim display on battery: ON
- Prevent automatic sleeping on power adapter: ON
- Wake for network access: ON (Only on Power Adapter)
- Optimize video streaming on battery: OFF

### Important Notes
- Closing the lid ALWAYS sleeps the Mac (Apple hardware, can't override)
- Keep lid open + plugged in for 24/7 bot uptime
- Battery has Optimized Charging built-in on newer macOS
- MacBook Pro, 9 cycles, battery health: Normal (as of 2026-04-03)

## Gateway Auto-Restart (launchd)

File: `~/Library/LaunchAgents/ai.hermes.gateway.plist`
- `KeepAlive: true` — macOS auto-restarts if it crashes
- `ThrottleInterval: 10` — waits 10 sec before restart
- Bot sets presence to "Online" on connect

## Shell Aliases (~/.zshrc)
- `dashboard` — refresh + open Hermes dashboard
- `gw` — check if gateway is running or dead
