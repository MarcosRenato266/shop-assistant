# Fiduc Server 

## Configuring Email

Create an email and allow non secure apps to access the email.
    On gmail: [gmail non secure apps](https://myaccount.google.com/lesssecureapps)

## Install

    yarn

Create a `.env` file following the template on `.env.template`.

## Developing

In the first time running the server, create a schema on PostgreSQL called `dev_fiduc_db`. Change the database user and password if needed on `src/config/sequelize.config.js`.

Then you can run:

    yarn dev

## Building

    yarn build
   
## Deploying

Refer to the [deploying guide](https://github.com/d-vida/fiduc-server/blob/master/DEPLOYING.md).
