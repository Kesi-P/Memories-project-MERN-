import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
const app = express();



app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//add a prefix of url start homepage from../posts
app.use('/posts', postRoutes);
app.use('/user', userRoutes)
//conect to db
// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL ='mongodb+srv://Kesi-P:932411@cluster0.kuadk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port :  ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);