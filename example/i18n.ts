import en from './lang/en.json';
import pt from './lang/pt.json';
import lingui, { __, choice, setLocale, currentLocale } from '../src';
import { exampleOfModule } from './exampleOfModule';

lingui
  .use(exampleOfModule)
  .init({
    locale: 'pt',
    resources: { en, pt }
  });

lingui.l10n.on('changeLocale', (locale) => {
  console.log('locale changed to: ', locale);
});

console.log(
  __('not.exist') // Should return 'not.exist'
);

console.log(
  __('auth.failed') // Should return 'Estas credenciais não correspondem aos nossos registros.'
);

console.log(
  __('Hello :Name. Welcome back!', { name: 'max' }) // Should return 'Olá Max. Bem-vindo de volta!'
);
console.log(
  __('Hello :NAME. Welcome back!', { name: 'max' }) // Should return 'Olá MAX. Bem-vindo de volta!'
);

setLocale('en');

console.log('currentLocale', currentLocale()); // 'en'

console.log(
  choice('There is one apple|There are many apples', 1) // Should return 'Há uma maçã'
);
console.log(
  choice('There is one apple|There are many apples', 2) // Should return 'Há várias maçãs'
);

console.log(
  choice('messages.apples', 0) // Should return 'Não há nenhuma'
);
console.log(
  choice('messages.apples', 15) // Should return 'Há algumas'
);
console.log(
  choice('messages.apples', 25) // Should return 'Há muitas'
);
