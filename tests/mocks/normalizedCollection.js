export default [
  {
    _id: 1,
    _type: 'articles',
    _attributes: {
      title: 'JSON:API paints my bikeshed!',
      body: 'The shortest article. Ever.',
      created: '2015-05-22T14:56:29.000Z',
      updated: '2015-05-22T14:56:28.000Z'
    },
    _links: {
      self: 'http://example.com/articles',
      next: 'http://example.com/articles?page[offset]=2',
      last: 'http://example.com/articles?page[offset]=10'
    },
    _included: [
      {
        _id: 42,
        _type: 'person',
        _attributes: {
          name: 'John',
          age: 80,
          gender: 'male'
        },
        _links: {},
        _included: [],
        _meta: {},
        _mappings: {},
        _hasOne: {},
        _hasMany: {}
      }
    ],
    _meta: {
      totalPages: 2,
      authors: [
        'Leonardo da Rosa'
      ]
    },
    _mappings: {
      person: 'person'
    },
    _hasOne: {
      person: {
        _id: 42,
        _type: 'person',
        _attributes: {},
        _links: {},
        _included: [],
        _meta: {},
        _mappings: {},
        _hasOne: {},
        _hasMany: {}
      }
    },
    _hasMany: {},
    _relationships: {
      person: {
        data: {
          id: '42',
          type: 'person'
        }
      }
    }
  }
]
