# Hero video

**Live.** `HERO_VIDEO_READY` is `true` in `src/components/Hero.astro`.

| File | Codec | Size |
| --- | --- | --- |
| `hero.webm` | VP9 | ~3.0 MB — offered first |
| `hero.mp4` | H.264 High | ~3.6 MB — fallback |

Both are 1920×1080, 24fps, 9.1s, silent. The poster
(`src/assets/photos/hero-poster.jpg`) is the video's first frame, so the
handoff from poster to video is invisible.

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

## Where it plays

Sources are attached by script only when the viewport is 768px or wider and
the visitor has not asked for reduced motion. Phones and reduced-motion
visitors get the poster and never download the video. To let it play on
phones too, drop the width check in `Hero.astro`.

The dark grade and orange tint are CSS layers above the video, so a new clip
inherits the same treatment with no re-grading. Measured across the current
clip, text over it holds at least 7.4:1 contrast.
