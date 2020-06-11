export default {
  id: 1,
  name: 'My Company',
  number_of_employers: 20,
  company_links: {},
  company_meta: {},
  config: {
    id: 1,
    logo: '/assets/fallback/my-logo.png',
    config_links: {},
    config_meta: {},
    benefits: [
      {
        id: 1,
        value_type: 'Percentage',
        periodicity: 'Monthly',
        extensible: true,
        value: 80.00,
        benefit_links: {},
        benefit_meta: {},
      },
      {
        id: 2,
        value_type: 'Value',
        periodicity: 'Monthly',
        extensible: false,
        value: 299.90,
        benefit_links: {},
        benefit_meta: {},
      },
    ]
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
