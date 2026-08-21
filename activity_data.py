#!/usr/bin/env python3
"""Generate activity data JSON for the Hermes dashboard."""
import json, os, glob, re, sys

hermes = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/.hermes")
events = []

def clean_chat_desc(d):
    d = str(d)
    d = re.sub(r'\s*/\s*topic\s+\d+\s*$', '', d).strip()
    parts = [p.strip() for p in d.split(' / ')]
    if parts and re.search(r"'s\s+server$", parts[0], re.IGNORECASE):
        parts = parts[1:]
    d = parts[-1] if parts else d
    d = d.rstrip('.')
    return d[:40] if len(d) <= 40 else d[:37] + '...'

# Sessions
sess_file = os.path.join(hermes, 'sessions/sessions.json')
if os.path.exists(sess_file):
    try:
        with open(sess_file) as f:
            sessions = json.load(f)
        for key, s in sessions.items():
            ts = s.get('updated_at') or s.get('created_at') or ''
            if not ts:
                continue
            origin = s.get('origin') or {}
            raw_desc = (
                s.get('display_name') or
                origin.get('chat_topic') or
                origin.get('chat_name') or
                key
            )
            desc = clean_chat_desc(raw_desc)
            channel = origin.get('chat_name') or s.get('platform') or 'unknown'
            events.append({
                'timestamp': ts,
                'type': 'chat',
                'description': desc,
                'channel': str(channel)
            })
    except Exception:
        pass

# Cron outputs
jobs_file = os.path.join(hermes, 'cron/jobs.json')
job_names = {}
if os.path.exists(jobs_file):
    try:
        with open(jobs_file) as f:
            jdata = json.load(f)
        jobs_list = jdata.get('jobs', jdata) if isinstance(jdata, dict) else jdata
        for j in jobs_list:
            jid = j.get('job_id') or j.get('id') or ''
            if jid:
                job_names[jid] = j.get('name') or j.get('job_id') or jid
    except Exception:
        pass

output_base = os.path.join(hermes, 'cron/output')
if os.path.isdir(output_base):
    for job_id in os.listdir(output_base):
        job_dir = os.path.join(output_base, job_id)
        if not os.path.isdir(job_dir):
            continue
        md_files = sorted(glob.glob(os.path.join(job_dir, '*.md')), reverse=True)
        for md in md_files[:3]:
            fname = os.path.basename(md)
            try:
                parts = fname.replace('.md','').split('_')
                date_part = parts[0]
                time_part = parts[1].replace('-',':')
                ts = date_part + 'T' + time_part
            except Exception:
                ts = fname.replace('.md','')
            name = job_names.get(job_id, job_id)
            name_str = str(name)
            name_str = name_str[:40] if len(name_str) <= 40 else name_str[:37] + '...'
            events.append({
                'timestamp': ts,
                'type': 'cron',
                'description': name_str,
                'channel': 'automated'
            })

# Sort by timestamp descending, limit 10
events.sort(key=lambda x: x.get('timestamp',''), reverse=True)
events = events[:10]
print(json.dumps(events))
