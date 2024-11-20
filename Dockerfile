FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./

RUN npm ci
RUN npm install @babel/plugin-proposal-private-property-in-object --save-dev
COPY . .
RUN npm run build
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["npm", "start"]
