import os
import re
import sys
import urllib.request
import json
import time

# 📍 1. Calculamos automáticamente la carpeta principal del proyecto ('marianne-houses')
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR) if os.path.basename(SCRIPT_DIR) == "scripts_py" else SCRIPT_DIR

MOCK_FILE_PATH = os.path.join(PROJECT_ROOT, "src", "data", "mockProperties.ts")
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")

# Datos de Cloudinary
CLOUD_NAME = "fscqxubu"
UPLOAD_PRESET = "marianne_houses"

def upload_image(file_path, folder_name):
    url = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload"
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    
    try:
        with open(file_path, "rb") as f:
            file_bytes = f.read()
            
        filename = os.path.basename(file_path)
        body = bytearray()
        body.extend(f"--{boundary}\r\n".encode())
        body.extend(f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode())
        body.extend(b"Content-Type: image/jpeg\r\n\r\n")
        body.extend(file_bytes)
        body.extend(b"\r\n")
        body.extend(f"--{boundary}\r\n".encode())
        body.extend(f'Content-Disposition: form-data; name="upload_preset"\r\n\r\n{UPLOAD_PRESET}\r\n'.encode())
        body.extend(f"--{boundary}\r\n".encode())
        body.extend(f'Content-Disposition: form-data; name="folder"\r\n\r\n{folder_name}\r\n'.encode())
        body.extend(f"--{boundary}--\r\n".encode())
        
        req = urllib.request.Request(url, data=bytes(body), headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}"
        })
        
        with urllib.request.urlopen(req, timeout=60) as response:
            res_data = json.loads(response.read().decode())
            return res_data.get("secure_url")
    except Exception as e:
        print(f" ❌ Error en subida: {e}")
        return None

def main():
    target_house = sys.argv[1].lower() if len(sys.argv) > 1 else None

    if not os.path.exists(MOCK_FILE_PATH):
        print(f" ❌ No se encontró el archivo: {MOCK_FILE_PATH}")
        return

    with open(MOCK_FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    if target_house:
        pattern = rf"'/properties/{target_house}/[^']+'"
        print(f" 🎯 Procesando únicamente '{target_house}'...")
    else:
        pattern = r"'/properties/[^']+'"
        print(" 🔍 Buscando rutas locales no subidas...")

    local_paths = list(set(re.findall(pattern, content)))
    
    total = len(local_paths)
    if total == 0:
        print(" ✅ ¡No hay imágenes locales pendientes por subir!")
        return

    print(f" 📦 Se encontraron {total} imágenes locales para subir.")

    for idx, path_str in enumerate(local_paths, 1):
        clean_path = path_str.strip("'") # ej. /properties/casa-7/first.jpg
        relative_file_path = clean_path.lstrip("/") # ej. properties/casa-7/first.jpg
        
        full_local_path = os.path.join(PUBLIC_DIR, relative_file_path)
        
        if os.path.exists(full_local_path):
            folder = os.path.dirname(clean_path).lstrip("/")
            print(f" ☁️  [{idx}/{total}] Subiendo: {clean_path}...", end=" ", flush=True)
            
            cloud_url = upload_image(full_local_path, folder)
            
            if cloud_url:
                with open(MOCK_FILE_PATH, "r", encoding="utf-8") as f:
                    current_content = f.read()
                
                new_content = current_content.replace(f"'{clean_path}'", f"'{cloud_url}'")
                
                with open(MOCK_FILE_PATH, "w", encoding="utf-8") as f:
                    f.write(new_content)
                
                print("✅ OK")
                time.sleep(0.5)
            else:
                print("⏭️  Error en Cloudinary.")
        else:
            print(f"\n 🔍 No encontrado en: {full_local_path}")

    print("\n ✨ ¡Proceso completado con éxito!")

if __name__ == "__main__":
    main()