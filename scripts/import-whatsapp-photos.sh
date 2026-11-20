#!/bin/bash
# Mueve las fotos de WhatsApp de ~/Downloads a public/properties/<casa-X>/
# Uso: scripts/import-whatsapp-photos.sh casa-16 [AAAA-MM-DD]
#   - Sin fecha: usa las fotos del día más reciente que haya en Descargas.
#   - La foto enviada primero queda como first.jpg (portada); el resto foto-02.jpg, foto-03.jpg...
set -euo pipefail

CASA="${1:?Uso: $0 casa-X [AAAA-MM-DD]}"
SRC="$HOME/Downloads"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/properties/$CASA"

FECHA="${2:-$(ls "$SRC" | grep -E '^WhatsApp Image [0-9]{4}-[0-9]{2}-[0-9]{2}' | sed -E 's/^WhatsApp Image ([0-9-]{10}).*/\1/' | sort | tail -1)}"
[ -z "$FECHA" ] && { echo "❌ No hay fotos 'WhatsApp Image ...' en Descargas"; exit 1; }

# Orden cronológico: el nombre ya trae fecha y hora ("at 09.14.58", "(1)", "(2)"...)
FOTOS=()
while IFS= read -r f; do FOTOS+=("$f"); done < <(
  ls "$SRC" | grep -E "^WhatsApp Image $FECHA at .*\.(jpe?g|png|heic)$" | sort -V
)
[ ${#FOTOS[@]} -eq 0 ] && { echo "❌ No hay fotos de WhatsApp del $FECHA en Descargas"; exit 1; }

if [ -d "$DEST" ] && [ -n "$(ls -A "$DEST" 2>/dev/null)" ]; then
  echo "❌ $DEST ya existe y tiene archivos. No sobrescribo nada."; exit 1
fi
mkdir -p "$DEST"

i=1
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

echo "✅ ${#FOTOS[@]} fotos del $FECHA movidas a public/properties/$CASA (portada: first.jpg)"
