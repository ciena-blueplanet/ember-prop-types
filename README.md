# ember-prop-types

This addon provides
[React-like property management](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) for components.

###### Dependencies

![Ember][ember-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

## Installation

```bash
ember install ember-prop-types
```

## Usage

**[Full Docs](http://ciena-blueplanet.github.io/ember-prop-types/)**

## Examples

### Better Components

Below is an example of a component that uses the property mixin provided by this
addon:

```js
import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types'

export default Component.extend({
  propTypes: {
    foo: PropTypes.string,
    bar: PropTypes.number.isRequired,
    baz: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ])
  },

  getDefaultProps () {
    return {
      foo: 'This is going to be highly profitable'
    }
  }
})
```

If this mixin is being used in a class other than Component, it will need to be
mixed into the class:

```js
import PropTypeMixin, { PropTypes } from 'ember-prop-types'

export default ClassName.extend(PropTypeMixin, {
  propTypes: {
    foo: PropTypes.string,
    bar: PropTypes.number.isRequired,
    baz: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ])
  },

  getDefaultProps () {
    return {
      foo: 'This is going to be highly profitable'
    }
  }
})
```


#### Property Validation

The idea of *propTypes* comes from the world of React and is implemented to have
an almost identical API in the Ember world. Below is a list of possible
*propTypes* to validate against.

*   any
*   array
*   arrayOf
*   bool
*   date
*   element
*   EmberObject
*   func
*   instanceOf
*   null
*   number
*   object
*   oneOf
*   oneOfType
*   regexp
*   shape
*   string
*   symbol

#### Default Property Values

In Ember you can set default property values on a component class itself but
sometimes this bites you when you end up with a property containing an array of
selected items or a state object, where all instances of the component end up
sharing that same array or object. Uncovering this issue is not always an easy
task and so *getDefaultProps* was also implemented (thanks to the React team for
  this concept as well).

[bithound-img]: https://www.bithound.io/github/ciena-blueplanet/ember-prop-types/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-blueplanet/ember-prop-types

[ember-img]: https://img.shields.io/badge/ember-1.12.2+-orange.svg "Ember 1.12.2+"

[ci-img]: https://img.shields.io/travis/ciena-blueplanet/ember-prop-types.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-blueplanet/ember-prop-types

[cov-img]: https://img.shields.io/coveralls/ciena-blueplanet/ember-prop-types.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-blueplanet/ember-prop-types

[npm-img]: https://img.shields.io/npm/v/ember-prop-types.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-prop-types
