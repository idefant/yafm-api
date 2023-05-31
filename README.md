# YAFM - Backend

YAFM - Yet Another Finance Manager

## Продакшн

1. Скопировать .env.sample в .env
2. Изменить параметры в .env под себя
3. Сбилдить и поднять фронтенд с заданными параметрами на порту 8080:

```sh
docker build -t yafm-backend .
docker run -d -p 8080:8080 yafm-backend
```