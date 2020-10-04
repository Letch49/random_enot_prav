# random_ЕНОТ_ПРАВ

### Как запустить сервер (dev окружение):

Установить python3, pip3

> python3 -m pip install --user virtualenv
>
> python3 -m venv venv
>
> source env/bin/activate
>
> pip3 install -r requirements.txt // установка зависимостей
>
> python3 manage.py migrate
>
> python3 manage.py runserver 0.0.0.0:80
>
PROFIT!

### Как запустить фронтенд (dev окружение)

скачать nodejs >= 12

> npm i || yarn install - // установка зависимостей
>
> необходимо переименовать API_URL в /web-app/src/api/request на IP адрес или доменное имя сервера
> 
> yarn start 
>
PROFIT!
