import { useBEM } from './bem';
import { useSFC } from './sfc';
import { useI18N } from './i18n';
export function use(name) {
  name = 'van-' + name;
  return [useSFC(name), useBEM(name), useI18N(name)];
}