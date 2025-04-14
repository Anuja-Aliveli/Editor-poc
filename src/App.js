import React from 'react';
import sampleContent from './sampleContent.json'; // assuming your JSON file is named this
import { MantineProvider } from '@mantine/core';

import Editor from './Editor'; // Adjust the path if the file is in a different folder

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div style={{ padding: '2rem' }}>
        <Editor />
      </div>
    </MantineProvider>
  );
}

export default App;
