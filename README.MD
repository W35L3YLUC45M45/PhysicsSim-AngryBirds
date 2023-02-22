# Angry Birds

- Nivells llegits per JSON: Els JSON son llegits al carregar el programa, i cada un dels nivells és carregat al ser seleccionat.
- Llençament de l'ocell des del tirador: S'ha fet que els ocells només surtin quan l'origen es troba situat en el tiraxines.
- Sistema de puntuació: S'ha creat un simple sistema de puntuació basat en "ocells disponibles". Quants més porcs derrotis més ocells podràs llençar. Si et quedes sense punts, perds. L'objectiu és aconseguir la màxima puntuació possible.
- Creació d'ocells bàsics: S'han creat tots dos ocells simples. L'ocell gran es caracteritza per tenir un radi més ample.
- Cada tipus de bloc (fusta, gel, ferro): S'han creat tots tres blocs simples. El bloc de fusta no té cap característica especial, mentre que el de gel té mens fricció i el de metall costa més cops de trencar.
- Cada tipus de porc (normal, casc): S'han creat tots dos tipus de porcs bàsics. Tot i que per a ser derrotats necessites portar un mínim de velocitat, el porc amb casc té més vida.
- Menú de selecció de nivells: S'ha implementat un senzill gestor d'estats que permet l'intercanvi entre els menús i els diferents nivells.
- Estètica, imatges (inclosos els canvis de sprites al xocar): S'ha intentat mantenir la mateixa estètica en tot el programa, amb l'afegit dels canvis en els blocs i porcs segons la vida/durabilitat del mateix.
- Cada ocell especial (groc, blau): S'han implementat tots dos ocells especials. El groc trenca abans la fusta i té l'habilitat d'anar més ràpid, mentre que el blau trenca abans el gel a la vegada que té l'habilitat de separar-se en tres.
- Cada ocell inventat: S'han implementat dos nous ocells inventats. L'ocell "random", del qual no se sap quina és la seva habilitat fins que s'activa, i el "bomba", que té la mateixa implementació que la TNT (explosió).
- Cada bloc inventat: S'han implementat dos nous blocs. La lava, la qual mata l'ocell en ser tocat, i la "bedrock", la qual és un bloc indestructible i immòbil;
- Implementar TNT: S'ha implementat la TNT i la seva explosió, la qual fa mal als blocs i porc del seu voltant a la vegada que els envia volant.
