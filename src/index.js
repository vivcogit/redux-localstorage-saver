const LOAD_LOCALSTORAGE = Symbol('LOAD_LOCALSTORAGE');

export const restore = () => ({ type: LOAD_LOCALSTORAGE });

const DEFAULT_CONFIG = {
  items: [],
  prefix: 'rls_',
  serialize: JSON.stringify,
  deserialize: JSON.parse
};

const saver = (_config) => {
  let config = DEFAULT_CONFIG;
  if (Array.isArray(_config)) {
    config.items = _config;
  } else if (typeof(_config) === 'object') {
    config = { ...DEFAULT_CONFIG, ..._config };
  } else {
    throw 'You need to use saver(config), where config is array or object';
  }

  return store => 
    next => 
      action => {
        if (action.type === LOAD_LOCALSTORAGE) {
          loadAll(config, next);
        } else { 
          if (config.items.includes(action.type)) {
            save(config, action)
          }
          next(action);
        }
      }
}

const loadAll = (config, dispatch) => {
  config.items.forEach((item) => {
    const payload = localStorage.getItem(`${config.prefix}${item}`);
    if (payload) {
      dispatch({type: item, payload: config.deserialize(payload)});
    }
  });
}

const save = (config, action) => {
  localStorage.setItem(`${config.prefix}${action.type}`, config.serialize(action.payload));
}

export default saver;