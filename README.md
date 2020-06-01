![](https://img.shields.io/apm/l/vim-mode.svg)

A simple solution to work with JSON API data in JS.

## Installation
````shell script
yarn add @leobagua/json-api-helper

or

npm install @leobagua/json-api-helper
````

## Usage
```javascript
import { Deserializer } from '@leobagua/json-api-helper'

Deserializer.deserialize(response)
```

## Examples:

### Collection

#### A JSON Api Response
```json
 {
   "meta": {
     "page": 1,
     "resources_per_page": 5,
     "total_resources": 6
   },
   "data": [
     {
       "type": "authors",
       "id": "1",
       "attributes": {
         "name": "Leonardo da Rosa",
         "birthplace": "Brazil"
       },
       "relationships": {
         "photos": {
           "data": [
             {
               "type": "photos",
               "id": "7"
             },
             {
               "type": "photos",
               "id": "8"
             }
           ]
         },
         "books": {
           "data": [
             {
               "type": "books",
               "id": "1"
             },
             {
               "type": "books",
               "id": "33"
             }
           ]
         }
       },
       "links": {
         "self": "/authors/7"
       }
     }
   ],
   "included": [
     {
       "type": "photos",
       "id": "7",
       "attributes": {
         "title": "Photo 365",
         "uri": "https:\/\/picsum.photos\/id\/378\/400\/300.jpg"
       }
     },
     {
       "type": "photos",
       "id": "8",
       "attributes": {
         "title": "Photo 786",
         "uri": "https:\/\/picsum.photos\/id\/529\/400\/300.jpg"
       }
     },
     {
       "type": "books",
       "id": "1",
       "attributes": {
         "title": "O'Kon, Gorczany and Langworth",
         "date_published": "1987-01-25",
         "isbn": 4294967295
       }
     },
     {
       "type": "books",
       "id": "33",
       "attributes": {
         "title": "Simonis, Simonis and Mills",
         "date_published": "1982-11-30",
         "isbn": 1304049345
       }
     }
   ]
 }
```

#### Will be parsed as:
```javascript
[
  {
    "id": 1,
    "name": "Leonardo da Rosa",
    "birthplace": "Brazil",
    "author_links": {
      "self": "/authors/7"
    },
    "author_meta": {},
    "photos": [
      {
        "id": 7,
        "title": "Photo 365",
        "uri": "https://picsum.photos/id/378/400/300.jpg",
        "photo_links": {},
        "photo_meta": {}
      },
      {
        "id": 8,
        "title": "Photo 786",
        "uri": "https://picsum.photos/id/529/400/300.jpg",
        "photo_links": {},
        "photo_meta": {}
      }
    ],
    "books": [
      {
        "id": 1,
        "title": "O'Kon, Gorczany and Langworth",
        "date_published": "1987-01-25",
        "isbn": 4294967295,
        "book_links": {},
        "book_meta": {}
      },
      {
        "id": 33,
        "title": "Simonis, Simonis and Mills",
        "date_published": "1982-11-30",
        "isbn": 1304049345,
        "book_links": {},
        "book_meta": {}
      }
    ]
  }
]
```

### Object

#### A JSON Api Response
```json
{
  "data": {
    "id": 1,
    "type": "company",
    "attributes": {
      "name": "My Company",
      "number_of_employers": 20
    },
    "relationships": {
      "config": {
        "data": {
          "id": 1,
          "type": "config"
        }
      },
      "addresses": {
        "data": [
          {
            "id": 1,
            "type": "address"
          }
        ]
      },
      "stages": {
        "data": [
          {
            "id": 1,
            "type": "stage"
          },
          {
            "id": 2,
            "type": "stage"
          },
          {
            "id": 3,
            "type": "stage"
          }
        ]
      }
    }
  },
  "included": [
    {
      "id": 1,
      "type": "address",
      "attributes": {
        "street": "Company street",
        "country": "Brazil"
      }
    },
    {
      "id": 1,
      "type": "config",
      "attributes": {
        "logo": "/assets/fallback/my-logo.png"
      },
      "relationships": {
        "benefits": {
          "data": [
            {
              "id": 1,
              "type": "benefit"
            },
            {
              "id": 2,
              "type": "benefit"
            }
          ]
        },
        "images": {
          "data": []
        }
      }
    },
    {
      "id": 1,
      "type": "benefit",
      "attributes": {
        "value_type": "Percentage",
        "periodicity": "Monthly",
        "extensible": true,
        "value": 80.00
      }
    },
    {
      "id": 2,
      "type": "benefit",
      "attributes": {
        "value_type": "Value",
        "periodicity": "Monthly",
        "extensible": false,
        "value": 299.90
      }
    }
  ]
}
```

#### Will be parsed as:
```javascript
{
  id: 1,
  name: 'My Company',
  number_of_employers: 20,
  company_links: {},
  company_meta: {},
  config: {
    id: 1,
    logo: '/assets/fallback/my-logo.png',
    config_links: {},
    config_meta: {}
  },
  addresses: [
    {
      id: 1,
      street: 'Company street',
      country: 'Brazil',
      address_links: {},
      address_meta: {}
    }
  ]
}
```

### Multi-case types

To prevent some tedious work with use of different types of the naming convention of the deserialized data, 
a layer of multi-case type was added to help to get and set each parsed attribute, accordantly with the proffered
case-type. So, you can access each object attribute with your preferred case-type:

```javascript
company = Deserializer.deserialize(response)

// Getter
company.company_name // 'My company'
company.companyName // 'My company'
company.CompanyName // 'My company'
company['company-name'] // 'My company'

// Setter
company.company_name = 'My company in snake_case'
company.companyName = 'My company in camelCase'
company.CompanyName = 'My company in PascalCase'
company['kebab-case'] = 'My company in kebab-case'
```
