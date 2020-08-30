/*
 *
 * GraphNotebook actions
 *
 */

import { UPDATE_GRAPH } from './constants';

export function updateGraph(newGraphAsString) {
  return {
    type: UPDATE_GRAPH,
    newGraphAsString,
  };
}
