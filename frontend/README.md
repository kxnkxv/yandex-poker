# Online Poker app for Yandex.Practicum

![img.png](https://oviland.ru/storage/ya-poker.png)

## Setup

Clone the repo:

    git clone https://github.com/AIG-GAMING/Poker.git

Move to the project path:

    cd Poker

Install dependencies:

    npm install

Run the project:

    npm run start

Project will be available at http://localhost:3000
Backend:
Open file backend
npm install
Run server:
npm start - start server
Develop:
npm run dev - developer mode start

Docker db:
run docker container
docker compose up
create .env file backend
write
DATABASE_URL="postgresql://admin:root12@localhost:5432/poker_game_user?schema=public"
PORT=4000
JWT_ACCESS_SECRET=jwt-secret-key
JWT_REFRESH_SECRET=jwt-refresh-secret-key
CLIENT_URL=http://localhost:3000
