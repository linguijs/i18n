import lingui, { __, choice, setLocale } from '../src';
import { exampleOfModule } from './exampleOfModule';
import en from './lang/en.json';
import pt from './lang/pt.json';

lingui.use(exampleOfModule).init({
  locale: 'pt',
  resources: { en, pt },
});

lingui.l10n.on('changeLocale', (locale) => {
  console.log('locale changed to: ', locale);
});

console.log(
  __('not.exist'), // Should return 'not.exist'
);

console.log(
  __('auth.failed'), // Should return 'Estas credenciais não correspondem aos nossos registros.'
);

console.log(
  __('Hello :Name. Welcome back!', { name: 'max' }), // Should return 'Olá Max. Bem-vindo de volta!'
);
console.log(
  __('Hello :NAME. Welcome back!', { name: 'max' }), // Should return 'Olá MAX. Bem-vindo de volta!'
);

setLocale('en');

console.log(
  choice('There is one apple|There are many apples', 1), // Should return 'There is one apple'
);
console.log(
  choice('There is one apple|There are many apples', 2), // Should return 'There are many apples'
);

console.log(
  choice('messages.apples', 0), // Should return 'There are none'
);
console.log(
  choice('messages.apples', 15), // Should return 'There are some'
);
console.log(
  choice('messages.apples', 25), // Should return 'here are many'
);
