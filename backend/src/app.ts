import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './infrastructure/http/routes/auth.routes';
import procedureRouter from './infrastructure/http/routes/procedure.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', procedureRouter);

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