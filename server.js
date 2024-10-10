import mainRoutes from './routes/index.js';
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Use the main routes
app.use('/api', mainRoutes);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});