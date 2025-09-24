# Lingui

Lingui.js lets you use your Laravel localization on JavaScript.

## Install
```bash
npm i lingui

```

## Setup
```ts
// app.ts
import en from './lang/en.json';
import pt from './lang/pt.json';

lingui.init({
  locale: 'pt',
  resources: { en, pt },
});

```

Then, you can use translations in any place of your application.
```tsx
// pages/welcome.tsx
import { __, choice } from 'lingui';

export default function Welcome() {
  return (
    <p>
      {__('Welcome :NAME! ', { name: 'John' })}
      {choice('{0} All clear.|{1} You have :count message to read.|[2,*] You have :count messages to read.', 5)}
    </p>
  );
}
```

## API
- `default`: Lingui singleton
- `trans(key, replases?, locale?)`: Translate using a key or string literal with placeholders
- `transChoice(key, number, replaces?, locale?)`: Pluralization translate based on `number` and current `locale`
- `__`: Alias of `trans`
- `choice`: Alias of `transChoice`
- `setLocale(locale)`: Change the current locale
- `currentLocale()`: Get the current locale

### Modules
```ts
lingui
  .use({
    type: '3rdParty',
    init(instance) {
      // init hook
    },
  })
  .init({ resources: { en, pt } });
```
