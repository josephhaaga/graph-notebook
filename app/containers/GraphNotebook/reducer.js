/*
 *
 * GraphNotebook reducer
 *
 */
import produce from 'immer';
import { Colors } from '@blueprintjs/core';
import { UPDATE_GRAPH, TOGGLE_SHOW_OPTIONS } from './constants';

export const initialState = {
  showOptions: false,
  options: {
    layout: {
      hierarchical: false, // make this an option
    },
    edges: {
      // color: '#000000',
      color: Colors.GRAY4, // dark mode
    },
    height: '750px',
  },
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
  annotations: [],
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
          if (e instanceof SyntaxError) {
            const regex = /(\d+)/g;
            const errorCharIndex = parseInt(e.message.match(regex)[0], 10);
            const lineWithError = action.newGraphAsString
              .substr(0, errorCharIndex)
              .split('\n').length;
            draft.annotations = [
              { row: lineWithError, column: 0, type: 'error', text: e.message },
            ];
          } else {
            throw e; // re-throw the error unchanged
          }
          break;
        }
        break;
      case TOGGLE_SHOW_OPTIONS:
        draft.showOptions = !state.showOptions;
        break;
    }
  });

export default graphNotebookReducer;
