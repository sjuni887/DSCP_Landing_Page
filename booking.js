// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ExcelJS = require('exceljs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/book-appointment', async (req, res) => {
    const { name, email, phone, department, doctor, date, message } = req.body;

    // Load existing workbook or create a new one
    const workbook = new ExcelJS.Workbook();
    const filePath = 'BookingAppointment.xlsx';
    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
    } else {
        workbook.addWorksheet('Appointments');
    }

    const worksheet = workbook.getWorksheet('Appointments');
    if (worksheet.rowCount === 0) {
        worksheet.columns = [
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
            { header: 'Phone', key: 'phone' },
            { header: 'Department', key: 'department' },
            { header: 'Doctor', key: 'doctor' },
            { header: 'Date', key: 'date' },
            { header: 'Message', key: 'message' }
        ];
    }

    worksheet.addRow({ name, email, phone, department, doctor, date, message });

    await workbook.xlsx.writeFile(filePath);

    res.json({ message: 'Appointment booked successfully!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${5500}/`);
});