FROM node:18

RUN adduser --system --group --no-create-home nonroot

RUN apt-get update && apt-get install -y curl build-essential

WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
RUN npm install && npm run build


EXPOSE 3000 9229
USER nonroot
CMD [ "node", "dist/main.js"]
