# How to deploy

## Connect to the server

Download the `.pem` file (it can be found [here](https://github.com/d-vida/fiduc-keys)) and place it anywhere on your PC. Go to the file location and connect to the server using `ssh`:

    ssh -i awsfiduc.pem ubuntu@18.224.28.78

## Accessing through SSH without a .pem file

If you don't want to specify the `.pem` file every time, you can whitelist your computer on the server-side so it will always allows your connection.

First, get your public ssh key with `cat ~/.ssh/id_rsa.pub`, the path may varies depending on your PC settings.

Once you are connected to the server, edit the file `~/.ssh/authorized_keys` placing your public ssh key at the end of the file (don't remove the existing ones!).

Now you can connect to the server from any folder on your PC using:

    ssh ubuntu@18.224.28.78

## Files location

The project files are on the `/opt` path, where you will find the bare repo and the `live` folder where the project is pushed at. The nginx folder is in the standard path `/etc/nginx`.

## Deploying new code to production

When you want to push code to the production server, you first should add the server repo to your local reposity as a remote with

    git remote add live ssh://ubuntu@18.224.28.78:/opt/fiduc-server.git

This should be only done once, when you don't have the remote.

Now everytime you want to push the code to production you just have to

    git push live master  

This will trigger a `post-receive` hook that will install new dependencies, rebuild the project and recreate the process instance.

## Managing the PM2 instance

The project uses [PM2](https://github.com/Unitech/pm2) to manage the running processes and to always keep the server running in case of crashes or machine reboots. Some basic commands to manage the process:

* `pm2 status` - Shows the running instances with their names
* `pm2 log <app_name>` - Shows the last application logs (with `tail`)
* `pm2 delete <app_name>` - Deletes the instance
* `pm2 start npm --name <app_name> -- start` - Starts the instance with the `start` script on `npm`

## Renewing the Nginx certificate  
<sup>__`last renew: 23/05/2019`__</sup>

This project uses the Cerbot to create and renew the nginx https certificate.
The https certificate last for 90 days. To renew, connect to the server through SSH following the connection steps. Then, you can run:

* `sudo certbot --nginx` - That will automatically generate and configure the https certificates.