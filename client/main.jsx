import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '/imports/ui/App.jsx';

// When the Meteor app starts on the client, render the React application
Meteor.startup(() => {
  const container = document.getElementById('react-target');
  // React 18 uses createRoot instead of ReactDOM.render
  const root = createRoot(container);
  root.render(<App />);
});