// renderer/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/homePage';  // Ana sayfa bileşenini içeri aktarın

ReactDOM.render(
    <React.StrictMode>
        <HomePage />  {/* Ana sayfayı render et */}
    </React.StrictMode>,
    document.getElementById('root')
);
