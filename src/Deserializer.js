import Model from './Model'
import Normalizer from "./Normalizer";
import _ from 'lodash'

export default class Deserializer extends Normalizer {

  static deserialize(response) {

    if (response === undefined) {
      throw new Error('You must provide a JSON API response to deserialize.')
    }

    let normalizedData = this.normalize(response)

    if(this.isCollection(normalizedData)) {
      return this._hydrateCollection(normalizedData)
    }

    return this._hydrate(new Model(), normalizedData)
  }

  static _hydrateCollection(collection) {
    return collection.map((object) => this._hydrate(new Model(), object))
  }

  static _hydrate(entity, data) {
    let {
      _id,
      _type,
      _attributes,
      _hasOne,
      _hasMany,
      _mappings,
      _included,
      _links,
      _meta,
    } = data

    this._mergeId(entity, _id)
    this._mergeAttributes(entity, _attributes)
    this._mergeLinks(entity, _type, _links)
    this._mergeMeta(entity, _type, _meta)
    this._mergeRelationships(entity, _mappings, { ..._hasOne, ..._hasMany}, _included)

    return entity
  }

  static _mergeId(entity, id) {
    entity.id = id
  }

  static _mergeLinks(entity, entityType, links) {
    entity[`${entityType}_links`] = links
  }

  static _mergeMeta(entity, entityType, meta) {
    entity[`${entityType}_meta`] = meta
  }

  static _mergeAttributes(entity, attributes) {
    Object.entries(attributes).forEach(([attribute, value]) => {
      entity[attribute] = value
    })
  }

  static _mergeRelationships(entity, mappings, relationships, included) {
    let groupedIncluded = this._groupIncluded(included)

    Object.entries(relationships).forEach(([relationship, data]) => {
      let dataSet = groupedIncluded[mappings[relationship]]

      if (dataSet) {
        if (this.isCollection(data)) {
          let collection = _.compact(data.map(({_id, _type}) => dataSet.find((object) => object._id === _id)))
          entity[relationship] = collection.map(object => this._hydrate(new Model(), object))
        } else {
          let object = dataSet.find(({_id}) => _id === data._id)
          entity[relationship] = this._hydrate(new Model(), object);
        }
      }
    })
  }

  static _groupIncluded(included) {
    return _.groupBy(included, '_type')
  }

}
