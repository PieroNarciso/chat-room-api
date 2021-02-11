import { createConnection } from 'typeorm';

import config from './config';
import { Message, User } from './models';



export default createConnection({
  type: 'postgres',
  url: config.DB_URI,
  entities: [Message, User],
  synchronize: true
});


