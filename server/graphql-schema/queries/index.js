'use strict';

const graphql = require('graphql'),
  relay = require('graphql-relay'),
  userQuery = require('./user.query');


module.exports = (nodeField) => {
  const viewerType = new graphql.GraphQLObjectType({
    name: 'RootViewerType',
    description: 'Root Viewer type',

    fields: () => ({
      user: userQuery.user(),
      users: userQuery.users()
    })
  });

  const rootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      viewer: {
        type: viewerType,
        resolve: () => {
          return {server: '1'};
        }
      },
      node: nodeField
    }
  });

  return rootQuery;
};