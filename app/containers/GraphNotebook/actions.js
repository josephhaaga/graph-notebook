/*
 *
 * GraphNotebook actions
 *
 */

import { UPDATE_GRAPH, TOGGLE_SHOW_OPTIONS } from './constants';

export function updateGraph(newGraphAsString) {
  return {
    type: UPDATE_GRAPH,
    newGraphAsString,
  };
}

export function toggleShowOptions() {
  return {
    type: TOGGLE_SHOW_OPTIONS,
  }
}
