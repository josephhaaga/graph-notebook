import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the graphNotebook state domain
 */

const selectGraphNotebookDomain = state => state.graphNotebook || initialState;

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

const makeSelectHierarchical = () =>
  createSelector(
    selectGraphNotebookDomain,
    st => st.hierarchical,
  );

const makeSelectEdgeColor = () =>
  createSelector(
    selectGraphNotebookDomain,
    st => st.edges,
  ); 


const makeSelectShowOptions = () =>
  createSelector(
    selectGraphNotebookDomain,
    st => st.showOptions,
  );


export default makeSelectGraphNotebook;
export {
  selectGraphNotebookDomain,
  makeSelectGraph,
  makeSelectHierarchical,
  makeSelectEdgeColor,
  makeSelectShowOptions,
};
