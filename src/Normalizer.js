export default class Normalizer {

  static instance() {
    return new this
  }

  static normalize(response) {

    if (response === undefined) {
      throw new Error('You must provide a JSON API response to normalize.')
    }

    let { data, included, links, meta } = response

    if (this.isCollection(data)) {
      return this.normalizeCollection(response)
    }

    return this.normalizeObject(data, included, links, meta)
  }

  static normalizeCollection({data, included, links, meta}) {
    return data.map((object) => this.normalizeObject(object, included, links, meta))
  }

  static normalizeObject(object, included, meta) {
    let entity = this.instance()
    let parsedAttributes = this.parseAttributes(object)
    let { hasOne, hasMany } = this.parseRelationships(parsedAttributes._relationships)

    Object.assign(entity, parsedAttributes)
    Object.assign(entity, { _hasOne: hasOne, _hasMany: hasMany })
    Object.assign(entity, { _included: this.parseIncluded(included) })
    Object.assign(entity, { _meta: meta || {} })
    Object.assign(entity, { _mappings: this.parseMappings({...hasOne, ...hasMany}) })

    return entity
  }

  static parseAttributes(object) {
    let { id, type, attributes, links, relationships } = object

    if (id === undefined) {
      throw new Error('No id key found. Each record must have a id key.')
    }

    if (type === undefined) {
      throw new Error('No type key found. Each record must have a type key.')
    }

    return {
      _id: parseInt(id, 10),
      _type: type,
      ...(links && { _links: links }),
      ...(attributes && { _attributes: attributes }),
      ...(relationships && { _relationships: relationships }),
    }
  }

  static parseRelationships(relationships = {}) {
    let hasOne = {}, hasMany = {}

    Object.entries(relationships).map(([relationship, { data }]) => {
      if (this.isCollection(data)) {
        hasMany[relationship] = data.map((object) => this.normalizeObject(object))
      } else {
        hasOne[relationship] = this.normalizeObject(data)
      }
    })

    return { hasOne, hasMany }
  }

  static parseIncluded(included = []) {
    return included.map(entry => this.normalizeObject(entry))
  }

  static parseMappings(relationships = {}) {
    let mappings = {}

    Object.entries(relationships).forEach(([relationship, data]) => {
      if (this.isCollection(data)) {
        if(data[0]) mappings[relationship] = data[0]._type
      } else {
        mappings[relationship] = data._type
      }
    })

    return mappings
  }

  static isCollection(data) {
    return Array.isArray(data)
  }

  constructor() {
    this._id = null
    this._type = null
    this._attributes = {}
    this._links = {}
    this._included = []
    this._meta = {}
    this._mappings = {}
    this._hasOne = {}
    this._hasMany = []
  }
}
