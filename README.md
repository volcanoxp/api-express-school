
# STEPS TO DEPLOY THIS API

1. Copy the file `.env.example` with the name .env and configure according to your needs or use the default configuration.
```
api-express-school> cp .env.example .env
```
2. Execute the docker compose
```
api-express-school> docker-compose up -d
```
3. Run the initial configuration for the database
```
api-express-school> docker exec -i api-express-school_db_1 psql -U postgres -d school < database/tables.sql
```
4. Start testing the APIs
```
api-express-school> curl http://localhost:3001/test
```

## Documentation of API
https://app.swaggerhub.com/apis/volcanoxp/api-school/1.0.0