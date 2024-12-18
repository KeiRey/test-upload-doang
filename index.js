const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    cb(null, uploadDir); // Menentukan folder penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Menambahkan nama unik pada file
  }
});

const upload = multer({ storage: storage });

// Middleware untuk menangani JSON
app.use(express.json());

// Endpoint untuk mengunggah file
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }
    res.status(200).send({
      message: 'File uploaded successfully!',
      file: req.file
    });
  } catch (error) {
    res.status(500).send({ message: 'File upload failed.', error });
  }
});

// Memulai server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
