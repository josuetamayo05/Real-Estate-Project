import os
import json
import re

def structure():
    properties_dir = "public/properties"
    
    if not os.path.exists(properties_dir):
        print(f"❌ Error: La ruta '{properties_dir}' no existe.")
        return

    # Obtener todas las carpetas tipo casa-X existentes
    all_dirs = [
        f for f in os.listdir(properties_dir) 
        if f.startswith("casa-") and os.path.isdir(os.path.join(properties_dir, f))
    ]
    
    if not all_dirs:
        print("❌ No se encontraron carpetas con la estructura 'casa-X' en public/properties/.")
        return

    exist_numbers = []
    for c in all_dirs:
        match = re.search(r'casa-(\d+)', c)
        if match:
            exist_numbers.append(int(match.group(1)))
    
    exist_numbers.sort()
    min_casa = min(exist_numbers)
    max_casa = max(exist_numbers)

    print("\n" + "=" * 60)
    print(f"🏠 GENERADOR DE CATÁLOGO A JSON")
    print(f"📌 Casas detectadas: casa-{min_casa} hasta casa-{max_casa}")
    print("=" * 60)

    print("\nOpciones de rango:")
    print("  • Presiona [Enter] para procesar TODAS las casas.")
    print("  • Ingresa un rango (Ejemplo: 7-12).")
    print("  • Ingresa una casa específica (Ejemplo: 10).")
    
    entrada = input("\n👉 Ingresa el rango o presiona Enter: ").strip()

    casas_a_procesar = []

    if not entrada:
        casas_a_procesar = [f"casa-{num}" for num in exist_numbers]
    elif "-" in entrada:
        try:
            inicio, fin = map(int, entrada.split("-"))
            casas_a_procesar = [f"casa-{num}" for num in range(inicio, fin + 1)]
        except ValueError:
            print("❌ Formato de rango inválido. Usa el formato 'inicio-fin' (ej: 7-12).")
            return
    else:
        try:
            num = int(entrada)
            casas_a_procesar = [f"casa-{num}"]
        except ValueError:
            print("❌ Número de casa inválido.")
            return

    catalogo_lista = []
    procesadas_count = 0

    for carpeta in casas_a_procesar:
        folder_path = os.path.join(properties_dir, carpeta)
        
        if not os.path.exists(folder_path):
            print(f"⚠️ La carpeta '{carpeta}' no existe. Se omite.")
            continue

        procesadas_count += 1
        
        # 1. Leer description.txt
        desc_path = os.path.join(folder_path, "description.txt")
        descripcion = "Sin descripción proporcionada."
        if os.path.exists(desc_path):
            with open(desc_path, "r", encoding="utf-8") as f:
                descripcion = f.read().strip()

        # 2. Obtener imágenes .jpg (first.jpg primero si existe)
        imagenes = sorted([img for img in os.listdir(folder_path) if img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
        if "first.jpg" in imagenes:
            imagenes.remove("first.jpg")
            imagenes.insert(0, "first.jpg")

        rutas_imagenes = [f"/properties/{carpeta}/{img}" for img in imagenes]

        # 3. Crear estructura de objeto compatible con tu TypeScript
        propiedad_obj = {
            "id": carpeta,
            "title": f"Residencia Exclusiva en {carpeta.capitalize()}", # Título por defecto que puedes editar
            "slug": f"residencia-exclusiva-{carpeta}",
            "operation": "Venta",
            "zone": "Kohly/Siboney",
            "address": "La Habana, Cuba",
            "price": 500000,
            "hidePrice": False,
            "currency": "USD",
            "bedrooms": 4,
            "bathrooms": 4,
            "area": 450,
            "parking": 2,
            "propertyType": "Casa",
            "description": descripcion,
            "features": ["Piscina", "Jardín", "Garaje"],
            "images": rutas_imagenes,
            "featured": True,
            "sold": False,
            "whatsapp": "5352365254"
        }
        
        catalogo_lista.append(propiedad_obj)

    # Guardar todo en un archivo JSON en la raíz del proyecto
    output_filename = "catalogo_generado.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(catalogo_lista, f, indent=2, ensure_ascii=False)

    print(f"\n✅ ¡Listo! Se ha creado el archivo '{output_filename}' con {procesadas_count} propiedad(es).")
    print(f"📁 Puedes abrirlo directamente en VS Code para revisarlo o enviárselo a la IA.")

if __name__ == "__main__":
    structure()