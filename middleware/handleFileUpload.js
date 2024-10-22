import multer from 'multer';
import path from 'path';

// Define where to store the files and how to name them
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter for accepting only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter
});

// Function to dynamically handle single or multiple files
const handleFileUpload = (type, fieldConfig) => {
  switch (type) {
    case 'single':
      return upload.single(fieldConfig);
    case 'array':
      return upload.array(fieldConfig, 10); // Max 10 files for array (modify as needed)
    case 'fields':
      return upload.fields(fieldConfig);
    default:
      throw new Error('Invalid upload type');
  }
};

export default handleFileUpload;  // Use ES6 export
