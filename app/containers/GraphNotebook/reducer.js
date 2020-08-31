/*
 *
 * GraphNotebook reducer
 *
 */
import produce from 'immer';
import { Colors } from '@blueprintjs/core';
import {
  UPDATE_GRAPH,
  TOGGLE_SHOW_OPTIONS,
  TOGGLE_HIERARCHICAL,
  TOGGLE_ANALYTICS,
} from './constants';

export const initialState = {
  showOptions: false,
  showAnalytics: false,
  hierarchical: false,
  edges: Colors.GRAY4,
  height: '750px',
  graph: {
    nodes: [
      { id: 1, label: 'Node 1', color: 'red' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ],
    edges: [
      { from: 1, to: 2, label: 'Edge 1' },
      { from: 1, to: 3, color: 'orange' },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  },
};

/* eslint-disable default-case, no-param-reassign */
const graphNotebookReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_GRAPH:
        try {
          const g = JSON.parse(action.newGraphAsString);
          draft.graph = g;
        } catch (e) {
          break;
        }
        break;
      case TOGGLE_SHOW_OPTIONS:
        draft.showOptions = !state.showOptions;
        break;
      case TOGGLE_HIERARCHICAL:
        draft.hierarchical = !state.hierarchical;
        break;
      case TOGGLE_ANALYTICS:
        draft.showAnalytics = !state.showAnalytics;
        break;
    }
  });

export default graphNotebookReducer;
