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

import { Alignment, Button, Navbar } from '@blueprintjs/core';

import Graph from 'react-graph-vis';
import AceEditor from 'react-ace';

import '@blueprintjs/core/lib/css/blueprint.css';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_dark';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGraphNotebook, { makeSelectGraph } from './selectors';
import { updateGraph } from './actions';
import reducer from './reducer';
import saga from './saga';

export function GraphNotebook({ graph, onUpdateGraph }) {
  useInjectReducer({ key: 'graphNotebook', reducer });
  useInjectSaga({ key: 'graphNotebook', saga });

  const options = {
    layout: {
      hierarchical: true, // make this an option
    },
    edges: {
      color: '#000000',
    },
    height: '750px',
  };

  const events = {
    // select: function(event) {
    //   var { nodes, edges } = event;
    //   console.log(nodes, edges);
    // },
  };

  return (
    <div>
      <Helmet>
        <title>GraphNotebook</title>
        <meta name="description" content="Description of GraphNotebook" />
      </Helmet>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Blueprint</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Graph
            graph={graph}
            options={options}
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
            theme="solarized_dark"
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
};

const mapStateToProps = createStructuredSelector({
  graphNotebook: makeSelectGraphNotebook(),
  graph: makeSelectGraph(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUpdateGraph: evt => dispatch(updateGraph(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GraphNotebook);