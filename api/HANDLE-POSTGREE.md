## Connect ssh
`ssh -i awsfiduc.pem ubuntu@18.224.28.78`

## AWS Instance User
Username: `postgres` Password: `Trusted(dont need password)`

## Restore DB Command
`psql -U postgres -d fiduc_db -f <filename>.sql`

## Make backup
`pg_dump -U postgres -f backup.sql fiduc_db`

## Download Backup with SCP
`scp -i awsfiduc.pem ubuntu@18.224.28.78:pathFile.sql /localPath/`