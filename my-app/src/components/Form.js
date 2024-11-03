// src/components/Form.js
import React, { useState, useEffect } from 'react';

const Form = ({ formType }) => {
    const [name, setName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Load data from local storage when the component mounts
    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedCountryCode = localStorage.getItem('countryCode');
        const storedPhoneNumber = localStorage.getItem('phoneNumber');

        if (storedName) setName(storedName);
        if (storedCountryCode) setCountryCode(storedCountryCode);
        if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
    }, []);

    // Save data to local storage whenever inputs change
    useEffect(() => {
        localStorage.setItem('name', name);
        localStorage.setItem('countryCode', countryCode);
        localStorage.setItem('phoneNumber', phoneNumber);
    }, [name, countryCode, phoneNumber]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data (add your form submission logic here)
        console.log({
            formType,
            name,
            countryCode,
            phoneNumber,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{formType}</h1>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Country Code:</label>
                <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                >
                    <option value="">Select a country code</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+44">United Kingdom (+44)</option>
                    <option value="+91">India (+91)</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
