export default [
  {
    id: 1,
    title: 'JSON:API paints my bikeshed!',
    body: 'The shortest article. Ever.',
    created: '2015-05-22T14:56:29.000Z',
    updated: '2015-05-22T14:56:28.000Z',
    articles_links: {
      self: 'http://example.com/articles',
      next: 'http://example.com/articles?page[offset]=2',
      last: 'http://example.com/articles?page[offset]=10'
    },
    articles_meta: {
      total_pages: 2,
      authors: ['Leonardo da Rosa']
    },
    person: {
      id: 42,
      name: 'John',
      age: 80,
      gender: 'male',
      person_links: {},
      person_meta: {}
    }
  }]
