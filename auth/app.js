import express from "express";
import cors from "cors";
import { main } from './Db/prisma.service.js';
import Routes from "./routes/routes.js";
import Config from "./config/config.js";
import bodyParser from 'body-parser';

Config();

const app = express();

const port = 4000;
app.use(cors());
app.use(express.json());
// maximum request size limit middleware
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use('/api/user', [cors()]);
app.use('/api/user', Routes.UserRouter)

main()
   .then((result) => {
      app.listen(port, () => {
         console.log(result)
         console.log(`Server Started at port ${port}`);
      });
   })
   .catch((err) => {
      console.log(err);
   });
