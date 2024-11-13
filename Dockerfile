FROM node:20-alpine AS build
 
WORKDIR /app-fn
 
COPY package*.json /app-fn/
 
RUN npm install
 
COPY . /app-fn/
 
EXPOSE 3000
 
 
FROM node:20-alpine
 
WORKDIR /app
 
COPY --from=build /app-fn /app
 
CMD ["npm","start"]
