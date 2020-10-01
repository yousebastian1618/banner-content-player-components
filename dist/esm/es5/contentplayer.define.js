
// contentplayer: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './contentplayer.core.js';
import { COMPONENTS } from './contentplayer.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
