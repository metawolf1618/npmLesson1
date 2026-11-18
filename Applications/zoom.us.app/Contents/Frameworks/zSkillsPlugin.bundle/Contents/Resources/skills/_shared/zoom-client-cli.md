# zoom-client-cli (shared)

Use this document for **any** skill that drives the native Zoom desktop client through the Synora worker. Each **service** has a **`skills/<service>/SKILL.md`** (actions summarized there). **Action parameters, examples, and responses** live in **`reference/<service>.md`** (for example `reference/zoom-meeting.md`).

## How it works

```
Agent (shell_exec) → zoom-client-cli command
    → Worker intercepts → ZMCExecutor → HostClient IPC → Zoom Client
    → ServiceHub → <service> → action
    → Response flows back as shell stdout
```

## Prerequisites

- Zoom desktop client must be running with DSDK support
- Session must be in Desktop App host mode (not browser/E2B)
- IPC connection between the worker and Zoom client must be established

## Command format

All Zoom client commands use this CLI shape:

```bash
zoom-client-cli --service <service-name> --actionId <action-id> --data '<json>'
```

| Flag | Type | Description |
|------|------|-------------|
| `--service` | string | DSDK service id (see the service `SKILL.md` + `reference/<same-slug>.md`) |
| `--actionId` | string | Action id (details under the matching action in `reference/<slug>.md`) |
| `--data` | string | JSON payload (schema per action in `reference/<slug>.md`) |

The worker parses these flags and forwards a DSDK service-action request to the native Zoom client. Flags may appear in any order.

## Responses and exit codes

- **Success:** exit code `0`, JSON on **stdout** (shape depends on the service and action — see the matching file under `reference/`).
- **Failure:** message on **stderr**, exit code `1` (IPC / client / generic execution errors).

## Error handling (common)

### HostClient not available

**Cause:** The worker has no IPC connection to the native Zoom client host.

**Typical output:** `stderr: "HostClient not available"`, exit code `1`

**What to do:** Run in Desktop App host mode with an active IPC connection to the Zoom client.

### Zoom client not running

**Cause:** The Zoom desktop client is not running or has not finished DSDK/ServiceHub initialization.

**What to do:** Start the Zoom client, wait until it is fully up, then retry.

## Important notes

- `zoom-client-cli` is **not a real binary** — the Synora worker intercepts it. Do not try to install or resolve it on disk.
- The command must be executed via **`shell_exec`**. The worker detects `zoom-client-cli` in the command string and routes it through IPC instead of spawning a subprocess.
- This path works only in **Desktop App host mode** — not in pure browser sessions or E2B sandboxes.
