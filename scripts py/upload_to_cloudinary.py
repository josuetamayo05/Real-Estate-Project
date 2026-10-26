import os
import re
import urllib.request
import json
import time

# Tus datos reales de Cloudinary
CLOUD_NAME = "fscqxubu"
UPLOAD_PRESET = "marianne_houses"

MOCK_FILE_PATH = "src/data/mockProperties.ts"

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
        print(f" ❌ Error en conexión (¿VPN activa?): {e}")
        return None

def main():
    print(f" 🚀 Iniciando subida a Cloudinary ({CLOUD_NAME})...")
    print(" 💡 Si se corta la luz o el internet, simplemente vuelve a ejecutar este script.")

    if not os.path.exists(MOCK_FILE_PATH):
        print(f" ❌ No se encontró el archivo {MOCK_FILE_PATH}")
        return

    with open(MOCK_FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Buscamos solo rutas locales que NO hayan sido subidas aún (que empiecen por /properties/)
    local_paths = list(set(re.findall(r"'/properties/[^']+'", content)))
    
    total = len(local_paths)
    if total == 0:
        print(" ✅ ¡Todas las imágenes ya son URLs de Cloudinary!")
        return

    print(f" 📦 Quedan {total} imágenes por subir.")

    for idx, path_str in enumerate(local_paths, 1):
        clean_path = path_str.strip("'")
        full_local_path = os.path.join("public", clean_path.lstrip("/"))
        
        if os.path.exists(full_local_path):
            folder = os.path.dirname(clean_path).lstrip("/")
            print(f" ☁️  [{idx}/{total}] Subiendo: {clean_path}...", end=" ", flush=True)
            
            cloud_url = upload_image(full_local_path, folder)
            
            if cloud_url:
                # Reemplazamos inmediatamente en el archivo para no perder progreso
                with open(MOCK_FILE_PATH, "r", encoding="utf-8") as f:
                    current_content = f.read()
                
                new_content = current_content.replace(f"'{clean_path}'", f"'{cloud_url}'")
                
                with open(MOCK_FILE_PATH, "w", encoding="utf-8") as f:
                    f.write(new_content)
                
                print("✅")
                time.sleep(1) # Pequeña pausa para no saturar la subida
            else:
                print("⏭️  Saltado (error).")
        else:
            print(f" 🔍 No encontrado localmente: {full_local_path}")

    print("\n ✨ ¡Terminado! Revisa tu archivo mockProperties.ts")

if __name__ == "__main__":
    main()