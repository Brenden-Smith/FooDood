import requests
from bs4 import BeautifulSoup
import functions_framework
from flask import abort

@functions_framework.http
def scrapeMenu(request):
  """Scrapes menu items from a restaurant's Yelp page.
  Args:
      request (flask.Request): The request object.
          <http://flask.pocoo.org/docs/1.0/api/#flask.Request>
  Returns:
      The menu items as a JSON array.
  """

  # Get URL parameter
  url = request.args.get('url')
  if url is None:
    url = request.get_json().get('url')
  if url is None:
    return abort(400, 'Missing URL parameter')
  
  # Setup request headers
  headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  }
  response = requests.get(url, headers=headers)

  # Parse HTML
  soup = BeautifulSoup(response.content, 'html.parser')

  # Get menu items
  items = []
  for item in soup.select('div.menu-item'):
      
      # Get name
      name_element = item.select_one('div.menu-item-details h4')
      if name_element is not None:
          name = name_element.text.strip().replace('/', '-')
      else:
          continue

      # Get description
      description_element = item.select_one('p.menu-item-details-description')
      if description_element is not None:
          description = description_element.text.strip()
      else:
          continue

      # Get image
      image_element = item.select_one('img.photo-box-img')
      if image_element is not None and image_element['src'] != 'https://s3-media0.fl.yelpcdn.com/assets/2/www/img/dca54f97fb84/default_avatars/menu_medium_square.png':
          image_url = image_element['src'].replace("60s.jpg", "o.jpg")
      else:
          continue

      # Get price
      price_element = item.select_one('li.menu-item-price-amount')
      if price_element is not None:
          price = price_element.text.strip()
      else:
          continue

      # Add item to list
      items.append({
          'name': name,
          'description': description,
          'image_url': image_url,
          'price': price
      })

  # Return items
  return items