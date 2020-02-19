const LOAD_LOCALSTORAGE = Symbol('LOAD_LOCALSTORAGE');

export function restore() {
  return ({ type: LOAD_LOCALSTORAGE });
}

const DEFAULT_CONFIG = {
  items: [],
  prefix: 'rls_',
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

function saver(_config) {
  let config = DEFAULT_CONFIG;
  if (Array.isArray(_config)) {
    config.items = _config;
  } else if (typeof(_config) === 'object') {
    config = { ...DEFAULT_CONFIG, ..._config };
  } else {
    throw 'You need to use saver(config), where config is array or object';
  }

  saver.getItem = (item) => {
    try {
      const payload = localStorage.getItem(`${config.prefix}${item}`);
      return config.deserialize(payload);
    } catch (error) {
      return null;
    }
  }

  saver.loadAll = (dispatch) => {
    config.items.forEach((item) => {
      const payload = saver.getItem(item);
  
      if (payload !== null) {
        dispatch({ type: item, payload });
      }
    });
  }
  
  saver.save = (action) => {
    try {
      localStorage.setItem(
        `${config.prefix}${action.type}`,
        config.serialize(action.payload),
      );
    } catch (error) {
      return;
    }
  }

  return () => 
    (next) => 
      (action) => {
        if (action.type === LOAD_LOCALSTORAGE) {
          saver.loadAll(next);
        } else { 
          if (config.items.includes(action.type)) {
            saver.save(action)
          }

          next(action);
        }
      }
}

export default saver;