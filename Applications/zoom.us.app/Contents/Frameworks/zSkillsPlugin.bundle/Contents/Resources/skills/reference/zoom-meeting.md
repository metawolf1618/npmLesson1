# Reference: zoom-meeting (`meeting-service`)

Applies when `--service meeting-service`. **Parameter tables, example payloads, and response shapes** for each action live here; the service-level [SKILL.md](../zoom-meeting/SKILL.md) only summarizes when to use each action and points here.

Other DSDK services: add `reference/<service-slug>.md` and `../<service-slug>/SKILL.md` in the same pattern.

---

## start-meeting-now

Start a meeting immediately via the native client.

**Flags**

| Flag | Value |
|------|--------|
| `--service` | `meeting-service` |
| `--actionId` | `start-meeting-now` |

**`--data` JSON fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `isVideoOn` | boolean | Yes | `true` to start with video on, `false` for audio-only |

**Examples**

Start with video:

```bash
zoom-client-cli --service meeting-service --actionId start-meeting-now --data '{"isVideoOn": true}'
```

Audio-only:

```bash
zoom-client-cli --service meeting-service --actionId start-meeting-now --data '{"isVideoOn": false}'
```

**Successful response (stdout, exit 0)**

```json
{
  "executeId": "guid-xxx-xxx",
  "serviceId": "meeting-service",
  "actionId": "start-meeting-now",
  "success": true,
  "data": {
    "meetingId": "123456789",
    "joinUrl": "https://zoom.us/j/123456789",
    "message": "Meeting started successfully"
  }
}
```

**Service error (example)**

```json
{
  "executeId": "guid-xxx",
  "serviceId": "meeting-service",
  "actionId": "start-meeting-now",
  "success": false,
  "error": {
    "code": 6,
    "message": "NoPermission"
  }
}
```

**Typical causes:** permission denied, meeting service disabled, or other meeting-layer failures. Treat `success: false` and the `error` object as the source of truth for this action.
