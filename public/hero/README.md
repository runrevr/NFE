# Hero video drop-in slot

The homepage hero is already built to play a looping video. Until the files
below exist it renders the poster photo, which is also the permanent fallback
for mobile, reduced-motion, and autoplay-blocked visitors.

## What to drop here

| File | Format | Notes |
| --- | --- | --- |
| `hero.mp4` | H.264 (or H.265) | Primary source. Widest compatibility. |
| `hero.webm` | VP9 / AV1 | Served first when the browser supports it. |

## Spec

- **Length:** 12–18 seconds, seamless loop (last frame matches first).
- **Resolution:** 1920×1080, 24–30 fps.
- **Size:** under ~6 MB per file. This is the largest asset on the page.
- **Audio:** none. The element is muted and autoplays.
- **Framing:** the bottom third sits under a dark gradient and the headline —
  keep the subject in the upper two-thirds.

## Turning it on

1. Copy `hero.mp4` and `hero.webm` into this folder.
2. In `src/components/Hero.astro`, set `HERO_VIDEO_READY = true`.
3. Optionally replace `src/assets/photos/hero-poster.jpg` with the video's
   first frame so the fade from poster to video is invisible.

The dark grade and orange tint are CSS layers over the top, so the video
inherits exactly the same treatment as the poster — no re-grading needed.
