#!/bin/bash
set -e
# Publish Hermes Dashboard after ANY dashboard data/code change.
# This is the canonical script to make changes visible online right away.
cd ~/.hermes/dashboard
python3 validate_dashboard.py
bash refresh.sh
python3 validate_dashboard.py
git add -A
git commit -m "update dashboard" || true
git push
