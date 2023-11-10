import express from 'express';
import router from './src/router';

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(8000, () => console.log('server is running'));
