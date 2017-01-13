# 3.9.0

* **Added** new `updatable` option to all types to flag components that shouldn't allow updates. By default all properties will allow updates so specifying `updatable: true` isn't necessary.


# 3.8.0

* **Added** `EmberComponent` prop-type for properties that come from the `{{component}}` helper.


# 3.7.1
* **Fixed** typo in dummy app.


# 3.7.0

* **Added** new alternative API for the following types:

  * `any`
  * `array`
  * `bool`
  * `element`
  * `EmberObject`
  * `func`
  * `null`
  * `number`
  * `object`
  * `string`
  * `symbol`

  **Example of new API with `any` type**

  ```js
  bar: PropTypes.any(), // Same as PropTypes.any
  baz: PropTypes.any({required: true}), // Same as PropTypes.any.isRequired
  foo: PropTypes.any({required: false}) // same as PropTypes.any
  ```

  > NOTE: If you update an addon to use this new API, consumers of your addon will also need to be upgraded to the version of `ember-prop-types` that includes this API. Otherwise they'll see errors as `PropTypes.any()` won't work due to the fact `any` will be an object rather than a function.

* **Added** new optional argument to the following types:

  * `arrayOf`
  * `instanceOf`
  * `oneOf`
  * `oneOfType`
  * `shape`

  **Example of new optional argument with `arrayOf` type**

  ```js
  baz: PropTypes.arrayOf(PropTypes.string, {required: true}), // Same as PropTypes.arrayOf(PropTypes.string).isRequired
  foo: PropTypes.arrayOf(PropTypes.string, {required: false}) // same as PropTypes.arrayOf(PropTypes.string)
  ```


# 3.6.0

* **Added** the ability to enable/disable validation from an environment configuration setting, allowing consumers to control which environments `ember-prop-types` warnings/errors appear in. Below is an example of how to explicitly enable validation:

  ```js
  'ember-prop-types': {
    validate: true
  }
  ```

  > Note: Without explicitly adding this setting things will continue to work as they did before in which validation is enabled for all environments except *production*.

* **Fixed** validation error messages when `throwErrors` is set to true to match error messages when errors are not thrown (logging warnings instead).


# 3.5.0

* **Added** ability to validate properties on initialized that are nested under a single property via something like [ember-spread](https://github.com/ciena-blueplanet/ember-spread).


# 3.4.0

* **Added** the ability to configure validation errors to be throw as errors instead of logged as warnings. To enable this feature simply add the following to `config/environment.js`:

  ```js
  'ember-prop-types': {
    throwErrors: true
  }
  ```


# 3.3.0

* **Added** opt-in validation checks when properties that are spec'd in `propTypes` are updated. To enable this feature simply add the following to `config/environment.js`:

  ```js
  'ember-prop-types': {
    validateOnUpdate: true
  }
  ```


# 3.2.1

* **Fixed** bug where defaults weren't being applied when consumer passes in `undefined` for a property with defaults.


# 3.2.0

* **Added** more detailed messaging for sub-property validations when using `PropTypes.arrayOf` or `PropTypes.shape`

# 3.1.1

* **Fixed** a bug in the `PropTypes.arrayOf` validator when used in conjunction with the `PropTypes.shape` validator. 



# 3.1.0

* **Fixed** https://github.com/ciena-blueplanet/ember-prop-types/issues/76
* **Refactored** tests
* **Updated** test tools


# 3.0.2

* Improved demo by adding license, link to Github repository, contributors, syntax highlighting, and a brief summary.


# 3.0.1

* **Added** dummy app for better documentation.

# 3.0.0

* Support cases where components and mixins both use this mixin.

# 2.5.11

* **Added** pull request template.

# 2.5.10

* **Added** `npm-install-security-check` as a dependency to make consumers more security conscious.

# 2.5.9

* Updated CI configuration to not run npm scripts on install.

# 2.5.8

* Cleaned up README to pass default config for remark-lint and better organized badges.
* Updated dev dependencies.

# 2.5.7

* Addressed the following security vulnerability: https://nodesecurity.io/advisories/118.

# 2.5.6

* **Updated** Travis configuration to test addon against older versions of Ember.

# 2.5.5

* Only import polyfill for CI and not for consuming apps. Apps that want Symbol can pay as they go.

# 2.5.4

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.5.3

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.5.2

* **Fixed** issue when `Ember.assign` does not exist to fallback on `Object.assign` then `Ember.merge`.

# 2.5.1

* **Addedd** missing prop-types to README.
* **Upgraded** `ember-get-config` to latest version.

# 2.5.0

* **Added** `element` prop-type.

# 2.4.2

* **Added** `symbol` prop-type.

# 2.4.1

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.4.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.3.1

* **Fixed** `shape` prop-type to not error when non-required props in shape are not present.

# 2.3.0

* **Added** `arrayOf` prop-type.

# 2.2.8

* Split source code up into separate modules as a first step in refactoring and improving implementation.

# 2.2.7

* **Added** tests for `oneOf` prop-type.

# 2.2.6

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.2.5

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.2.4

* **Added** tests for `instanceOf` prop-type.

# 2.2.3

* **Added** tests for `shape` prop-type and commented out tests that exercise issue #24.

# 2.2.2

* **Added** a bunch of tests to help prevent future regressions and verify addon does what it advertises.

# 2.2.1

- Finishes the removal of lodash as a dependency
- Removed Object.assign to fix cases where browsers don't support the latest ES6 syntax

# 2.2.0

- Removed lodash as a dependency to avoid lodash as a downstream requirement
- Replaced lodash functions with equivalent Ember/ES6/custom functions

# 2.1.0

* **Changed** from `ember-lodash` to `ember-lodash-shim`.

# 2.0.1

* Updated dependencies to the latest versions.

# 2.0.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 1.5.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 1.4.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`
