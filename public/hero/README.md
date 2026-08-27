# Hero video

**Live.** `HERO_VIDEO_READY` is `true` in `src/components/Hero.astro`.

| File | Codec | Size | Served to |
| --- | --- | --- | --- |
| `hero.webm` | VP9 | ~3.0 MB | 768px and wider, offered first |
| `hero.mp4` | H.264 High | ~3.6 MB | 768px and wider, fallback |
| `hero-720.webm` | VP9 | ~1.2 MB | under 768px, offered first |
| `hero-720.mp4` | H.264 High | ~1.5 MB | under 768px, fallback |

24fps, 9.1s, silent. The full pair is 1920×1080; the phone pair is 1280×720,
which still oversamples a handset once the frame is cropped to portrait. The
poster (`src/assets/photos/hero-poster.jpg`) is the video's first frame, so
the handoff from poster to video is invisible.

## Replacing the video

Encode from your master with ffmpeg:

```bash
ffmpeg -i master.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 28 -preset slow -movflags +faststart -an hero.mp4
```

```bash
ffmpeg -i master.mp4 -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p -an hero.webm
```

Then refresh the poster from the new first frame:

```bash
ffmpeg -i master.mp4 -vf "select=eq(n\,0)" -frames:v 1 -q:v 2 ../../src/assets/photos/hero-poster.jpg
```

**Do not ship H.265/HEVC.** The original master was HEVC, which Safari plays
but Chrome and Firefox largely do not — most visitors would have seen the
poster and no video. H.264 plus VP9 covers everything.

Keep each file under ~6 MB, make the last frame match the first so the loop is
seamless, and keep the subject in the upper two-thirds: the lower half sits
under the scrim and the headline.

Also re-encode the phone pair when you replace it, adding `-vf "scale=1280:720"`
and using `-crf 30` for H.264 and `-crf 46` for VP9.

## Where it plays

Everywhere, on phones included. Sources are attached by script, which picks
the 720p pair under 768px and the full pair above it.

The one case that still falls back to the poster is `prefers-reduced-motion`.
That is deliberate: it is an accessibility setting, and a looping background
video is exactly what it asks us to suppress. iOS Low Power Mode also blocks
autoplay on its own, and the poster covers that too.

The dark grade and orange tint are CSS layers above the video, so a new clip
inherits the same treatment with no re-grading. Measured across the current
clip, text over it holds at least 7.4:1 contrast on desktop and 5.9:1 on a
375px phone, against a 4.5:1 requirement.
