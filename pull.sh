echo "Fetching last changes from Gitlab"
git pull origin master
echo "Done ✔️"

echo "Creating Heroku Database Backup to Pull"
heroku pg:backups:capture --app hyperskills
echo "Backup ready ✔️"

echo "Introduce el ID del Backup, ej: b043"
read id
#Unica parte manual que hayq ue cambiar, el id del Backup
heroku_bkp=$(heroku pg:backups:url $id --app hyperskills)
echo "Downloading Backup... from Heroku"
curl "$heroku_bkp" --output "./Backend/databases/hyperskills-heroku-backup.dump"
echo "Download Done ✔️"

echo "Restoring Database to Local Postgres..."
pg_restore --no-owner -h localhost -U postgres --clean -d hyperskills Backend/databases/hyperskills-heroku-backup.dump
echo "Database Restored ✔️"

echo "Finished ✔️✔️✔️"

#Par que ésta madre sea perfecta necesito obtener el ID del Backup para que quede completamente automatizado
#Mientras poner un Input para elegirlo xP

