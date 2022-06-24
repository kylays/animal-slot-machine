# *Random Animal* API Documentation
*This API provides the common name, genus, some facts, and a picture for some animals.*

## *Animal List*
**Request Format:** /animals

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns an array of strings of common animal names that are in the API.

**Example Request:** 
try {
  let resp = await fetch("/animals");
  resp = checkStatus(resp);
  const data = await resp.json();
  return data;
} catch (err) {
  handleError(err);
}

**Example Response:**
```
['beaver', 'chicken', 'cow', 'gorilla', 'leopard', 'ostrich', 'pig']
```

**Error Handling:**
500 Error: Something went wrong on the server, please try again later.

## *Animal Data*
**Request Format:** /animals/:animal

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns JSON of information about an animal including its genus, common name, a description, and the name of an image file.

**Example Request:** 
try {
  let resp = await fetch("/animals/pig");
  resp = checkStatus(resp);
  const data = await resp.json();
  return data;
} catch (err) {
  handleError(err);
}

**Example Response:**
```
{
  name: 'pig', 
  genus: 'sus\r', 
  description: 'When used as livestock, pigs are farmed primarily ... kept as pets.\r', 
  image: 'pig.jpg\r'
}
```

**Error Handling:**
500 Error: Something went wrong on the server, please try again later.
404 Error: Animal flying-pig not found in the database.

## *All Animals' Data*
**Request Format:** /animals-data

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a JSON with all the data for each animal.

**Example Request:** 
try {
  let resp = await fetch("/animals-data");
  resp = checkStatus(resp);
  const data = await resp.json();
  return data;
} catch (err) {
  handleError(err);
}

**Example Response:**
```
{
  beaver: {
    name: 'beaver', 
    genus: 'castor\r', 
    description: 'Beavers are large, semiaquatic ... pairs with their offspring.\r', 
    image: 'beaver.jpg\r'
  }
  chicken: {
    name: 'chicken', 
    genus: 'gallus\r', 
    description: 'Originally raised for cockfighting ... food and as pets.\r', 
    image: 'chicken.jpg\r'
  }
  cow: {
    name: 'cow', 
    genus: 'bos\r', 
    description: 'Cattle are commonly raised as livestock ... animals and draft animals.\r', 
    image: 'cow.jpg\r'
  }
  gorilla: {
    name: 'gorilla', 
    genus: 'gorilla\r', 
    description: 'Gorillas are herbivorous, predominantly ... equatorial Africa. \r', 
    image: 'gorilla.jpg\r'
  }
}
```

**Error Handling:**
500 Error: Something went wrong on the server, please try again later.
404 Error: Animal flying-pig not found in the database.

## *Random Animal Name*
**Request Format:** /animal/random

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a random common animal name from the API.

**Example Request:** 
try {
  let resp = await fetch("/animals/random");
  resp = checkStatus(resp);
  const data = await resp.text();
  return data;
} catch (err) {
  handleError(err);
}

**Example Response:**
```
cow
```

**Error Handling:**
500 Error: Something went wrong on the server, please try again later.
