import {assign} from '@ember/polyfills'

import any from './any'
import array from './array'
import arrayOf from './array-of'
import bool from './bool'
import date from './date'
import element from './element'
import emberComponent from './ember-component'
import emberObject from './ember-object'
import func from './func'
import instanceOf from './instance-of'
import nullFn from './null'
import number from './number'
import object from './object'
import oneOf from './one-of'
import oneOfType from './one-of-type'
import regexp from './regexp'
import shape from './shape'
import string from './string'
import symbol from './symbol'

const validators = {
  any,
  array,
  bool,
  date,
  element,
  EmberComponent: emberComponent,
  EmberObject: emberObject,
  func,
  instanceOf,
  null: nullFn,
  number,
  object,
  oneOf,
  regexp,
  string,
  symbol
}

assign(validators, {
  arrayOf: arrayOf.bind(this, validators),
  oneOfType: oneOfType.bind(this, validators),
  shape: shape.bind(this, validators)
})

export default validators
