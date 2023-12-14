import requests
import shutil

url = "https://dog.ceo/api/breeds/image/random"

for i in range(16):
    response = requests.get(url)
    data = response.json()
    image_url = data['message']

    response = requests.get(image_url, stream=True)
    file_name = f"dog{i}.jpg"
    with open(file_name, 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    del response
