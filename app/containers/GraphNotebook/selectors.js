import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the graphNotebook state domain
 */

// const selectGraphNotebookDomain = state => state.graphNotebook || initialState;
const selectGraphNotebookDomain = state => {
  console.warn(state);
  return state.graphNotebook || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by GraphNotebook
 */

const makeSelectGraphNotebook = () =>
  createSelector(
    selectGraphNotebookDomain,
    substate => substate,
  );

const makeSelectGraph = () =>
  createSelector(
    selectGraphNotebookDomain,
    st => st.graph,
  );

export default makeSelectGraphNotebook;
export { selectGraphNotebookDomain, makeSelectGraph };
