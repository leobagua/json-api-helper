import Deserializer from '../src/Deserializer'
import object from './mocks/object.json'
import collection from './mocks/collection.json'
import deserializedObject from './mocks/deserializedObject';
import deserializedCollection from './mocks/deserializedCollection';

describe('Deserializer', () => {
  describe('Class', () => {
    test('it must throws a no response error', () => {
      expect(() => {
        Deserializer.deserialize()
      }).toThrow("You must provide a JSON API response to deserialize.")
    })

    test('it must deserialize a object', () => {
      let response = Deserializer.deserialize(object)

      expect(response).toEqual(deserializedObject)
    })

    test('it must deserialize a collection', () => {
      let response = Deserializer.deserialize(collection)

      expect(response).toEqual(deserializedCollection)
    })

    test('it must merge the id', () => {
      let entity = {}
      Deserializer._mergeId(entity, 1)

      expect(entity.id).toEqual(1)
    })

    test('it must merge the links', () => {
      let entity = {}
      Deserializer._mergeLinks(entity, 'company', { self: 'https://api/v1/company/1' })

      expect(entity.company_links).toEqual({ self: 'https://api/v1/company/1' })
    })

    test('it must merge the meta', () => {
      let entity = {}
      Deserializer._mergeMeta(entity, 'company', { page: 1 })

      expect(entity.company_meta).toEqual({ page: 1 })
    })

    test('it must merge the attributes', () => {
      let entity = {}
      Deserializer._mergeAttributes(entity, { id: 1, name: 'My Company' })

      expect(entity).toEqual({ id: 1, name: 'My Company' })
    })

    test('it must group the included records', () => {
      let included = [{id: 1, _type: 'company'}, {id: 1, _type: 'person'}]
      let grouped = Deserializer._groupIncluded(included)
      let expected = {
        company: [
          {id: 1, _type: 'company'}
        ],
        person: [
          {id: 1, _type: 'person'}
        ]
      }

      expect(grouped).toEqual(expected)
    })
  })
})
