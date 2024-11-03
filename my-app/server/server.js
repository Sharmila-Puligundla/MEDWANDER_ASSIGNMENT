const express = require('express');
const mysql = require('mysql');
const xlsx = require('xlsx');  // Add this line for xlsx functionality
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'srujan5191',
    database: 'form_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});
// Endpoint to export data to Excel
app.get('/api/export', (req, res) => {
  const sql = 'SELECT * FROM forms';

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error retrieving data:', err);
          return res.status(500).send({ message: 'Error fetching data' });
      }

      // Create a new workbook and a new worksheet
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(results);

      // Add the worksheet to the workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Forms Data');

      // Define the path to save the Excel file
      const filePath = path.join(__dirname, 'forms_data.xlsx');
      xlsx.writeFile(workbook, filePath);

      // Send the Excel file as a response
      res.download(filePath, (err) => {
          if (err) {
              console.error('Error downloading the file:', err);
              res.status(500).send({ message: 'Error downloading the file' });
          }
      });
  });
});
