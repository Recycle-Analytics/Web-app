import mysql2 from 'promise-mysql2';
import keys from './keys';

const pool = mysql2.createPool(keys.database);

pool.getConnection()
	.then(connection => {
		pool.releaseConnection(connection);
		console.log('DB esta conectada!')
	});

export default pool;
