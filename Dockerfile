FROM node:16-alpine3.16

WORKDIR /app
COPY . /app

# ENV NODE_ENV dev


# RUN npm install
# RUN npm ci --only=procduction 
RUN npm i 
RUN ["npm", "run", "migrate-dev"]


# CMD ["npm", "run", "start"]
CMD ["npm", "run", "watch"]


EXPOSE 3000/tcp
# docker build -t node-alpine .
# docker run -dp 3030:3030 --name su_node node-alpine
# docker run -tid -dp 3030:3030 --name su_node node-alpine

# docker run -dp 3030:3030 --name su_node --network su-app-network node-alpine

# docker volume create <volume-name>
# docker run -dp 3000:3000 -v <volume-name>:/path_in_ur_app <iamge-tag-name>

# docker build -t node-alpine .
# docker run -dp 3030:3030 --name su_node -v app:/home/hossam/Desktop/VS_Work_Station/docker/su_app/api/app node-alpine