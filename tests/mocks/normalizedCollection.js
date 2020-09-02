export default [
  {
    "_id": '1',
    "_type": "author",
    "_attributes": {
      "name": "Leonardo da Rosa",
      "birthplace": "Brazil"
    },
    "_links": {
      "self": "/authors/7"
    },
    "_included": [
      {
        "_id": '7',
        "_type": "photo",
        "_attributes": {
          "title": "Photo 365",
          "uri": "https://picsum.photos/id/378/400/300.jpg"
        },
        "_links": {},
        "_included": [],
        "_meta": {},
        "_mappings": {},
        "_hasOne": {},
        "_hasMany": {}
      },
      {
        "_id": '8',
        "_type": "photo",
        "_attributes": {
          "title": "Photo 786",
          "uri": "https://picsum.photos/id/529/400/300.jpg"
        },
        "_links": {},
        "_included": [],
        "_meta": {},
        "_mappings": {},
        "_hasOne": {},
        "_hasMany": {}
      },
      {
        "_id": '1',
        "_type": "book",
        "_attributes": {
          "title": "O'Kon, Gorczany and Langworth",
          "date_published": "1987-01-25",
          "isbn": 4294967295
        },
        "_links": {},
        "_included": [],
        "_meta": {},
        "_mappings": {},
        "_hasOne": {},
        "_hasMany": {}
      },
      {
        "_id": '33',
        "_type": "book",
        "_attributes": {
          "title": "Simonis, Simonis and Mills",
          "date_published": "1982-11-30",
          "isbn": 1304049345
        },
        "_links": {},
        "_included": [],
        "_meta": {},
        "_mappings": {},
        "_hasOne": {},
        "_hasMany": {}
      }
    ],
    "_meta": {
      "page": 1,
      "next_page": 2,
      "last_page": 2,
      "resources_per_page": 5,
      "total_resources": 6
    },
    "_mappings": {
      "photos": "photo",
      "books": "book"
    },
    "_hasOne": {},
    "_hasMany": {
      "photos": [
        {
          "_id": '7',
          "_type": "photo",
          "_attributes": {},
          "_links": {},
          "_included": [],
          "_meta": {},
          "_mappings": {},
          "_hasOne": {},
          "_hasMany": {}
        },
        {
          "_id": '8',
          "_type": "photo",
          "_attributes": {},
          "_links": {},
          "_included": [],
          "_meta": {},
          "_mappings": {},
          "_hasOne": {},
          "_hasMany": {}
        }
      ],
      "books": [
        {
          "_id": '1',
          "_type": "book",
          "_attributes": {},
          "_links": {},
          "_included": [],
          "_meta": {},
          "_mappings": {},
          "_hasOne": {},
          "_hasMany": {}
        },
        {
          "_id": '33',
          "_type": "book",
          "_attributes": {},
          "_links": {},
          "_included": [],
          "_meta": {},
          "_mappings": {},
          "_hasOne": {},
          "_hasMany": {}
        }
      ]
    },
    "_relationships": {
      "photos": {
        "data": [
          {
            "type": "photo",
            "id": "7"
          },
          {
            "type": "photo",
            "id": "8"
          }
        ]
      },
      "books": {
        "data": [
          {
            "type": "book",
            "id": "1"
          },
          {
            "type": "book",
            "id": "33"
          }
        ]
      }
    }
  }
]
