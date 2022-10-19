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
Для запуска базы в docker создайте у себя локально файл .env
и добавьте туда переменные
/-----------------------
POSTGRES_PASSWORD=root12
POSTGRES_USER=admin
POSTGRES_DB=poker_game_user
DATABASE_URL="postgresql://admin:root12@localhost:5432/poker_game_user?schema=public"
PORT=4000
JWT_ACCESS_SECRET=jwt-secret-key
JWT_REFRESH_SECRET=jwt-refresh-secret-key
CLIENT_URL=http://localhost:3000
/-------------------------------------------------------------------
потом запустите команду docker-compose up 
поднимется база 
в docker будет написано что вы сконнектились с базой 
после коннекта с базой открываете новый терминал
вводите команду npx prisma migrate dev - эта команда подтянет таблицы которые указаны в схеме prisma
 как прошел migrate  введите команду npx prisma studio и там будут таблицы которые указаны в схеме
 
 остановить  docker - docker-compose stop
 остановить и удалить образ docker -  docker compose down



