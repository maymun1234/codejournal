// renderer/components/App.js

import React, { useState, useEffect } from 'react';

const App = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    // Main process ile veri al (IPC kullanabilirsiniz)
    // Örneğin:
    // electron.ipcRenderer.invoke('load-journals').then(data => setJournals(data));
  }, []);

  return (
    <div>
      <h1>CodeJournal</h1>
      <ul>
        {journals.map((journal, index) => (
          <li key={index}>{journal}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
