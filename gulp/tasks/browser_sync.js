import plugin from '../plugin';
import {
  browser_sync as bsConfig
} from '../config';

const $ = plugin;

export function browser_sync(cb) {
  $.browser_sync.init(bsConfig);
  cb();
}

export function bs_reload(cb) {
  $.browser_sync.reload();
  cb();
}
