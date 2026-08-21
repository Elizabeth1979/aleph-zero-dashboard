#!/bin/bash
# Update dashboard after tasks.json change
# Canonical rule: publish immediately so changes appear online.
bash ~/.hermes/dashboard/publish.sh 2>&1 | cat
