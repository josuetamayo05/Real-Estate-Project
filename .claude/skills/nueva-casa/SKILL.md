---
name: nueva-casa
description: Agrega una nueva propiedad (casa-X) al catálogo de Marianne Houses a partir de una descripción en español; inserta el objeto en mockProperties.ts, sube las fotos a Cloudinary, verifica el build y hace commit + push. Usar cuando el usuario pasa la descripción de una casa y el número de carpeta.
argument-hint: casa-X  (y pega la descripción de la casa)
---

# Nueva propiedad: $ARGUMENTS

Ejecuta TODO el flujo sin pedir permiso en cada paso. Solo detente si algo falla.

## 0. Número de casa
Si el usuario no da el número (o dice que no lo recuerda), usa el siguiente al último `id: 'casa-N'` de mockProperties.ts.

## 1. Analizar el texto
De la descripción en español extrae:
- `price` como número ("160 mil" → 160000, "1.2 millones" → 1200000). Si no hay precio → 0.
- `bedrooms`, `bathrooms`, `parking` (garaje), `area` en m² (si no aparece, estímalo razonablemente y avísalo al final), `zone`.
- `operation`: 'Venta' o 'Renta'. `propertyType`: 'Casa' | 'Apartamento' | 'Villa' | 'Mansión' | 'Penthouse'.

## 2. Crear el objeto
- `title` atractivo con la zona; `slug` en kebab-case, sin acentos, único (compara con los slugs existentes).
- `description`: profesional y fluida en español, sin inventar datos.
- `features`: mínimo 6 puntos clave en Title Case.

## 3. Fotos y carpeta
Si `public/properties/casa-X/` NO existe o está vacía, importa las fotos de WhatsApp desde Descargas:
`scripts/import-whatsapp-photos.sh casa-X` (o `scripts/import-whatsapp-photos.sh casa-X AAAA-MM-DD` si el usuario indica una fecha). Reconoce fotos con nombre numérico (572.jpg...) descargadas en las últimas 48 h, o si no hay, las "WhatsApp Image ..." del día más reciente. También las reduce a máx. 2000 px (la conexión del usuario sube a ~70 KB/s; fotos de 5 MB hacen que Cloudinary corte por timeout). Antes de mover, si no es obvio que todas son de la casa, revisa una hoja de contactos de las fotos. Si el usuario renombró una foto como `first.jpg` en Descargas, esa es la portada; si no, la primera enviada queda como first.jpg. Si el usuario dice que la portada es otra foto (ej. "la portada es la 3"), intercambia los nombres first.jpg ↔ foto-03.jpg.
Si el script falla, detente y muestra el mensaje.

Luego lista `public/properties/casa-X/`. `images` empieza SIEMPRE con '/properties/casa-X/first.jpg' y luego el resto de imágenes (sin duplicar first.jpg). Si la carpeta no existe o no tiene first.jpg, detente y avisa.

## 4. Editar el código
INSERTA el objeto al FINAL del array `mockProperties` en `src/data/mockProperties.ts`, copiando el formato de la última entrada. NO modifiques ninguna otra entrada del archivo.
Reglas estrictas:
- Solo comillas simples ('').
- `id: 'casa-X'`, `address: '<Zona>, La Habana'`
- `currency: 'USD'`
- `hidePrice: false` salvo que `price` sea 0 (entonces `true`).
- `featured: false`, `sold: false`, `whatsapp: '5352365254'`

## 5. Cloudinary
`python3 scripts_py/upload_to_cloudinary.py casa-X`
Si sale con error (código ≠ 0), vuelve a ejecutarlo una vez. Luego verifica con grep que NO quede ninguna ruta `'/properties/casa-X/` en mockProperties.ts. Si queda, detente y avisa.

## 6. Verificar el build
`npm run build` (también regenera `public/sitemap.xml` con la nueva casa). Si falla, NO hagas push: muestra el error y corrígelo solo si está en el objeto que agregaste.

## 7. Commit y push
```
git add .
git commit -m "Agregar casa-X en <Zona>"
git push
```

## Al final
Resume en 3-4 líneas: título, precio, zona, nº de fotos y el link `https://www.mariannehouses.com/propiedad/<slug>`.
