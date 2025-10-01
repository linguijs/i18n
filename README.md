# Lingui.js i18n
Laravel localization for your JavaScript apps.

This is the main package for Lingui.js. You can use it to translate your Laravel localization on your JavaScript apps.

## Install
```bash
npm i @linguijs/i18n
```

## Basic usage
```ts
import i18n, { __ } from '@linguijs/i18n';

i18n.init({
  locale: 'en', // if not defined we'll try to detect it internally.
  resources: {
    en: {
      messages: {
        welcome: 'Welcome to our application!',
      }
    }
  }
});
// initialized and ready to go!
// i18n is already initialized, because the translation resources where passed via init function
document.getElementById('output').innerHTML = i18n.trans('messages.welcome');
// or you can use the alias
document.getElementById('output').innerHTML = __('messages.welcome');

```

### Generating translations
Please visit the [lingui-laravel](https://github.com/linguijs/lingui-laravel) repo for more informations.

## Documentation
You can follow the same approach as [Laravel Localization](https://laravel.com/docs/12.x/localization) but for JavaScript.
