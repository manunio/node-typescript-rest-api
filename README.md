## Rest api using node + typescript + expressjs

- ### Run mongo db server

```bash
docker run -d --rm --name mongo -p 27017:27017 -v mongodbdata:/data/db \
-e MONGO_INITDB_ROOT_USERNAME=mongoadmin\
-e MONGO_INITDB_ROOT_PASSWORD=12345\
-e MONGO_INIT_DATABASE=rest-api  mongo
```

- ### Create config file

    ```bash
    mkdir config && touch config/default.ts
    ```
    - add following object literal in `config/default.ts`
      ```javascript
      export default {
        port: 1337,
        // https://stackoverflow.com/a/62415405/8512115
        dbUri: "<MONGO DB URL>",
        saltWorkFactor: 10,
        accessTokenTtl: '15m',
        refreshTokenTtl: '1y',
        publicKey: `<PUBLIC KEY>`,
        privateKey: `<PRIVATE KEY>`
      }
      ```

- ### Start dev server

```bash
npm run dev
```
