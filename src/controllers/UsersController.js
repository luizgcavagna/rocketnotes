const AppError = require('../utils/AppError')

class UsersController {

   create(request, response) {
      const { name, email } = request.body;

      if(!name) 
         throw new AppError('Name is required', 400);

      if(!email)
         throw new AppError('Email is required', 400);
      
      response.send(`${email} ${name}`);
   }
}

module.exports = UsersController;