const { hash, Compare } = require('bcryptjs');
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite');

class UsersController {

   async create(request, response) {
      const { name, email, password } = request.body;

      if(!name) 
         throw new AppError('Name is required', 400);

      if(!email)
         throw new AppError('Email is required', 400);

      if(!password)
         throw new AppError('Password is required', 400);
      
      const database = await sqliteConnection();
      const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

      if(checkUserExists)
         throw new AppError('User already exists');

      const hashedPassword = await hash(password, 8);

      await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

      response.send(`User ${name}, created successfully!`);
   }
}

module.exports = UsersController;