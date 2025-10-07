const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const filefilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.png') {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg and .png files are allowed"));
    }
};

const upload = multer({
    dest: 'uploads/products',
    fileFilter: filefilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/upload', upload.single('productImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    res.send(`
        <h2>File uploaded successfully</h2>
        <p><strong>File Name:</strong> ${req.file.originalname}</p>
        <p><strong>Stored as:</strong> ${req.file.filename}</p>
        <p><strong>File Path:</strong> /uploads/products/${req.file.filename}</p>
        <p><strong>File Size:</strong> ${req.file.size} bytes</p>
        <a href="/api/">Go back to upload</a>
    `);
});

router.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("File size should be only 2 MB, not more than 2 MB");
    }
    res.status(400).send(err.message);
});

module.exports = router;
