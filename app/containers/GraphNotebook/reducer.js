/*
 *
 * GraphNotebook reducer
 *
 */
import produce from 'immer';
import { UPDATE_GRAPH } from './constants';

export const initialState = {
  graph: {
    nodes: [
      { id: 1, label: 'Node 1', title: 'node 1 tootip text' },
      { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
      { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
      { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
      { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
    ],
    edges: [
      { from: 1, to: 2, label: 'Edge 1' },
      { from: 1, to: 3 },
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
    }
  });

export default graphNotebookReducer;
