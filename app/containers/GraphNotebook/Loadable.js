/**
 *
 * Asynchronously loads the component for GraphNotebook
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
