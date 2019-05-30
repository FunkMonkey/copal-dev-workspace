const gulp = require( 'gulp' );
const flatten = require( 'arr-flatten' );

// utils
const modReactiveCommands = require( 'reactive-commands/gulpfile' );
const modReactivePluginSystem = require( 'reactive-plugin-system/gulpfile' );
const modReactiveGraph = require( 'reactive-graph/gulpfile' );
const modReactiveReactComponent = require( 'reactive-react-component/gulpfile' );

// copal
const modCopalCore = require( '@copal/core/gulpfile' );
const modCopalOpensearch = require( '@copal/opensearch/gulpfile' );
const modCopalLauncher = require( '@copal/launcher/gulpfile' );

const utils = [modReactiveGraph, modReactiveReactComponent, modReactiveCommands, modReactivePluginSystem];
const copal = [modCopalCore, modCopalOpensearch];
const copalLauncher = [ modCopalLauncher ];
const allCopal = flatten( copal, copalLauncher );

const allModules = flatten([utils, copal, copalLauncher]);

function combineTasks( modules, taskName ) {
  return gulp.parallel( modules.map( mod => mod[taskName] ) )
}

function exportTask( taskInfo ) {
  const comboTask = combineTasks( taskInfo.modules, taskInfo.subtaskName );
  comboTask.displayName = taskInfo.name;
  module.exports[taskInfo.name] = comboTask;
}

const tasks = [
  { name: 'build', subtaskName: 'build', modules: allModules },
  { name: 'build:utils', subtaskName: 'build', modules: utils },
  { name: 'build:copal', subtaskName: 'build', modules: copal },
  { name: 'build:copal-launcher', subtaskName: 'build', modules: allCopal },
  { name: 'watch:build', subtaskName: 'watch:build', modules: allModules },
  { name: 'watch:build:utils', subtaskName: 'watch:build', modules: utils },
  { name: 'watch:build:copal', subtaskName: 'watch:build', modules: copal },
  { name: 'watch:build:copal-launcher', subtaskName: 'watch:build', modules: allCopal }
];

tasks.forEach( taskInfo => { exportTask( taskInfo ); } );
