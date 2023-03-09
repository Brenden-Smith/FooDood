# Dependencies: pip install requests, pip install beautifulsoup4

import requests
from bs4 import BeautifulSoup
import csv

url = 'https://www.yelp.com/menu/nexx-burger-downey-2'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}
response = requests.get(url, headers=headers)

soup = BeautifulSoup(response.content, 'html.parser')

menu_items = soup.select('div.menu-item')
with open('menu_items.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Name', 'Description', 'Image URL', 'Price'])

    for item in menu_items:
        name_element = item.select_one('div.menu-item-details h4')
        if name_element is not None:
            name = name_element.text.strip().replace('/', '-')
        else:
            name = ""
        print(f"Name: {name}")

        description_element = item.select_one('p.menu-item-details-description')
        if description_element is not None:
            description = description_element.text.strip()
        else:
            description = ""
        print(f"Description: {description}")

        image_element = item.select_one('img.photo-box-img')
        if image_element is not None and image_element['src'] != 'https://s3-media0.fl.yelpcdn.com/assets/2/www/img/dca54f97fb84/default_avatars/menu_medium_square.png':
            image_url = image_element['src'].replace("60s.jpg", "o.jpg")
            print(f"Image URL: {image_url}")
        else:
            image_url = ""
            print("No image URL found")

        price_element = item.select_one('li.menu-item-price-amount')
        if price_element is not None:
            price = price_element.text.strip()
        else:
            price = ""
        print(f"Price: {price}")

        writer.writerow([name, description, image_url, price])