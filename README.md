# Hyperskills Reloaded
# Introduction
 We are trying to revive an a project from 3 years ago that consist in create list of stuff you want to improve, focused on Skills as "Make Excercise", Complete some Book, Course or smt like that.

 First step is to make this work, right now Backend works, but Frontend not at the Moment.

# Set Up Project
The root of the Project are divided into `backend` and `frontend`

Backend works with classical Stack: Express+Postgres
Frontend works with Vue2

## Set Up Backend
### Prerequisites
- Docker and docker-compose
- NodeJs >14

Run:
```bash
cd backend
npm i
npm run db:up
```
db:up will set up postgresql and dbmate in a docker container.

then:
```bash
npm run dev
```
And that's all, if you have db and backend ready, if you want to generate the structure tables and data catalogue inside db, run:
```bash
npm run db:migrations:up
```
To know about that go to the *Database Migrations and Seeds* section

# Database Migrations and Seeds
To have a control version and rollback of the Structure and Data cataloge of the database we're using `dbmate` which is a software that takes raw .sql files to make ups and downs.

To create a new file migration run:
```bash
npm run db:migrations:new {name_of_your_migration}
```
Note: dbmate by default creates a file with the user root, so if you are using Linux/SWL when you want to write in the file is going to show error by permissions, change the file permissions by this way for example:
`sudo chown -R eddyuser /home/eddyuser/workflow/`
But you'll need to do this every time you create a new file.


Then to run all migrations just run:
```bash
npm run db:migrations:up
```

Finally to make a rollback from the last migration run:
```bash
npm run db:migrations:down
```

Pending Tech Debt

- [ ] Avoid dbmate to create file with root permissions making unable to write with other users
- [ ] Brush up basic concepts about Javascript Modules to understand better Vite