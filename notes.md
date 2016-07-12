## Co by bolo este fajn na plugine spravit

- (done) bolo by fajn, keby platilo, ze kod, ktory beha v superstricte sa moze v produkcii pouzit bez tohto
  pluginu. Inymi slovami, chceme iba zakazovat niektore typy spravani ale nie menit existujuce. Z
  tohto vyplyva, ze chceme dropnut preklad 'in'. Za toto sa ospravedlnujem, povodne som si myslel ze
  to bude strasne cool, teraz sa mi ale skor javi, ze to nestoji za to.

- (done) k bodu vyssie, je este nieco, kde menime semantiku? Som si vedomy toho, ze pri resolvovani `.` a
  `[]` robime binding this (taky, ako by jeden cakal), s tym asi treba zit. Menime este nieco?

- (minor) namiesto `in` by sme mohli povolit:

  ```
  obj.prop == null
  ```
  (pricom na attribute access moze byt pouzite . alebo [], moze byt pouzite == alebo === a null moze
  byt vlavo alebo vpravo rovnosti)

- (done) naming. Mohli by sme zaviest python-like mangling name convention, teda, vsetky nase metody a
  symboly by sa mohli volat `_superstrict__${name}`. Toto je hlavne s cielom vyhnut sa name
  koliziam, ktore nam dnes hrozia (napr. ak si user pomenuje svoju funkciu `safeGetItem`, mame
  problem.

- (done) premenovat 'opt in', a 'opt out'. Je cudne, ked v nazve enum hodnoty mame medzeru. Nie je to mozno
  najidealnejsie, ale spravil by som to konzistentne s destructuring pluginom, teda 'optin' a
  'optout'

- (done) sensible defaults pre options. Option 'safeGetFilePath' by mal byt defaultne nastaveny na
  `babel-plugin-superstrict/lib/safe_get.js`, `checkCastingFilePath` analogicky. Dalej, ja by som
  zlucil tieto dva subory do jedneho: `superstrict_runtime.js`. Pokial by hrozilo ze tento subor
  bude privelky, vzdy moze requirovat a reexportovat funkcie z pomocnych suborov.

- jeden vacsi test. Hned ako som skusil plugin pouzit na realnom kode, dostal som kopu chyb (vid
  moje posledne commits), ktore drobne unit testy nezachytili. Chcel by som test, ktory bude
  vyuzivat komplikovanejsi setup babelu (nejake standardne presety) a kod, ktory bude pozostavat z
  viacerych suborov (teda, otestovat require).

- checkovanie poctu argumentov funkcii. Toto je (dufam) jedina big feature co si myslim ze by sme
  este chceli.

## Checkovanie poctu argumentov funkcii

definovanie funkcii sa prelozi nasledovne:

```var foo = (args) => body```

sa prelozi na

```var foo = defineFn(fn, argList) // meno bude manglovane```

pricom argList je nejaky rozumny symbolicky zapis zoznamu argumentov, ktore `fn` berie. Funkcia
`defineFn` bude potom implementovana zhruba takto:

```
function defineFn(fn, argList) {
  fn._superstrict__argList = argList
  return fn
}
```

podobe volanie funckii sa prelozi nasledovne:

```
fn(a1, a2)
```

sa prelozi na

```
callFn(fn, [a1, a2])
```

funkcia `callFn` pred zavolanim skontroluje, ci argumenty s ktorymi volame funkciu sedia s `fn._superstrict__argList` a az potom zavola funkciu.

Misc:

- neviem ako toto bude hrat s hoistingom premennych ale to ma az tak netrapi
- v `argList` by malo byt zachytene aj to, ci dany parameter ma defaultnu hodnotu alebo nie. Pokial
  pri volani `fn` da user menej hodnot nez ma funkcia argumentov, je to OK, pokial nezadane
  argumenty maju defaultne hodnoty
- definicia `fn` moze obsahovat rest parameter, teda `function fn(a1, a2, ...other)`. V tomto
  pripade je OK, pokial pri volani da user >= 2 argumenty.
