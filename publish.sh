#!/bin/bash
set -e
# Publish Hermes Dashboard after ANY dashboard data/code change.
# This is the canonical script to make changes visible online right away.
cd ~/.hermes/dashboard
bash refresh.sh
git add -A
git commit -m "update dashboard" || true
git push
