export default [
  {
    id: 1,
    type: 'address',
    attributes: {
      street: 'Company street',
      country: 'Brazil'
    }
  },
  {
    id: 1,
    type: 'config',
    attributes: {
      logo: 'my-logo.png'
    },
    relationships: {
      images: {
        data: [
          {
            id: 1,
            type: 'image'
          },
          {
            id: 2,
            type: 'image'
          }
        ]
      },
      urls: {
        data: []
      }
    }
  },
]
