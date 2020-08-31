/**
 *
 * GraphNotebook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  Alignment,
  Button,
  Navbar,
  Drawer,
  Classes,
  Colors,
  Switch,
} from '@blueprintjs/core';

import Graph from 'react-graph-vis';
import AceEditor from 'react-ace';

import '@blueprintjs/core/lib/css/blueprint.css';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_dark';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGraphNotebook, {
  makeSelectGraph,
  makeSelectEdgeColor,
  makeSelectShowOptions,
  makeSelectHierarchical,
} from './selectors';
import { updateGraph, toggleShowOptions, toggleHierarchical } from './actions';
import reducer from './reducer';
import saga from './saga';

export function GraphNotebook({
  graph,
  onUpdateGraph,
  options,
  showOptions,
  toggleOptions,
  toggleHierarchicalView,
  hierarchical,
  edgeColor,
}) {
  useInjectReducer({ key: 'graphNotebook', reducer });
  useInjectSaga({ key: 'graphNotebook', saga });

  const events = {
    // select: function(event) {
    //   var { nodes, edges } = event;
    //   console.log(nodes, edges);
    // },
  };

  const optionsObject = {
    layout: {
      hierarchical,
    },
    edges: {
      // color: '#000000',
      color: edgeColor, // dark mode
    },
    height: '750px',
  };

  const DARK_MODE = true;

  return (
    <div className={DARK_MODE && 'bp3-dark'}>
      <Helmet>
        <title>GraphNotebook</title>
        <meta name="description" content="Description of GraphNotebook" />
      </Helmet>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Graph Notebook</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />
          <Button
            className="bp3-minimal"
            icon="settings"
            text="Settings"
            onClick={toggleOptions}
          />
        </Navbar.Group>
      </Navbar>
      <Drawer
        icon="info-sign"
        onClose={toggleOptions}
        title="Settings"
        // {...this.state}
        isOpen={showOptions}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <p>
              <Switch
                checked={hierarchical}
                label="Hierarchical"
                alignIndicator={Alignment.LEFT}
                large
                onChange={toggleHierarchicalView}
              />
            </p>
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>Footer</div>
      </Drawer>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '50%',
            // backgroundColor: DARK_MODE ? '#293742' : 'white',
            backgroundColor: DARK_MODE ? Colors.GRAY1 : 'white',
          }}
        >
          <Graph
            graph={graph}
            options={optionsObject}
            events={events}
            // getNetwork={network => {
            //   //  if you want access to vis.js network api you can set the state in a parent component using this property
            // }}
          />
        </div>
        <div style={{ width: '50%' }}>
          <AceEditor
            placeholder="Placeholder Text"
            mode="json"
            theme={DARK_MODE && 'solarized_dark'}
            style={{ width: '100%', height: '100%' }}
            name="blah2"
            onLoad={() => {}}
            onChange={onUpdateGraph}
            fontSize={14}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={JSON.stringify(graph, null, 2)}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

GraphNotebook.propTypes = {
  // dispatch: PropTypes.func.any,
  graphNotebook: PropTypes.any,
  graph: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  options: PropTypes.object,
  onUpdateGraph: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  graphNotebook: makeSelectGraphNotebook(),
  graph: makeSelectGraph(),
  showOptions: makeSelectShowOptions(),
  hierarchical: makeSelectHierarchical(),
  edgeColor: makeSelectEdgeColor(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUpdateGraph: evt => dispatch(updateGraph(evt)),
    toggleOptions: evt => dispatch(toggleShowOptions(evt)),
    toggleHierarchicalView: evt => dispatch(toggleHierarchical(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GraphNotebook);
