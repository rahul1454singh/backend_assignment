const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads/gallery');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// File filter
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
        cb(null, true);
        console.log('file checked..!');
    } else {
        cb(new Error("Only .jpg, .png, and .jpeg files are allowed!"), false);
        console.log('requirement not fulfilled');
    }
};

// Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage, fileFilter });

// Serve upload form
router.get('/uploads/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/array.html'));
});

// Handle upload with error handling
router.post('/uploads/gallery', (req, res) => {
    upload.array('image', 5)(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).send("Error: You can upload a maximum of 5 files only.");
            }
            return res.status(400).send(`Error: ${err.message}`);
        }

        if (!req.files || req.files.length === 0) {
            return res.status(404).json({ message: 'No file uploaded!' });
        }

        const uploadFiles = req.files
            .map(file => `<li>${file.originalname} → stored as ${file.filename}</li>`)
            .join("");

        res.send(`
            <h2>Images uploaded successfully!</h2>
            <p><strong>Total Count:</strong> ${req.files.length}</p>
            <ul>${uploadFiles}</ul>
            <a href="/uploads/gallery">Go back to upload</a>
        `);

        console.log(req.files);
    });
});

module.exports = router;
