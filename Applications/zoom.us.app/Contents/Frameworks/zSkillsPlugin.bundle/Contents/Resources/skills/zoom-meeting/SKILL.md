---
name: zoom-meeting
description: Zoom meeting flows via the native desktop client using DSDK `meeting-service` and `zoom-client-cli`. Use when the user wants to start or control meetings from the host app (e.g. start meeting now, join-related actions as they are added). Only available in Desktop App (host) mode with IPC to the Zoom client.
---

# Zoom Meeting (`meeting-service`)

## Overview

This skill covers **`--service meeting-service`**. Commands are sent as `zoom-client-cli` … and handled by the Synora worker → HostClient IPC → ServiceHub → meeting service. Shared transport, prerequisites, and generic errors are documented once in [_shared/zoom-client-cli.md](../_shared/zoom-client-cli.md).

**DSDK service id:** `meeting-service`

## Actions

Each action below states **when to use it** and links to **`reference/zoom-meeting.md`** for full **flags, `--data` JSON schema, examples, and response/error shapes**.

### `start-meeting-now`

- **When to use:** The user wants to **start a meeting immediately** (instant meeting) from the native Zoom client; optional video on/off.
- **Summary:** One-shot service action; worker forwards payload to the meeting service.
- **Parameters, examples, responses:** [reference → `start-meeting-now`](../reference/zoom-meeting.md#start-meeting-now)

(Add new actions as new `### <action-id>` subsections here, and add a matching `## <action-id>` section in [reference/zoom-meeting.md](../reference/zoom-meeting.md).)

## Documentation map

| Document | Purpose |
|----------|---------|
| [zoom-client-cli (shared)](../_shared/zoom-client-cli.md) | CLI shape, prerequisites, stdout/stderr, common IPC/client errors |
| [zoom-meeting reference](../reference/zoom-meeting.md) | Per-action flags, `--data` fields, command examples, success/error JSON |

## Adding another service

1. Create **`skills/<service-folder>/SKILL.md`** (one per service, e.g. `zoom-chat` for a future chat service).
2. Create **`skills/reference/<service-folder>.md`** for action-level parameters and payloads.
3. In that **SKILL.md**, list **Actions** briefly and link to the matching `## <action-id>` section in the reference file (fragment `#<action-id>`).
