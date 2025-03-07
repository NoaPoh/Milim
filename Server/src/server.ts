import express from 'express';
import authRoutes from './routes/auth';
import categoriesRoutes from './routes/category';
import wordRoutes from './routes/words';
// import gamesRoutes from './routes/game';
// import storeRoutes from './routes/store';
import progressRoutes from './routes/progress';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware for parsing JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/words', wordRoutes);
// app.use('/api/games', gamesRoutes);
// app.use('/api/store', storeRoutes);
app.use('/api/progress', progressRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
