# P2P Конвертер Валют

Современное веб-приложение для конвертации валют с поддержкой темы, работающее как PWA (Progressive Web App).

## 🎯 Особенности

- ✨ **Vue 3** с Composition API и `<script setup>`
- 📝 **TypeScript** для типизации
- 🎨 **Tailwind CSS** для стилизации
- 🚀 **Vite** для быстрой разработки
- 🍃 **Three.js** для 3D фонового эффекта с частицами дыма
- 📱 **PWA** поддержка для офлайн-использования
- 🌙 **Dark mode** с автоматическим переключением
- 🔄 **Real-time курсы валют** через API ЦБ РФ

## 📦 Структура проекта

```
src/
├── components/          # Vue компоненты
│   ├── P2PCalc.vue     # Главный компонент
│   └── ui/             # UI компоненты
│       ├── CurrencyInput.vue
│       └── CurrencyDisplay.vue
├── composables/        # Vue composition functions
│   └── useCurrency.ts  # Логика работы с валютами
├── services/           # Business logic сервисы
│   └── exchangeRateService.ts
├── types/              # TypeScript типы
│   └── index.ts
├── assets/             # Статические файлы
│   ├── main.css
│   └── logo.svg
├── animate.ts          # Three.js анимация
├── main.ts             # Точка входа
├── App.vue             # Root компонент
└── env.d.ts            # Environment типы
```

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Разработка

```bash
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173) в браузере.

### Сборка для продакшена

```bash
npm run build
```

### Проверка типов

```bash
npm run type-check
```

### Форматирование и линтирование

```bash
npm run lint      # ESLint + Prettier
npm run format    # Только Prettier
```

## 📋 Скрипты

| Команда | Описание |
|---------|----------|
| npm run dev | Запуск dev сервера |
| npm run build | Сборка для продакшена |
| npm run preview | Просмотр собранного проекта |
| npm run lint | Линтирование и форматирование |
| npm run format | Форматирование кода |
| npm run type-check | Проверка TypeScript типов |

## 🛠️ Технологии

- **Frontend Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **CSS**: Tailwind CSS v4
- **3D Graphics**: Three.js
- **Code Quality**: ESLint + Prettier
- **PWA**: Workbox (via vite-plugin-pwa)

## 📝 Конфигурация

### TypeScript

Конфигурация находится в `tsconfig.json` с алиасом пути `@/` для абсолютных импортов.

### ESLint

Конфигурация в `eslint.config.js` с поддержкой:
- Vue 3 с `<script setup>`
- TypeScript
- Prettier интеграция

### Prettier

Настройки в `.prettierrc.json`:
- Без точек с запятой
- Одиночные кавычки
- Ширина строки: 100 символов
- Tab width: 2 пробела

## 🔄 Разработка

### Добавление нового компонента

1. Создайте файл в `src/components/`
2. Используйте `<script setup lang="ts">` синтаксис
3. Экспортируйте типы в `src/types/` при необходимости

### Добавление новой бизнес-логики

1. Создайте composable в `src/composables/` или service в `src/services/`
2. Используйте TypeScript для типизации
3. Импортируйте и используйте в компонентах

## 📱 PWA Поддержка

Приложение работает как PWA:
- Кешируется для офлайн-использования
- Может быть установлено на главный экран
- Синхронизируется при наличии интернета

## 🌐 API

Приложение использует API ЦБ РФ для получения курса доллара:
- URL: `https://www.cbr-xml-daily.ru/daily_json.js`
- Обновляется при загрузке приложения
- Ошибки обрабатываются gracefully

## 📄 Лицензия

MIT
