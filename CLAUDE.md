# P2P Конвертер Валют - Документация для разработчиков

## 📋 Обзор проекта

P2P Конвертер Валют - это современное веб-приложение на Vue 3 + TypeScript для конвертации валют с красивым 3D фоном на Three.js. Приложение работает как PWA и может быть использовано офлайн.

## 🏗️ Архитектура

### Слои приложения

1. **Компоненты** (`src/components/`)
   - `P2PCalc.vue` - главный компонент приложения
   - `ui/CurrencyInput.vue` - переиспользуемый input компонент
   - `ui/CurrencyDisplay.vue` - отображение результатов конвертации

2. **Composables** (`src/composables/`)
   - `useCurrency.ts` - управление состоянием валют и расчетами

3. **Services** (`src/services/`)
   - `exchangeRateService.ts` - получение актуальных курсов валют с API ЦБ РФ

4. **Types** (`src/types/`)
   - Общие TypeScript типы для всего приложения

5. **Анимация** (`src/animate.ts`)
   - Three.js фон с 3D эффектом частиц дыма

## 🔄 Поток данных

```
API ЦБ РФ
    ↓
exchangeRateService.ts (fetch & parse)
    ↓
useCurrency composable (state management)
    ↓
P2PCalc.vue (main component)
    ↓
CurrencyDisplay.vue + CurrencyInput.vue (UI)
```

## 📝 Стандарты кода

### TypeScript

- Используется `strict: true` в tsconfig.json
- Все функции и компоненты должны иметь типы
- Импорты используют абсолютные пути с `@/` алиасом

### Vue 3

- Используется `<script setup>` синтаксис
- Composition API для логики компонентов
- Реактивность через `ref`, `computed`, `reactive`

### Стилизация

- Tailwind CSS для стилей
- Классы пишутся в template
- Dark mode поддерживается автоматически через `dark:` префиксы

### Форматирование

- ESLint для проверки кода
- Prettier для форматирования
- Запускается автоматически через pre-commit hook (husky)

## 🚀 Команды разработки

```bash
# Установка
npm install

# Разработка
npm run dev           # Запуск dev сервера с горячей перезагрузкой
npm run type-check    # Проверка TypeScript типов
npm run lint          # ESLint + Prettier форматирование
npm run format        # Только Prettier форматирование

# Продакшн
npm run build         # Сборка с type-check
npm run preview       # Просмотр собранного проекта локально
```

## 📦 Зависимости

### Production
- `vue@^3.5.34` - фреймворк
- `three@^0.184.0` - 3D графика

### Development
- TypeScript, ESLint, Prettier - code quality
- Vite - build tool
- Tailwind CSS - стилизация
- vite-plugin-pwa - PWA поддержка
- vue-tsc - type checking

## 🔧 Конфигурация

### tsconfig.json
- Target: ES2020
- Module: ESNext
- Strict mode включен
- Пути: `@/*` → `./src/*`

### vite.config.ts
- Порт: 5173 (по умолчанию)
- Three.js отделен в отдельный chunk для оптимизации
- PWA конфигурация с манифестом

### .eslintrc / eslint.config.js
- Vue 3 + TypeScript поддержка
- Prettier интеграция
- `vue/multi-word-component-names` отключен

## 📊 Состояние компонентов

### useCurrency composable

```typescript
const {
  rub,              // ref: текущая сумма в рублях
  rates,            // ref: текущие курсы обмена
  usdt,             // computed: сумма в USDT
  kzt,              // computed: сумма в KZT
  course,           // computed: курс KZT/RUB
  isLoading,        // ref: статус загрузки
  error,            // ref: ошибка при загрузке
  loadExchangeRate, // функция: загрузить курс с API
  updateRates,      // функция: обновить курсы вручную
  setRubAmount,     // функция: установить сумму в рублях
} = useCurrency(initialRates)
```

## 🌐 API

### exchangeRateService.fetchUSDRate()

Получает текущий курс USD/RUB с API ЦБ РФ.

```typescript
const rub2usdt = await ExchangeRateService.fetchUSDRate()
```

- **URL**: `https://www.cbr-xml-daily.ru/daily_json.js`
- **Returns**: number - курс доллара в рублях
- **Error handling**: выбрасывает исключение при ошибке

## 🎨 Цвета и темы

- Background: `bg-white dark:bg-slate-900`
- Text: `text-white`
- Borders: `border-slate-300 dark:border-slate-600`
- Hover/Focus: `focus:border-blue-600`

## 🔐 Безопасность

- Используется fetch с проверкой статуса ответа
- Нет обработки пользовательского ввода критичного типа
- CORS обрабатывается браузером
- PWA работает в безопасном контексте (HTTPS)

## 📱 PWA

- Регистрация service worker через Workbox
- Кеширование статических ассетов
- Автоматическое обновление при доступности новой версии
- Установка на главный экран (Android/iOS)

## 🐛 Отладка

### VS Code Extensions (рекомендуемые)
- Volar (Vue 3)
- ESLint
- Prettier

### Отладка в браузере
- Vite sourcemaps включены в dev режиме
- Vue DevTools для инспекции компонентов
- DevTools Network для отладки API запросов

## 📚 Дополнительные ресурсы

- [Vue 3 Docs](https://vuejs.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Three.js Docs](https://threejs.org/docs/)

## 🤝 Контрибьютинг

При добавлении новых функций:

1. Создавайте типы в `src/types/`
2. Логику помещайте в composables или services
3. Компоненты должны быть максимально простыми
4. Запускайте `npm run lint` перед коммитом
5. Используйте абсолютные пути `@/` для импортов

## 📄 Лицензия

MIT
