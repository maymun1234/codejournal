import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import './BabylonScene'; // Burada Babylon sahnesini başlatıyoruz
import './filereadwrite.js'; // CSS dosyanızı ekleyin

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
