export default class Normalizer {

  static instance() {
    return new this
  }

  static normalize(response) {
    let { data, included, links, meta } = response

    if (this.isCollection(data)) {
      return this.normalizeCollection(response)
    }

    return this.normalizeObject(data, included, links, meta)
  }

  static normalizeCollection({data, included, links, meta}) {
    return data.map((object) => this.normalizeObject(object, included, links, meta))
  }

  static normalizeObject(object, included, links, meta) {
    let parsedAttributes = this.parseAttributes(object)
    let relationships = parsedAttributes._relationships
    let { hasOne, hasMany } = this.parseRelationships(relationships)
    let self = this.instance()

    this.setAttributes(parsedAttributes, self)
    this.setRelationships(self, hasOne, hasMany)
    this.setIncluded(self, included)
    this.setLinks(self, links)
    this.setMeta(self, meta)
    this.setMappings(self, {...hasOne, ...hasMany})

    return self
  }

  static parseAttributes({ id, type, attributes, relationships }) {
    return {
      _id: id,
      _type: type,
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

  static setAttributes(referenceObject, object) {
    Object.entries(referenceObject).forEach(
      ([attribute, value]) => {
        object[attribute] = value
      }
    )
  }

  static setRelationships(object, hasOne, hasMany) {
    object._hasOne = hasOne
    object._hasMany = hasMany
  }

  static setIncluded(object, included = []) {
    object._included = included.map(entry => this.normalizeObject(entry))
  }

  static setLinks(object, links) {
    object._links = links
  }

  static setMeta(object, meta) {
    object._meta = meta
  }

  static setMappings(object, relationships) {
    let mappings = {}

    Object.entries(relationships).forEach(([relationship, data]) => {
      if (this.isCollection(data)) {
        if(data[0]) mappings[relationship] = data[0]._type
      } else {
        mappings[relationship] = data._type
      }
    })

    object._mappings = mappings
  }

  static isCollection(data) {
    return Array.isArray(data)
  }

  constructor() {
    this._id = null
    this._type = null
    this._attributes = {}
    this._links = {}
    this._included = {}
    this._meta = {}
    this._mappings = {}
    this._hasOne = {}
    this._hasMany = {}
  }
}
