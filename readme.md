## Installation
*All source is in dev environment by default*
### Generate env file

Before start, need to copy .env.example to .env.{NODE_ENV}

- Database information for demo, information from docker-compose.yml

mysql
```
DB_CONNECTION=mysql
DB_HOST=mysql_db
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=secret071
DB_DATABASE=salary
```
mongodb
```
DB_CONNECTION=mongodb
DB_HOST=mongo_db
DB_PORT=27017
DB_USERNAME=admin
DB_PASSWORD=secret071
DB_DATABASE=salary
```

### Run docker
>docker-compose up

### Migration and seed
After docker, open server_node cli to generate migration and seed

By default, when not any option, it runs all files in dev environment
- Migration
>npm run migrate

- Seed
>npm run seed
 
```
options: 
- file={filename}      : run only the file
- env={dev|prod|test}  : run in the environment

example: run create_mst_config_table.js in test environment
|npm run migrate file=create_mst_config_table env=test
```

