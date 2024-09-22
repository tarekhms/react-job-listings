import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import connectDB from './config/db.js';
import proxy from 'express-http-proxy';

connectDB();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/jobs/', jobRoutes);
app.use('/api/users/', userRoutes);

// app.use('/test1/*', proxy('localhost:5000/', {
//     filter: function (req, res) {
//         return req.method == 'GET';
//     }
// }));
// app.use('/test1', proxy('localhost:5000/', {
//     filter: function (req, res) {
//         return req.method == 'GET';
//     }
// }));

app.use('/test/', proxy('localhost:5000', {
    proxyReqPathResolver: function (req) {
        console.log(req.url);
    }
}));

// app.use('/test/', proxy('localhost:5000'));
app.get('/test', (req, res) => res.send('test'));
app.get('/test2', (req, res) => res.send('test2'));

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
