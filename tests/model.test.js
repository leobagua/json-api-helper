import Model from '../src/Model'

describe('Normalizer', () => {
  describe('Class', () => {
    test('it must parse to snake_case', () => {
      expect(Model.snakeCase('camelCase')).toEqual('camel_case')
      expect(Model.snakeCase('snake_case')).toEqual('snake_case')
      expect(Model.snakeCase('kebab-case')).toEqual('kebab_case')
      expect(Model.snakeCase('PascalCase')).toEqual('pascal_case')
      expect(Model.snakeCase('UPPER_CASE_SNAKE_CASE')).toEqual('upper_case_snake_case')
    })

    test('it must parse to snake_case starting with underscore', () => {
      expect(Model.snakeCase('_camelCase')).toEqual('_camel_case')
      expect(Model.snakeCase('_snake_case')).toEqual('_snake_case')
      expect(Model.snakeCase('_kebab-case')).toEqual('_kebab_case')
      expect(Model.snakeCase('_PascalCase')).toEqual('_pascal_case')
      expect(Model.snakeCase('_UPPER_CASE_SNAKE_CASE')).toEqual('_upper_case_snake_case')
    })

    test('it must check if its a object', () => {
      function Foo() {}

      expect(Model.isObject({})).toEqual(true)
      expect(Model.isObject({ id: 1, type: 'object' })).toEqual(true)
      expect(Model.isObject([])).toEqual(false)
      expect(Model.isObject(1)).toEqual(false)
      expect(Model.isObject('String')).toEqual(false)
      expect(Model.isObject(new Foo)).toEqual(false)
      expect(Model.isObject(new Model())).toEqual(false)
    })

    test('it must convert a object to a Model instance', () => {
      let modelInstance = Model.objectToModel({ id: 1, type: 'object', number: 4 })

      expect(modelInstance).toBeInstanceOf(Model)
      expect(modelInstance.id).toEqual(1)
      expect(modelInstance.number).toEqual(4)
      expect(modelInstance.type).toEqual('object')
    })
  })

  describe('Instance', () => {
    test('getter must respond to any programing case type', () => {
      let modelInstance = Model.objectToModel({ id: 1, object_type: 'object' })

      expect(modelInstance.object_type).toEqual('object')
      expect(modelInstance.objectType).toEqual('object')
      expect(modelInstance.ObjectType).toEqual('object')
      expect(modelInstance['object-type']).toEqual('object')
      expect(modelInstance['OBJECT_TYPE']).toEqual('object')
    })

    test('setter must respond to any programing case type', () => {
      let modelInstance = Model.objectToModel({ id: 1, object_type: 'object' })

      modelInstance.object_type = 'snake_case'
      expect(modelInstance.object_type).toEqual('snake_case')

      modelInstance.objectType = 'camelCase'
      expect(modelInstance.objectType).toEqual('camelCase')

      modelInstance['kebab-case'] = 'kebab-case'
      expect(modelInstance['kebab-case']).toEqual('kebab-case')

      modelInstance.ObjectType = 'PascalCase'
      expect(modelInstance.ObjectType).toEqual('PascalCase')

      modelInstance['OBJECT_TYPE'] = 'UPPER_CASE_SNAKE_CASE'
      expect(modelInstance['OBJECT_TYPE']).toEqual('UPPER_CASE_SNAKE_CASE')
    })

    test('it must parse an object to a model instance', () => {
      let modelInstance = Model.objectToModel({ object: { id: 1 }, attribute: null })

      expect(modelInstance.object).toBeInstanceOf(Model)
      expect(modelInstance.attribute).not.toBeInstanceOf(Model)

      modelInstance.attribute = { id: 2 }
      expect(modelInstance.attribute).toBeInstanceOf(Model)
    })
  })
})
