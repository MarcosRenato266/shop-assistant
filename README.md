# shop-assistant

## todo 
Critical hit change ninja 20% (+20%) alterar formato model de heroi
eva ninja 20% (+20%) alterar formato model de heroi
verificar se todos os nomes de category em slots estao corretos
tratar todos os nomes para serem usados sempre em minusculo

## Run Server
- install postgree
- create env based on .env-sample
- `yarn` to install 
- `api/src/index.js` change `RESET_DB` to true to setup the database, itens and heroes
- `yarn dev` to run
- access `http://localhost:4100/updateList` to update item list and categories
- access `http://localhost:4100/downloadAllImages` to download all images to `api/src/utils/images` and move then to `public` on `app` folder

## Run App
- `yarn`
- `yarn dev`