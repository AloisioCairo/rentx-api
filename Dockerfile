# Capítulo 3 > Continuando a aplicação > Conhecendo o docker > Criando nosso primeiro container e Dockerfile
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]