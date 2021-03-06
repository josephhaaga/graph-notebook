/*
 *
 * GraphNotebook actions
 *
 */

import {
  UPDATE_GRAPH,
  TOGGLE_SHOW_OPTIONS,
  TOGGLE_HIERARCHICAL,
  TOGGLE_ANALYTICS,
} from './constants';

export function updateGraph(newGraphAsString) {
  return {
    type: UPDATE_GRAPH,
    newGraphAsString,
  };
}

export function toggleShowOptions() {
  return {
    type: TOGGLE_SHOW_OPTIONS,
  };
}

export function toggleHierarchical() {
  return {
    type: TOGGLE_HIERARCHICAL,
  };
}

export function toggleAnalytics() {
  return {
    type: TOGGLE_ANALYTICS,
  };
}
