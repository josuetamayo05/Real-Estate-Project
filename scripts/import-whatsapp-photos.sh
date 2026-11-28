#!/bin/bash
# Mueve las fotos de una casa desde ~/Downloads a public/properties/<casa-X>/
# Uso: scripts/import-whatsapp-photos.sh casa-16 [AAAA-MM-DD]
#
# Reconoce dos formas en que WhatsApp guarda las fotos:
#   1) Nombres numéricos (572.jpg, 573.jpg...) descargados en las últimas 48 h -> orden numérico.
#   2) "WhatsApp Image AAAA-MM-DD at HH.MM.SS.jpeg" -> las del día más reciente (o la fecha indicada).
# Si hay un first.jpg en Descargas, esa es la portada; si no, la primera foto.
# Al final reduce todas a máx. 2000 px (la web muestra máx. 1600) para que suban rápido a Cloudinary.
set -euo pipefail

CASA="${1:?Uso: $0 casa-X [AAAA-MM-DD]}"
SRC="$HOME/Downloads"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/properties/$CASA"

if [ -d "$DEST" ] && [ -n "$(ls -A "$DEST" 2>/dev/null)" ]; then
  echo "❌ $DEST ya existe y tiene archivos. No sobrescribo nada."; exit 1
fi

FOTOS=()
ORIGEN=""

# 1) Nombres numéricos recientes (solo si no se pidió una fecha concreta)
if [ -z "${2:-}" ]; then
  while IFS= read -r f; do FOTOS+=("$f"); done < <(
    find "$SRC" -maxdepth 1 -type f -mtime -2 -exec basename {} \; 2>/dev/null \
      | grep -iE '^[0-9]+\.(jpe?g|png|heic)$' | sort -n
  )
  [ ${#FOTOS[@]} -gt 0 ] && ORIGEN="con nombre numérico (últimas 48 h)"
fi

# 2) "WhatsApp Image ..." del día indicado o del más reciente
if [ ${#FOTOS[@]} -eq 0 ]; then
  FECHA="${2:-$(ls "$SRC" | grep -E '^WhatsApp Image [0-9]{4}-[0-9]{2}-[0-9]{2}' | sed -E 's/^WhatsApp Image ([0-9-]{10}).*/\1/' | sort | tail -1)}"
  if [ -n "$FECHA" ]; then
    while IFS= read -r f; do FOTOS+=("$f"); done < <(
      ls "$SRC" | grep -E "^WhatsApp Image $FECHA at .*\.(jpe?g|png|heic)$" | sort -V
    )
    ORIGEN="de WhatsApp del $FECHA"
  fi
fi

[ ${#FOTOS[@]} -eq 0 ] && { echo "❌ No encontré fotos de la casa en Descargas"; exit 1; }
mkdir -p "$DEST"

i=1
for p in first.jpg first.jpeg first.JPG first.JPEG; do
  if [ -f "$SRC/$p" ]; then
    mv "$SRC/$p" "$DEST/first.jpg"
    echo "📌 Portada: la foto que renombraste como $p"
    i=2
    break
  fi
done

for f in "${FOTOS[@]}"; do
  ext="$(echo "${f##*.}" | tr 'A-Z' 'a-z')"
  if [ "$i" -eq 1 ]; then name="first"; else name="$(printf 'foto-%02d' "$i")"; fi
  if [ "$ext" = "heic" ]; then
    sips -s format jpeg "$SRC/$f" --out "$DEST/$name.jpg" >/dev/null && rm "$SRC/$f"
  else
    mv "$SRC/$f" "$DEST/$name.jpg"
  fi
  i=$((i + 1))
done

# Reducir tamaño para que la subida a Cloudinary no se corte
for f in "$DEST"/*.jpg; do
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$f" | awk '/pixelHeight/{print $2}')
  if [ "$w" -gt 2000 ] || [ "$h" -gt 2000 ]; then
    sips -Z 2000 -s formatOptions 80 "$f" >/dev/null
  fi
done

echo "✅ $((i - 1)) fotos $ORIGEN movidas a public/properties/$CASA ($(du -sh "$DEST" | cut -f1), portada: first.jpg)"
