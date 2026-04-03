#!/bin/bash
# Update dashboard after tasks.json change
cd ~/.hermes/dashboard
bash refresh.sh
git add -A && git commit -m "Update tasks" && git push 2>&1 | cat
