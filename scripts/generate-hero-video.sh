#!/usr/bin/env bash
# Optional: build a looping MP4 from the hero PNGs (requires ffmpeg on PATH).
# Usage: ./scripts/generate-hero-video.sh
# Output: public/videos/projects-portfolios-hero.mp4
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/public/videos"
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
# 5s per slide, 1920x1080 canvas, crossfade would need filter_complex; simple concat:
ffmpeg -y \
  -loop 1 -t 5 -i hero-project-board.png \
  -loop 1 -t 5 -i hero-portfolio-pmo.png \
  -filter_complex "\
[0:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p,fps=30[v0];\
[1:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p,fps=30[v1];\
[v0][v1]concat=n=2:v=1:a=0[outv]" \
  -map "[outv]" -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
  projects-portfolios-hero.mp4
echo "Wrote public/videos/projects-portfolios-hero.mp4"
echo "To use it in the hero, point HeroShowcase at the video or swap the component for a <video> tag."
