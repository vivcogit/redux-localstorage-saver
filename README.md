# redux-localstorage-saver
<p align="center">
    <a href="https://david-dm.org/vivcogit/redux-localstorage-saver">
        <img alt="David" src="https://img.shields.io/david/vivcogit/redux-localstorage-saver.svg?style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/redux-localstorage-saver">
        <img alt="npm" src="https://img.shields.io/npm/v/redux-localstorage-saver.svg?style=flat-square" />
    </a>
</p>

Redux middleware for automatical save actions to localStorage with restore by action

## Install

```sh
npm install redux-localstorage-saver
```

## Usage

### Init store:

```javascript
import { createStore, applyMiddleware } from 'redux';
import localStorageMiddleware from 'redux-localstorage-saver';

import rootReducer from './reducer';

const SAVED_ACTIONS = ['FIRST_ACTION2SAVE', 'SECOND_ACTION2SAVE'];

const store = createStore(rootReducer, 
	applyMiddleware(localStorageMiddleware(SAVED_ACTIONS))
);
```
Or you can use extended config:
```javascript
const config = {
  items: <array of saved actions>,
  serialize: <serialize function>,
  deserialize: <deserialize function>,
  prefix: <prefix for saved items names>
};

const store = createStore(rootReducer, 
	applyMiddleware(localStorageMiddleware(config))
```
### Restore state

For restore state you need dispatch plain function "restore":

```javascript
import { restore } from 'redux-localstorage-saver';

store.dispatch(restore());
```
