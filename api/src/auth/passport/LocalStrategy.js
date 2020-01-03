import { Strategy as LocalStrategy } from 'passport-local';
import models from '../../models';

export default () => {
  return new LocalStrategy(
    {
      usernameField: 'cpf',
      passwordField: 'password',
    },
    (cpf, password, done) => {
      if (!cpf || !password) return done(null, false);

      const cleanCpfValue = cpf;

      models.User.findOne({ where: { cpf: cleanCpfValue } })
        .then(user => {
          if (user === null) {
            return done(null, false);
          }

          user
            .validatePassword(password)
            .then(validation => {
              done(null, validation ? user : false);
            })
            .catch(error => {
              console.log(`LocalStrategy error: ${error}`);
              done(error);
            });
        })
        .catch(error => {
          console.log(`LocalStrategy error [DB]: ${error}`);
          done(error);
        });
    }
  );
};
