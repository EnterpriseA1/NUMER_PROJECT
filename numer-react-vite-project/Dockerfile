FROM node:20-alpine

WORKDIR /numer-react-vite-project/src/main

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]