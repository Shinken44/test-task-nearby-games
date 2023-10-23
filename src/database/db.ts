import pgPromise from 'pg-promise';
import config from 'config';

const dbClient = pgPromise({ schema: 'public' })
const db = dbClient(config.get('db'));

export default db
