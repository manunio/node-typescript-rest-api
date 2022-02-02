# Rest api using node + typescript + expressjs

## run mongo db server
```bash
docker run -d --rm --name mongo -p 27017:27017 -v mongodbdata:/data/db \
-e MONGO_INITDB_ROOT_USERNAME=mongoadmin\
-e MONGO_INITDB_ROOT_PASSWORD=12345\
-e MONGO_INIT_DATABASE=rest-api  mongo

```
## start dev server
```bash
npm run dev
```
