m[a] sa prelozi na m.safeget[a]

safeget sa musi vytvorit v Object.prototype, zatial polyfill, neskor moznost dodat do kazdeho
prekladaneho snipetu

use Symbol.for('safeget') instead of just string

chceme 'safegetitem' a 'safegetattr'

testy by mali testovat funkcnost, nie presny tvar kodu

checknut ako je to s podporou 'assert' ak take nie je a nebude, pouzit new Error()

customizovat error hlasku: aky kluc sa snazi getnut, ake kluce ma dany objekt, akeho typu (aspon
heuristicky) je dany objekt

use node.directives na check, ci program zacina 'use superstrict', 

v buducnosti chceme tri possible pravania:
- opt in (prekladaj iba subory s direktivou 'use superstrict') (dnesny default)
- opt out (prekladaj vsetky subory okrem tych s direktivou 'use !superstrict')
- prekladaj vsetko

eslint, integrate this with your editor

to think about: destructuring, proxies

one more thing: use es6 features!
- import instead of require
- (arrow) => functions
- let, const



