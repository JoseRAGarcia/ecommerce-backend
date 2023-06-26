import 'reflect-metadata'
import 'dotenv/config'
import { app } from './app'
import { dataSource } from '../typeorm/index';

dataSource.initialize().then(() => {
    app.listen(process.env.APP_API_PORT, () => {
        console.log(`Server started on ${process.env.APP_API_URL}`);
    })
})
