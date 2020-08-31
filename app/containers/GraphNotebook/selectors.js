import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the graphNotebook state domain
 */

// const selectGraphNotebookDomain = state => state.graphNotebook || initialState;
const selectGraphNotebookDomain = state => {
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

const makeSelectOptions = () =>
  createSelector(
    selectGraphNotebookDomain,
    st => st.options,
  );

const makeSelectShowOptions = () =>
  createSelector(
    selectGraphNotebookDomain,
    st => st.showOptions,
  );

const makeSelectAnnotations = () =>
  createSelector(
    selectGraphNotebookDomain,
    st => st.annotations,
  );

export default makeSelectGraphNotebook;
export {
  selectGraphNotebookDomain,
  makeSelectGraph,
  makeSelectOptions,
  makeSelectShowOptions,
  makeSelectAnnotations,
};
