import { Provider } from "mobx-react";
import UsersStore from '../stores/UsersStore';

const SPECIAL_REACT_KEYS = { children: true, key: true, ref: true };

export default class MobxRnnProvider extends Provider {
  props: {
    store: Object
  };

  context: {
    mobxStores: Object
  };

  getChildContext() {
    const stores = {};

    // inherit stores
    const baseStores = this.context.mobxStores;
    if (baseStores) {
      for (let key in baseStores) {
        stores[key] = baseStores[key];
      }
    }

    // add own stores
    for (let key in this.props.store) {
      if (!SPECIAL_REACT_KEYS[key]) {
        stores[key] = this.props.store[key];
      }
    }

    return {
      mobxStores: stores
    };
  }
}
