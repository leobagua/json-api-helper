export default {
  "_id": 1,
  "_type": "company",
  "_attributes": {
    "name": "My Company",
    "number_of_employers": 20
  },
  "_links": {},
  "_included": [
    {
      "_id": 1,
      "_type": "address",
      "_attributes": {
        "street": "Company street",
        "country": "Brazil"
      },
      "_links": {},
      "_included": [],
      "_meta": {},
      "_mappings": {},
      "_hasOne": {},
      "_hasMany": {}
    },
    {
      "_id": 1,
      "_type": "config",
      "_attributes": {
        "logo": "/assets/fallback/my-logo.png"
      },
      "_links": {},
      "_included": [],
      "_meta": {},
      "_mappings": {
        "benefits": "benefit"
      },
      "_hasOne": {},
      "_hasMany": {
        "benefits": [
          {
            "_id": 1,
            "_type": "benefit",
            "_attributes": {},
            "_links": {},
            "_included": [],
            "_meta": {},
            "_mappings": {},
            "_hasOne": {},
            "_hasMany": {}
          },
          {
            "_id": 2,
            "_type": "benefit",
            "_attributes": {},
            "_links": {},
            "_included": [],
            "_meta": {},
            "_mappings": {},
            "_hasOne": {},
            "_hasMany": {}
          }
        ],
        "images": []
      },
      "_relationships": {
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
      "_id": 1,
      "_type": "benefit",
      "_attributes": {
        "value_type": "Percentage",
        "periodicity": "Monthly",
        "extensible": true,
        "value": 80
      },
      "_links": {},
      "_included": [],
      "_meta": {},
      "_mappings": {},
      "_hasOne": {},
      "_hasMany": {}
    },
    {
      "_id": 2,
      "_type": "benefit",
      "_attributes": {
        "value_type": "Value",
        "periodicity": "Monthly",
        "extensible": false,
        "value": 299.9
      },
      "_links": {},
      "_included": [],
      "_meta": {},
      "_mappings": {},
      "_hasOne": {},
      "_hasMany": {}
    }
  ],
  "_meta": {},
  "_mappings": {
    "config": "config",
    "addresses": "address",
    "stages": "stage"
  },
  "_hasOne": {
    "config": {
      "_id": 1,
      "_type": "config",
      "_attributes": {},
      "_links": {},
      "_included": [],
      "_meta": {},
      "_mappings": {},
      "_hasOne": {},
      "_hasMany": {}
    }
  },
  "_hasMany": {
    "addresses": [
      {
        "_id": 1,
        "_type": "address",
        "_attributes": {},
        "_links": {},
        "_included": [],
        "_meta": {},
        "_mappings": {},
        "_hasOne": {},
        "_hasMany": {}
      }
    ],
    "stages": [
      {
        "_id": 1,
        "_type": "stage",
        "_attributes": {},
        "_links": {},
        "_included": [],
        "_meta": {},
        "_mappings": {},
        "_hasOne": {},
        "_hasMany": {}
      },
      {
        "_id": 2,
        "_type": "stage",
        "_attributes": {},
        "_links": {},
        "_included": [],
        "_meta": {},
        "_mappings": {},
        "_hasOne": {},
        "_hasMany": {}
      },
      {
        "_id": 3,
        "_type": "stage",
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
}
