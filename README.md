# chat-room

## Quick Start
1. `git clone https://github.com/yunhsuanchin/Chat_Room.git`
2. `cd Chat_Room`
3. `docker compose build`
4. `docker compose up`
5. `docker exec -it myapp bash`
6. `node client.js`
7. You can start live chatting now!

## Chat App Manual
1. After `What's Your Name?` shows up, type a name you wanna use in this chat app.
2. Then the app would ask for your purpose, to chat with someone in private or to join a chat room.
3. You could say "Room" to get the available room list, then type in the room name you wanna join in. Or on the other hand, you could just type a friend's name and see if he is online.
4. When get into the room, you'll see the words pop up: "You Have Successfully Joined xxx Room.", or seeing "xxx Is Available Now, You Could Start Chatting." meaning that you can start chatting now!



## Directory

```
tokenize
├─ Dockerfile 
├─ README.md
├─ app.js                                       project entry point
├─ client.js                                          client server
├─ config                       store env variables & db connection
│  ├─ config.js
│  ├─ env
│  └─ mongoose.js
├─ controllers          could be developd as api service controller
│  └─ chatRoomController.js
├─ docker-compose.yml
├─ loaders                              loaders for startup modules
│  ├─ redisAdaptor.js
│  └─ userHandler.js
├─ middleware
│  └─ responseHandler.js
├─ models                                     database table schema
│  └─ mongodb
│     ├─ chatRoom.js
│     ├─ message.js
│     ├─ seedData
│     │  ├─ chatRoomData.json
│     │  └─ userData.json
│     ├─ seeds                              
│     │  └─ seeders.js
│     └─ user.js
├─ package.json
├─ repositories                                handle database CRUD
│  └─ mongoDB
│     ├─ chatRoomRepository.js
│     ├─ messageRepository.js
│     └─ userRepository.js
├─ routers                                           router modules
│  ├─ index.js
│  └─ modules
│     └─ chatRoom.js
├─ services                                   handle business logic
│  ├─ chatRoomService.js
│  └─ userService.js
├─ src                                                 source files
│  └─ messages
│     ├─ botMessages.js
│     └─ clientMessages.js
├─ utils                                           helper functions
│  └─ helpers.js
└─ wait-for-it.sh

```
