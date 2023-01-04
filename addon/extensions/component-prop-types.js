// import {isArray} from '@ember/array'
// import Component from '@ember/component'

// import PropTypeMixin, {settings} from '../mixins/prop-types'
// import {logger} from '../utils/prop-types'

// /**
//  * @module
//  */

// /**
//  * @memberof ember/Component#
//  */
// Component.reopen(PropTypeMixin, {
//   init () {
//     if (settings.requireComponentPropTypes) {
//       const propTypes = this.propTypes

//       if (!isArray(propTypes) || propTypes.length === 0) {
//         logger.warn(
//           this, 'propTypes is required for components', settings.throwErrors
//         )
//       }
//     }

//     this._super(...arguments)
//   }
// })
