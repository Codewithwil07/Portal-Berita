const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/swagger.json'); // Ata
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const uploadImageRoutes = require('./routes/uploadImage');

const redisClient = new Redis();

const PORT = process.env.PORT || 3000;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_KEY,
    resave: false,
    name: 'cookie',
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookie());

app.use('/api/users', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/uploadImage', uploadImageRoutes);

const _dirname = path.resolve();
app.use('/uploads', express.static(_dirname + '/uploads'));

app.listen(PORT, () => {
  console.log('Running on port 3000');
});
