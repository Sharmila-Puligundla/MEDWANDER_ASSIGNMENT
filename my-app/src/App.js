// src/App.js
import React, { useState } from 'react';
import Form from './components/Form';

const App = () => {
    const [activeForm, setActiveForm] = useState(null);

    return (
        <div>
            <h1>Dynamic Forms</h1>
            <button onClick={() => setActiveForm('Form A')}>Form A</button>
            <button onClick={() => setActiveForm('Form B')}>Form B</button>

            {activeForm && <Form formType={activeForm} />}
        </div>
    );
};

export default App;
