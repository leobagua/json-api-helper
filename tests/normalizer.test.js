import Normalizer from '../src/Normalizer'
import hasOne from "./mocks/hasOne"
import hasMany from "./mocks/hasMany"
import included from './mocks/included'
import object from './mocks/object.json'
import collection from './mocks/collection.json'
import normalizedObject from "./mocks/normalizedObject";
import normalizedCollection from "./mocks/normalizedCollection";

describe('Normalizer', () => {
  describe('Instance', () => {
    test('it must match the Normalize class', () => {
      let normalizer = new Normalizer()

      expect(Normalizer.instance()).toEqual(normalizer)
    })

    test('it must match the object constructor', () => {
      let normalizer = new Normalizer()
      let expectNormalizerObject = {
        _id: null,
        _type: null,
        _attributes: {},
        _links: {},
        _included: [],
        _meta: {},
        _mappings: {},
        _hasOne: {},
        _hasMany: [],
      }

      expect(JSON.stringify(normalizer)).toEqual(JSON.stringify(expectNormalizerObject))
    })
  })

  describe('Parser', () => {
    test('it must parse the object attributes', () => {
      let object = {
        id: 1,
        type: 'Object',
        attributes: {
          name: 'Object name'
        },
        relationships: {
          object_config: {
            data: {
              id: 1,
              type: 'object_config'
            }
          }
        },
        non_related_key: []
      }
      let expectedResult = {
        _id: 1,
        _type: 'Object',
        _attributes: {
          name: 'Object name'
        },
        _relationships: {
          object_config: {
            data: {
              id: 1,
              type: 'object_config'
            }
          }
        }
      }

      expect(JSON.stringify(Normalizer.parseAttributes(object))).toEqual(JSON.stringify(expectedResult))
    })

    test('it throws an error if id property has not been set', () => {
      let object = {
        attributes: {
          name: 'Object name'
        },
        relationships: {
          object_config: {
            data: {
              id: 1,
              type: 'object_config'
            }
          }
        },
        non_related_key: []
      }


      expect(() => {
        Normalizer.parseAttributes(object)
      }).toThrow('No id key found. Each record must have a id key.')
    })

    test('it throws an error if no object as ben passed', () => {
      expect(() => {
        Normalizer.parseAttributes()
      }).toThrow("Cannot read property 'id' of undefined")
    })

    test('it throws an error if type property has not been set', () => {
      let object = {
        id: 1,
        attributes: {
          name: 'Object name'
        },
        relationships: {
          object_config: {
            data: {
              id: 1,
              type: 'object_config'
            }
          }
        },
        non_related_key: []
      }


      expect(() => {
        Normalizer.parseAttributes(object)
      }).toThrow('No type key found. Each record must have a type key.')
    })
  })

  describe('Relationships', () => {
    test('it must match the expected parsed hasOne relationships', () => {
      let expectedResult = {
        hasOne: {
          role: {
            _id: 1,
            _type: 'role',
            _attributes: {},
            _links: {},
            _included: [],
            _meta: {},
            _mappings: {},
            _hasOne: {},
            _hasMany: {},
          }
        },
        hasMany: {}
      }

      expect(JSON.stringify(Normalizer.parseRelationships(hasOne))).toEqual(JSON.stringify(expectedResult))
    })

    test('it must match the expected parsed hasMany relationships', () => {
      let expectedResult = {
        hasOne: {},
        hasMany: {
          addresses: [
            {
              _id: 1,
              _type: 'address',
              _attributes: {},
              _links: {},
              _included: [],
              _meta: {},
              _mappings: {},
              _hasOne: {},
              _hasMany: {},
            }
          ],
          stages:
            [
              {
                _id: 1,
                _type: 'stage',
                _attributes: {},
                _links: {},
                _included: [],
                _meta: {},
                _mappings: {},
                _hasOne: {},
                _hasMany: {},
              },
              {
                _id: 2,
                _type: 'stage',
                _attributes: {},
                _links: {},
                _included: [],
                _meta: {},
                _mappings: {},
                _hasOne: {},
                _hasMany: {},
              }
            ]
        }
      }

      expect(JSON.stringify(Normalizer.parseRelationships(hasMany))).toEqual(JSON.stringify(expectedResult))
    })
  })

  describe('Included', () => {
    test('it must match the expected parsed included data', () => {
      let expectedResult = [
        {
          _id: 1,
          _type: 'address',
          _attributes: {
            street: 'Company street',
            country: 'Brazil'
          },
          _links: {},
          _included: [],
          _meta: {},
          _mappings: {},
          _hasOne: {},
          _hasMany: {}
        },
        {
          _id: 1,
          _type: 'config',
          _attributes: {
            logo: 'my-logo.png'
          },
          _links: {},
          _included: [],
          _meta: {},
          _mappings: {
            images: 'image'
          },
          _hasOne: {},
          _hasMany: {
            images:
              [
                {
                  _id: 1,
                  _type: 'image',
                  _attributes: {},
                  _links: {},
                  _included: [],
                  _meta: {},
                  _mappings: {},
                  _hasOne: {},
                  _hasMany: {},
                },
                {
                  _id: 2,
                  _type: 'image',
                  _attributes: {},
                  _links: {},
                  _included: [],
                  _meta: {},
                  _mappings: {},
                  _hasOne: {},
                  _hasMany: {},
                }
              ],
            urls: []
          },
          _relationships: {
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
        }
      ]

      expect(JSON.stringify(Normalizer.parseIncluded(included))).toEqual(JSON.stringify(expectedResult))
    })
  })

  describe('Mappings', () => {
    test('it must match the expected mapping object', () => {
      let relationships = {
        role: {_id: 1, _type: "role"},
        stages: [{_id: 1, _type: "stage"}, {_id: 2, _type: "stage"}],
      }
      let expectResult = {
        role: 'role',
        stages: 'stage',
      }

      expect(JSON.stringify(Normalizer.parseMappings(relationships))).toEqual(JSON.stringify(expectResult))
    })

    test('it must returns a blank object', () => {
      expect(Normalizer.parseMappings()).toEqual({})
    })
  })

  describe('Helper methods', () => {
    describe('is collection', () => {
      test('it is a collection', () => {
        expect(Normalizer.isCollection([])).toBe(true)
      })

      test('it is not a collection', () => {
        expect(Normalizer.isCollection(null)).toBe(false)
        expect(Normalizer.isCollection(undefined)).toBe(false)
        expect(Normalizer.isCollection("")).toBe(false)
        expect(Normalizer.isCollection(0)).toBe(false)
        expect(Normalizer.isCollection({})).toBe(false)
      })
    })
  })

  describe('Normalize', () => {
    test('it must normalize a single object response', () => {
      expect(JSON.stringify(Normalizer.normalize(object))).toEqual(JSON.stringify(normalizedObject))
    })

    test('it must throws a no response error', () => {
      expect(() => {
        Normalizer.normalize()
      }).toThrow("You must provide a JSON API response to normalize.")
    })

    test('it must throws a undefined property error', () => {
      expect(() => {
        Normalizer.normalize({})
      }).toThrow("Cannot read property 'id' of undefined")
    })

    test('it must throws a no type error', () => {
      expect(() => {
        Normalizer.parseAttributes({id: ''})
      }).toThrow('No type key found. Each record must have a type key.')
    })

    test('it must normalize a collection response', () => {
      expect(JSON.stringify(Normalizer.normalize(collection))).toEqual(JSON.stringify(normalizedCollection))
    })
  })
})
