import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import connectDB from './config/db.js';

connectDB();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/jobs/', jobRoutes);
app.use('/api/users/', userRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Server is ready'));
}


app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Started on port ${port}`));
