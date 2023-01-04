## Deprecated due Heroku does not have a Free Tier Anymore
echo "Exporting DB ..."
PGPASSWORD=root pg_dump -Fc --no-acl --no-owner -h localhost -U postgres hyperskills >  Backend/dist/public/hyperskills.dump
echo "Saving changes in Git..."
git add -A
git commit
echo "Done ✔️"

echo "Deploying App to Heroku..."
echo "Done ✔️"
git push heroku master
echo "Done ✔️"
echo "Saving latest Changes to Gitlab..."
echo "Done ✔️"
git push origin master
echo "Deploying Database..."
heroku pg:backups:restore --confirm hyperskills 'https://hyperskills.herokuapp.com/hyperskills.dump' DATABASE_URL
echo "Finished ✔️✔️✔️"