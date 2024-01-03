// import { randomBytes, scrypt } from 'crypto';
const {randomBytes, scrypt } = require('crypto');

const signup = async (username, password) => {
	const [hashed, salt] = await saltAndHash(password);

  console.log(`${hashed}.${salt}`)

	return {
		username,
		password: `${hashed}.${salt}`
	};
};

const saltAndHash = (password) => {
	const salt = randomBytes(16).toString('hex');

	return new Promise((resolve, reject) => {
		scrypt(password, salt, 32, (err, key) => {
			if (err) {
				reject(err);
			}

			resolve([key.toString('hex'), salt]);
		});
	});
};

signup('dan', 'Aa123123*')
