#!/bin/bash

TARGET_DIR="$1"

if [ -z "$TARGET_DIR" ]; then
  echo "Usage: bash compress-inplace.sh target_folder"
  exit 1
fi

echo "🔍 Optimizing files in: $TARGET_DIR"

find "$TARGET_DIR" -type f -print0 | while IFS= read -r -d '' file; do
  ext="${file##*.}"
  base="${file%.*}"

  case "${ext,,}" in
    jpg|jpeg|png)
      echo "🖼️  $file"
      tmp="${base}.tmp.${ext}"

      convert "$file" \
        -resize 2000x2000\> \
        -strip \
        -quality 82 \
        "$tmp" && mv -f "$tmp" "$file"
      ;;
    mp4|mov|mkv)
      echo "🎥  $file"
      tmp="${base}.tmp.mp4"

      ffmpeg -y -i "$file" \
        -c:v libx264 \
        -crf 24 \
        -preset slow \
        -pix_fmt yuv420p \
        -movflags +faststart \
        -f mp4 \
        "$tmp" && mv -f "$tmp" "$file"
      ;;
  esac
done

echo "✅ Done. Files optimized in-place."
