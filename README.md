# ng-swiftype

A simple directive to mimic Swiftype Autocomplete jQuery Plugin (https://github.com/swiftype/swiftype-autocomplete-jquery), adding autocomplete functionality to a search input field.


## Installation

Use bower

```javascript
bower install ng-swiftype --save
```

Include `ng-swiftype` in your project:

```html
<script src="bower_components/ng-swiftype/dist/ng-swiftype.min.js"></script>
```

Inject the `ng-swiftype` module into your Angular project:

```javascript
angular.module('myApp', ['ngSwiftype']);
```

## Basic Usage

Use in your DOM. 

```html
<swiftyp-autocomplete engine-key="your_read_only_engine_key">
  <input type="text" ng-modle="term">
</swiftyp-autocomplete>
```

or

```html
<div class="swiftype-autocomplete" engine-key="your_read_only_engine_key">
  <input type="text" ng-modle="term">
</div>
```

Be sure to change the `engine-key` attribute shown above to match the one assigned to your Swiftype search engine.

It will return the results to `$scope.results` with all document types in the Swiftype engine, for example, if you have `books` and `authors` document types. Your results will be `$scope.results.books` and `$scope.results.authors`.


## Options

Currently it supports following options by config in attributes: 

1. `limits`: the number of results.
2. `fetch-fields`: To specify the fields you would like returned from the API, needs to be a valid JSON string, for example:

```html
fetch-fields='{"books": ["title","genre","published_on"]}'
```
