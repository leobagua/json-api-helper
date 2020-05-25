import Model from './Model'
import Normalizer from "./Normalizer";
import _ from 'lodash'

export default class Deserializer extends Normalizer {

  static deserialize(response) {
    let normalizedData = this.normalize(response)
    let entity = new Model()

    return this.hydrate(entity, normalizedData)
  }

  static hydrate(entity, data) {
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

    this.mergeId(entity, _id)
    this.mergeAttributes(entity, _attributes)
    this.mergeLinks(entity, _type, _links)
    this.mergeMeta(entity, _type, _meta)
    this.mergeRelationships(entity, _mappings, { ..._hasOne, ..._hasMany}, _included)

    return entity
  }

  static mergeId(entity, id) {
    entity.id = id
  }

  static mergeLinks(entity, entityType, links) {
    entity[`${entityType}_links`] = links
  }

  static mergeMeta(entity, entityType, meta) {
    entity[`${entityType}_meta`] = meta
  }

  static mergeAttributes(entity, attributes) {
    Object.entries(attributes).forEach(([attribute, value]) => {
      entity[attribute] = value
    })
  }

  static mergeRelationships(entity, mappings, relationships, included) {
    let groupedIncluded = this.groupIncluded(included)

    Object.entries(relationships).forEach(([relationship, data]) => {
      let dataSet = groupedIncluded[mappings[relationship]]
      if (dataSet) {
        if (this.isCollection(data)) {
          let collection = _.compact(data.map(({_id, _type}) => dataSet.find((object) => object._id === _id)))
          entity[relationship] = collection.map(object => this.hydrate(new Model(), object))
        } else {
          let object = dataSet.find(({_id}) => _id === data._id)
          if (object) entity[relationship] = this.hydrate(new Model(), object);
        }
      }
    })
  }

  static groupIncluded(included) {
    return _.groupBy(included, '_type')
  }

}
