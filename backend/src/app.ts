import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import client from 'prom-client';
import authRouter from './infrastructure/http/routes/auth.routes';
import procedureRouter from './infrastructure/http/routes/procedure.routes';
import careerRouter from './infrastructure/http/routes/career.routes';
import adminDashboardRouter from './infrastructure/http/routes/admin-dashboard.routes';
import observationRouter from './infrastructure/http/routes/observation.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'eduprocess_backend_' });

const httpRequestsCounter = new client.Counter({
    name: 'eduprocess_backend_http_requests_total',
    help: 'Total number of HTTP requests processed by EduProcess API',
    labelNames: ['method', 'route', 'status']
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        const route = req.baseUrl + (req.route ? req.route.path : req.path);
        httpRequestsCounter.inc({
            method: req.method,
            route: route,
            status: res.statusCode.toString()
        });
    });
    next();
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', procedureRouter);
app.use('/api/v1', careerRouter);
app.use('/api/v1', adminDashboardRouter);
app.use('/api/v1', observationRouter);

app.get('/api/v1/metrics', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
});

app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'EduProcess Core Backend is running successfully.',
        timestamp: new Date().toISOString()
    });
});

export default app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}