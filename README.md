# 📒 Accounts Management App

## 📋 Описание проекта
Это **демо-приложение для управления учётными записями**, написанное на **Vue 3 + Pinia + Vee Validate + shadcn-vue + Zod**.  


Основной функционал:
- 📑 **Добавление/удаление** учетных записей  
- ✅ **Валидация** обязательных полей (логин, пароль для локальных аккаунтов)  
- 🔄 **Автосохранение** данных в Pinia + LocalStorage  
- 🧩 **Разделение на компоненты** (`AccountsHeader`, `AccountsForm`, `AccountRow`)  
- 🧪 **Тесты** на utils, схему, стор и интеграцию Header→Form  
- 🐳 **Docker-сборка** с Nginx для прод-версии  

---

## 🛠️ Стек
- **Vue 3**, **Pinia**, **Vee Validate**, **Zod**
- **shadcn-vue** (UI-компоненты)
- **Vitest** + **@vue/test-utils** для тестов
- **Docker** + **Nginx** для деплоя

---

## 🚀 Запуск локально (dev)

1. Клонируйте репозиторий  
   ```bash
   git clone https://github.com/yourname/accounts-app.git
   cd accounts-app
   ```

2. Установите зависимости  
   ```bash
   pnpm install
   ```
   (или `npm install` если без pnpm)

3. Запустите dev-сервер  
   ```bash
   pnpm dev
   ```
   По умолчанию Vite поднимет сервер на **http://localhost:5173** (порт 5173).

---

## 🧪 Прогон тестов

```bash
pnpm test:unit
```

Тесты utils, схемы, стора и интеграции Header→Form.

---

## 🐳 Запуск через Docker

1. Соберите контейнер и запустите:
   ```bash
   docker compose up --build -d
   ```
2. Приложение откроется на **http://localhost:8080** (порт можно поменять в `docker-compose.yml`).

3. Остановить:
   ```bash
   docker compose down
   ```

---

## 🐳 Прогон тестов в Docker (опционально)

Если настроен `test` stage:
```bash
docker compose --profile test up --build --abort-on-container-exit test
```

---

## 📂 Структура проекта (главное)
```
src/
 ├─ features/accounts/
 │   ├─ model/        # store, schema
 │   ├─ ui/           # компоненты UI
 │   ├─ utils/        # parseLabels, etc.
 │   └─ __tests__/    # юнит и интеграционные тесты
 ├─ shared/ui/        # общие UI-компоненты (shadcn-vue)
```



