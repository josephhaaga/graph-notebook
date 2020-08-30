/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Graph from 'react-graph-vis';
import AceEditor from 'react-ace';

import { Alignment, Button, Navbar } from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_dark';

export default function HomePage() {
  const graph = {
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
  };

  const options = {
    layout: {
      hierarchical: true, // make this an option
    },
    edges: {
      color: '#000000',
    },
    height: '800px',
  };

  const events = {
    // select: function(event) {
    //   var { nodes, edges } = event;
    //   console.log(nodes, edges);
    // },
  };
  return (
    <div>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Blueprint</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>
      {/* <h1>
        <FormattedMessage {...messages.header} />
      </h1> */}
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
          />
        </div>
        <div style={{ width: '50%' }}>
          <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="solarized_dark"
            style={{ width: '100%', height: '100%' }}
            name="blah2"
            onLoad={() => {}}
            // onChange={this.onChange}
            fontSize={14}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={graph.toString()}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}
