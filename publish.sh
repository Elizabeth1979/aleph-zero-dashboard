#!/bin/bash
set -e
cd ~/aleph-zero-dashboard
bash refresh.sh
git add data.js
git commit -m "dashboard: auto-update $(date +%Y-%m-%d)" || true
git push
