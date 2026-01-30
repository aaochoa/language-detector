/**
 * Spanish texting slang and informal abbreviations
 *
 * Contains:
 * - Greetings & Farewells
 * - Questions & Responses
 * - Common Responses
 * - También / Tampoco
 * - Bien / Mal
 * - Verbs (Estar, Tener, Poder, Querer, Hacer, Ir/Venir, Saber/Conocer, Decir, Necesitar, Esperar, Other)
 * - Time Expressions
 * - Pronouns & Articles
 * - Places & Directions
 * - Emotions & Reactions
 * - Positive Expressions
 * - Negative Expressions
 * - Problems & Help
 * - Tech & Contact
 * - Money & Business
 * - Regional variations (Mexican, Spanish, Argentine, Colombian, Chilean, Venezuelan,
 *   Caribbean, Central American, Peruvian, Ecuadorian, Bolivian)
 * - Common Phrases (Multi-word)
 * - Spanglish (English words in Spanish context)
 *
 * Total terms: ~1800+
 */

const SPANISH_SLANG = new Set([
   // === Greetings & Farewells ===
   'hola',
   'ola',
   'ols',
   'oli',
   'olaa',
   'olass',
   'olaaaa',
   'holaa',
   'holaaa', // hola
   'wena',
   'wenas',
   'bnas',
   'bns',
   'buenass', // buenas
   'weno',
   'bno',
   'beno',
   'wenoo', // bueno
   'chao',
   'chau',
   'xao',
   'chauu',
   'chauuu', // adiós
   'bai',
   'bayy', // bye (borrowed)
   'adios',
   'aios',
   'adioss', // adiós
   'saludos',
   'salu2',
   'slud',
   'saludoss', // saludos
   'ey',
   'eyyy',
   'eyy', // hey
   'holis',
   'holiss', // hola cute
   'kiubo',
   'quiubo',
   'qiubo', // what's up (Colombia)
   'quibo',
   'qbo', // what's up

   // === Questions & Responses ===
   'q',
   'k',
   'ke',
   'komo',
   'kmo',
   'qe', // que, como
   'xq',
   'pq',
   'xk',
   'pk',
   'porq',
   'xqe',
   'pke',
   'xqq',
   'porke', // porque
   'xfa',
   'porfa',
   'porfis',
   'xfis',
   'pfa',
   'porfaa',
   'porfaaa',
   'porfitas', // por favor
   'kien',
   'qien',
   'kn',
   'qn',
   'quien', // quien
   'kual',
   'cual',
   'kl',
   'ql', // cual
   'kuando',
   'cuando',
   'knd',
   'qndo',
   'cuand', // cuando
   'kiero',
   'qiero',
   'kero',
   'qro', // quiero
   'komo',
   'como',
   'km',
   'cmo', // como
   'adonde',
   'adnd',
   'aonde', // adonde
   'cuanto',
   'qnto',
   'knto', // cuanto
   'q onda',
   'k onda',
   'qonda',
   'konda', // what's up

   // === Common Responses ===
   'si',
   'sip',
   'sii',
   'siii',
   'siiii',
   'sep',
   'seep',
   'siii', // sí
   'no',
   'nop',
   'nel',
   'naa',
   'naaa',
   'noooo',
   'nooo', // no
   'oki',
   'okis',
   'okas',
   'okei',
   'okey',
   'okiii',
   'okiis', // okay
   'va',
   'vale',
   'vle',
   'vaa',
   'vaale',
   'vaaale', // vale
   'dale',
   'dlee',
   'dl',
   'dalee',
   'daleee', // dale
   'claro',
   'clro',
   'klro',
   'klaroo',
   'claroo', // claro
   'obvio',
   'obvi',
   'ovio',
   'obvioo', // obvio
   'enserio',
   'neta',
   'deveras',
   'dvras',
   'nserio',
   'enseeri', // en serio
   'seguro',
   'sgro',
   'seguroo', // seguro
   'simon',
   'simn',
   'simonn',
   'simoon', // simón (yes - Mexican)
   'nel',
   'nela',
   'nelp',
   'nelas',
   'nelda', // nel (no - Mexican)
   'yap',
   'yaps',
   'yapps', // ya pues
   'aps',
   'apss', // a pues
   'eso',
   'esoo',
   'esooo', // that's it
   'listo',
   'lsto',
   'listoo', // ready/done
   'hecho',
   'xo',
   'xoo', // done
   'verdad',
   'vdd',
   'vrdd',
   'vrdad', // truth/right?
   'cierto',
   'crto',
   'sierto', // true
   'ajam',
   'aja',
   'ajaa',
   'ajá', // uh-huh
   'mmm',
   'mmmm',
   'mmhmm', // thinking
   'pss',
   'pues',
   'ps',
   'pz', // pues

   // === También / Tampoco ===
   'tb',
   'tmb',
   'tbn',
   'tambien',
   'tmbn',
   'tmbien',
   'tambn', // también
   'tpc',
   'tmpco',
   'tampoko',
   'tmpoco', // tampoco

   // === Bien / Mal ===
   'bn',
   'bnm',
   'vien',
   'bien',
   'mui bn',
   'mbn',
   'vn',
   'bienn', // bien
   'ml',
   'mal',
   'mla',
   'mall', // mal
   'mas o menos',
   'msomenos',
   'maso',
   'mso',
   'masomenos',
   'masomns', // más o menos
   'regular',
   'reg',
   'rglr', // regular
   'fatal',
   'ftl', // fatal
   'excelente',
   'exc',
   'xlnte', // excellent
   'perfecto',
   'perfec',
   'prfcto',
   'perfcto', // perfect
   'genial',
   'jenial',
   'gniaal', // great
   'chevere',
   'xvre',
   'chvr',
   'cheveree', // great (Latin Am)

   // === Verbs - Estar ===
   'sta',
   'stas',
   'tas',
   'taz',
   'staz',
   'stass', // está, estás
   'stoy',
   'toy',
   'toi',
   'estoi',
   'toii', // estoy
   'stamos',
   'tamos',
   'tamoss', // estamos
   'stan',
   'estan',
   'stann', // están
   'staba',
   'taba', // estaba
   'stuve',
   'tuve', // estuve

   // === Verbs - Tener ===
   'tngo',
   'tng',
   'tengo',
   'teno',
   'tngoo', // tengo
   'tnes',
   'tienes',
   'tiens',
   'tness', // tienes
   'tnemos',
   'tenemos',
   'tnemoss', // tenemos
   'tiene',
   'tne', // tiene
   'tenia',
   'tnia', // tenía

   // === Verbs - Poder ===
   'pdo',
   'puedo',
   'pwedo',
   'pdoo', // puedo
   'pdes',
   'puedes',
   'pdess', // puedes
   'puede',
   'pde', // puede
   'podemos',
   'pdmos', // podemos

   // === Verbs - Querer ===
   'kiero',
   'qiero',
   'kero',
   'quiero',
   'kieroo', // quiero
   'kieres',
   'qieres',
   'qres', // quieres
   'keria',
   'qeria', // quería
   'keremos',
   'qremos', // queremos

   // === Verbs - Hacer ===
   'acer',
   'hacer',
   'hcer',
   'acerr', // hacer
   'aces',
   'haces',
   'acess', // haces
   'ago',
   'hago',
   'agoo', // hago
   'hice',
   'ice',
   'hizoo', // hice/hizo
   'haria',
   'aria', // haría
   'haciendo',
   'aciendo',
   'asiendo', // haciendo

   // === Verbs - Ir/Venir ===
   'vms',
   'vmos',
   'vamos',
   'vamoss', // vamos
   'voy',
   'voi',
   'voii', // voy
   'vas',
   'vass', // vas
   'ven',
   'vengo',
   'vngo',
   'vengoo', // ven, vengo
   'vienes',
   'vnes', // vienes
   'iba',
   'ivaa', // iba
   'ire',
   'iré', // iré
   'vamonos',
   'vamosnos',
   'vamonoss', // vámonos

   // === Verbs - Saber/Conocer ===
   'sé',
   'se',
   'c',
   'seee', // sé
   'sabes',
   'sbs',
   'sabs',
   'sabess', // sabes
   'sabe',
   'sb', // sabe
   'sabemos',
   'sbmos', // sabemos
   'sabia',
   'sbia', // sabía
   'conozco',
   'conzco',
   'conoskoo', // conozco
   'conoces',
   'cnces', // conoces

   // === Verbs - Decir ===
   'digo',
   'dgo',
   'digoo', // digo
   'dices',
   'dces',
   'dicess', // dices
   'dice',
   'dce',
   'dicee', // dice
   'dije',
   'dje', // dije
   'dijo',
   'djo', // dijo
   'decir',
   'dcir', // decir
   'diciendo',
   'dciendo', // diciendo

   // === Verbs - Necesitar ===
   'ncsito',
   'ncesito',
   'necesito',
   'nece',
   'nec',
   'ncsitoo', // necesito
   'ncsitas',
   'necesitas',
   'ncsitass', // necesitas
   'necesitooo', // necesito (emphasis)

   // === Verbs - Esperar ===
   'spera',
   'spra',
   'espera',
   'speraa', // espera
   'sperando',
   'esperando',
   'sperandoo', // esperando
   'espero',
   'spero',
   'spro', // espero
   'esperame',
   'sperame', // espérame

   // === Verbs - Other Common ===
   'creo',
   'croo',
   'kreoo', // creo
   'crees',
   'krees', // crees
   'parece',
   'parce',
   'parese', // parece
   'mira',
   'miraa',
   'mra', // mira
   'miro',
   'mroo', // miro
   'oye',
   'oyee',
   'oie', // oye
   'escucha',
   'skucha', // escucha
   'llama',
   'yama',
   'yamaa', // llama
   'llamo',
   'yamo', // llamo
   'dame',
   'dmee', // dame
   'dime',
   'dimee', // dime
   'dejame',
   'djame', // déjame
   'pasame',
   'pasme', // pásame
   'mandame',
   'mndame', // mándame
   'escribeme',
   'escrbeme', // escríbeme
   'hablame',
   'ablame', // háblame
   'cuentame',
   'quentame', // cuéntame
   'explica',
   'explkaa', // explica
   'entiendo',
   'ntiendo', // entiendo
   'entiendes',
   'ntiendes', // entiendes
   'recuerda',
   'rkuerda', // recuerda
   'acuerdate',
   'akuerdate', // acuérdate
   'olvidar',
   'olvidr', // olvidar

   // === Time Expressions ===
   'aora',
   'ora',
   'ahora',
   'ahorita',
   'orita',
   'aoritaa',
   'ahoraa', // ahora
   'dspues',
   'despues',
   'dps',
   'dpues',
   'despuess', // después
   'manana',
   'mñn',
   'mñna',
   'mañanaa', // mañana
   'ayer',
   'ayr',
   'ayerr', // ayer
   'hoy',
   'oyy', // hoy
   'smpre',
   'siempre',
   'siempr', // siempre
   'nunk',
   'nunka',
   'nunca',
   'nunkaa', // nunca
   'tarde',
   'trd',
   'tardee', // tarde
   'noxe',
   'nox',
   'noche',
   'nochee', // noche
   'madrugada',
   'madruga',
   'madrugadaa', // madrugada
   'temprano',
   'tempranoo',
   'tmprno', // temprano
   'pronto',
   'prontoo',
   'prntoo', // pronto
   'luego',
   'lgo',
   'lwego', // luego
   'rato',
   'ratoo',
   'ratito', // rato
   'ahorayá',
   'ya',
   'yaa',
   'yaaa',
   'yaaaa', // ya
   'todavia',
   'todvia',
   'tvdavia', // todavía
   'apenas',
   'apnas',
   'apnass', // apenas
   'mientras',
   'mintras', // mientras
   'antes',
   'antess',
   'ante', // antes
   'rapido',
   'rapdo',
   'rapidoo', // rápido
   'lento',
   'lntoo', // lento

   // === Pronouns & Articles ===
   'tdo',
   'tood',
   'todo',
   'todoo', // todo
   'nda',
   'nd',
   'na',
   'nada',
   'nadaa', // nada
   'algo',
   'alg',
   'algoo', // algo
   'mcho',
   'muxo',
   'mucho',
   'mchoo', // mucho
   'poco',
   'poko',
   'pco',
   'pokoo', // poco
   'otro',
   'otr',
   'otroo', // otro
   'mismo',
   'msmo',
   'mismoo', // mismo
   'cualquier',
   'cualqier',
   'qlqier', // cualquier
   'nadie',
   'nadiee',
   'ndie', // nadie
   'alguien',
   'algien',
   'algn', // alguien
   'cada',
   'cdaa', // cada
   'ambos',
   'amboss', // ambos
   'varios',
   'varioss', // varios

   // === Places & Directions ===
   'dnd',
   'dnde',
   'donde',
   'dondee', // donde
   'aki',
   'aca',
   'aqui',
   'aquí',
   'akii', // aquí
   'aya',
   'alli',
   'allí',
   'alla',
   'allaa', // allí, allá
   'ksa',
   'casa',
   'casaa', // casa
   'cerca',
   'cerka',
   'cerqita', // cerca
   'lejos',
   'lejoss',
   'lejitos', // lejos
   'arriba',
   'arrba',
   'ariba', // arriba
   'abajo',
   'abjo',
   'abajoo', // abajo
   'adelante',
   'adelnte', // adelante
   'atras',
   'atrass', // atrás
   'afuera',
   'afueraa', // afuera
   'adentro',
   'adentroo', // adentro
   'izquierda',
   'izqierda', // izquierda
   'derecha',
   'drecha', // derecha

   // === Emotions & Reactions ===
   'grax',
   'grcs',
   'grs',
   'gracias',
   'grasias',
   'graxx',
   'graciaas', // gracias
   'denada',
   'dnda',
   'd nda',
   'de nadaa', // de nada
   'perdon',
   'prdn',
   'perdona',
   'perdonaa', // perdón
   'sorry',
   'sory',
   'sry',
   'sorryy', // sorry (borrowed)
   'lo siento',
   'losiento',
   'lo sientoo', // lo siento
   'q pena',
   'k pena',
   'qpenaa', // que pena
   'genial',
   'jenial',
   'geniaal', // genial
   'chevere',
   'xvre',
   'chvr',
   'cheveree', // chévere
   'cool',
   'kul',
   'coool', // cool (borrowed)
   'q cool',
   'k cool',
   'qcooll', // que cool
   'wow',
   'wao',
   'guau',
   'waooo', // wow
   'dios mio', // oh my god
   'qtf', // what the f*** (Spanish variant)
   'jaja',
   'jajaja',
   'jajajaja',
   'jajajajaja',
   'ja',
   'jaa', // laughing
   'jeje',
   'jejeje',
   'je',
   'jee', // laughing
   'jiji',
   'jijiji',
   'ji',
   'jii', // laughing
   'xd',
   'xdd',
   'xddd',
   'xdddd', // laughing
   ':)',
   ':(',
   ':D',
   ':P',
   ':v',
   'xP', // emoticons
   'ay',
   'ayy',
   'ayyy',
   'ayyyy', // ay
   'uy',
   'uyy',
   'uyyy', // uy
   'uff',
   'ufff',
   'uffff', // uff
   'bah',
   'bahh',
   'bahhh', // bah
   'meh',
   'mehh', // meh
   'pff',
   'pfff', // pff
   'hmm',
   'hmmm', // hmm
   'ash',
   'ashh', // ash
   'auch',
   'auchh', // ouch

   // === Positive Expressions ===
   'increible',
   'increíble',
   'inkreible', // incredible
   'espectacular',
   'spektacular', // spectacular
   'buenisimo',
   'buenísimo',
   'buenísmoo', // very good
   'maravilloso',
   'maravillso', // wonderful
   'exito',
   'exitoo', // success
   'feliz',
   'felizz', // happy
   'contento',
   'kontento', // content
   'emocionado',
   'emcionado', // excited
   'orgulloso',
   'orguyoso', // proud
   'tranquilo',
   'tranki',
   'trankilo', // calm

   // === Negative Expressions ===
   'terrible',
   'terribl', // terrible
   'horrible',
   'orrible', // horrible
   'malisimo',
   'malísimo', // very bad
   'feo',
   'feoo', // ugly
   'aburrido',
   'aburrdo',
   'aburrío', // bored
   'cansado',
   'cansao', // tired
   'enojado',
   'enojao',
   'enojadoo', // angry
   'triste',
   'trstee', // sad
   'preocupado',
   'preokpado', // worried
   'molesto',
   'molstoo', // annoyed
   'frustrado',
   'frustrdo', // frustrated
   'estresado',
   'estresao', // stressed

   // === Problems & Help ===
   'prob',
   'prblm',
   'prblma',
   'problema',
   'problemaa', // problema
   'ayuda',
   'aiu',
   'aiuda',
   'aiudaa', // ayuda
   'ayudenme',
   'aiudenme',
   'ayudenmee', // ayúdenme
   'auxilio',
   'auxio',
   'auxlioo', // auxilio
   'help',
   'helpp', // help (borrowed)
   'urgente',
   'urgenteee', // urgent
   'emergencia',
   'emergncia', // emergency
   'socorro',
   'socorroo', // help

   // === Tech & Contact ===
   'tel',
   'tlf',
   'fono',
   'telefono',
   'teléfono', // teléfono
   'cel',
   'celu',
   'celular',
   'celuuu', // celular
   'msg',
   'msj',
   'mensaje',
   'mensajee', // mensaje
   'cta',
   'cuenta',
   'qenta', // cuenta
   'num',
   'nro',
   'numero',
   'númeroo', // número
   'mail',
   'correo',
   'email',
   'emaaail', // email
   'whats',
   'wsp',
   'wasap',
   'guasap',
   'wpp',
   'whatsapp', // WhatsApp
   'insta',
   'ig',
   'instaa', // Instagram
   'face',
   'fb',
   'faceee', // Facebook
   'tiktok',
   'tt',
   'tiktokk', // TikTok
   'snap',
   'snp', // Snapchat
   'twit',
   'twitter', // Twitter
   'link',
   'enlace',
   'linkk', // link
   'foto',
   'fto',
   'fotoo', // photo
   'video',
   'vid',
   'videoo', // video
   'audio',
   'aud', // audio
   'internet',
   'inter',
   'inet', // internet
   'wifi',
   'wf', // wifi
   'compu',
   'computadora',
   'pc', // computer
   'app',
   'aplicacion',
   'appp', // app

   // === Money & Business ===
   'plata',
   'plataa', // money
   'lana',
   'lanaa', // money (Mexico)
   'feria',
   'friaa', // money (Mexico)
   'varo',
   'varoo', // money (Mexico)
   'pago',
   'pgo',
   'pagoo', // payment
   'precio',
   'prcio',
   'precioo', // price
   'caro',
   'kro',
   'caroo', // expensive
   'barato',
   'brato',
   'baratoo', // cheap
   'gratis',
   'free',
   'gratiss', // free
   'dinero',
   'dineroo', // money
   'efectivo',
   'efvo', // cash
   'tarjeta',
   'trjeta', // card
   'transferencia',
   'transf',
   'transfe', // transfer
   'cobrar',
   'kobrar', // charge
   'comprar',
   'komprar', // buy
   'vender',
   'vndeer', // sell
   'descuento',
   'desc',
   'dscuento', // discount
   'oferta',
   'ofertaa', // offer
   'negocio',
   'nego', // business

   // === Regional - Mexican ===
   'morro',
   'morra',
   'morroo',
   'morraa', // kid/guy/girl
   'chido',
   'chida',
   'chidoo',
   'chidaa',
   'chidísimo', // cool
   'chafa',
   'chafaa', // low quality
   'neta',
   'ntaa',
   'netaa',
   'la neta', // really/truth
   'orale',
   'órale',
   'orales',
   'oralee', // okay/wow
   'andale',
   'ándale',
   'andaleee', // come on
   'hijole',
   'íjole',
   'ijoleee', // wow/darn
   'guey',
   'wey',
   'we',
   'weey',
   'weeey', // dude
   'carnal',
   'carnala',
   'carnaal', // bro/sis
   'compa',
   'compare',
   'compaa', // buddy
   'cuate',
   'cuatee', // buddy
   'chamba',
   'jamba',
   'chambaa', // work
   'jale',
   'jalee', // work/deal
   'rollo',
   'rolloo', // thing/story
   'pedo',
   'pedoo', // problem/issue
   'no mms',
   'nmms',
   'nmm',
   'nmmss', // no manches
   'no manches',
   'nomanches',
   'nomanchess', // come on
   'arre',
   'arree', // let's go
   'alv',
   'a la verga',
   'alvv', // vulgar expression
   'ahuevo',
   'a huevo',
   'awebo', // hell yeah
   'chingon',
   'chingona',
   'chingonn', // awesome (vulgar)
   'pinche',
   'pinxe', // damn (vulgar)
   'fresa',
   'fresaa', // preppy/snobby
   'naco',
   'nacoo', // tacky
   'padre',
   'padrisimo',
   'padrísimo', // cool
   'cuacha',
   'cuacho', // buddy
   'rifar',
   'rifaa', // to be great
   'chambear',
   'chambiar', // to work
   'cotorrear',
   'cotorreo', // to chat/joke
   'echar relajo',
   'relajo', // to joke around
   'que onda',
   'qonda',
   'konda',
   'q onda',
   'k onda',
   'q onda wey',
   'k onda wey',
   'q onda guey',
   'k onda guey',
   'que onda wey',
   'que onda guey',
   'q ondaa',
   'qondaa', // what's up (Mexican)
   'dnd tas',
   'dnd andas', // where are you
   'al chile',
   'alchile', // honestly
   'nel pastel',
   'nelpastel', // no way
   'aguas',
   'aguass', // watch out
   'fijate',
   'fijateee', // imagine/notice
   'mande',
   'mandee', // what? (polite)
   'a poco',
   'apoco', // really?
   'apurate',
   'apurale',
   'apurense', // hurry up
   'que paso',
   'q paso',
   'k paso', // what happened
   'sale',
   'salee', // okay (Mexican)
   'ni loco',
   'ni loca', // no way
   'ni modo', // Mexican - no way / too bad
   'de ninguna manera', // no way
   'que les vaya bien',
   'q les vaya bien', // take care (goodbye)
   'me sorprendiste',
   'me sorprendio', // you surprised me
   'no traigo',
   'no traigo efectivo', // I don't have cash
   'me siento triste', // I feel sad
   'me siento bien', // I feel good
   'me siento mal', // I feel bad
   'tome medicina', // I took medicine
   'toma medicina', // take medicine
   'mi primo', // my cousin
   'mi prima',
   'mi primo se caso', // my cousin got married
   'se caso', // got married
   'descarga la', // download the
   'descarga la nueva version', // download the new version
   'la nueva version', // the new version
   'lleva un paraguas', // bring an umbrella
   'esta filete', // Chilean - this is cool
   'esta filete la comida', // Chilean - the food is great
   'filete', // Chilean slang for cool
   'la situacion', // the situation
   'la situacion es', // the situation is
   'la situacion es complicada', // the situation is complicated
   'es complicada', // is complicated
   'complicada', // complicated
   'esta es informacion', // this is information
   'esta es informacion importante', // this is important information
   'informacion importante', // important information
   'quisiera agendar una reunion para la proxima semana', // full phrase
   'quisiera agendar una reunion', // I would like to schedule a meeting
   'quisiera agendar', // I would like to schedule
   'quisiera', // I would like (Spanish specific)
   'una reunion', // a meeting (Spanish - uses 'una')
   'para la proxima semana', // for next week
   'para la proxima', // for the next (Spanish - uses 'la')
   'la proxima semana', // next week (Spanish - uses 'la')
   'proxima semana', // next week
   'para nada', // not at all
   'la app no carga', // the app doesn't load
   'no carga', // doesn't load
   'ahi nos vidrios', // slang goodbye
   'que chaval mas majo', // what a nice guy (Spain)
   'mas majo', // nice (Spain)
   'majo', // nice (Spain)
   'que alegria verte de nuevo', // how happy to see you again
   'verte de nuevo', // to see you again
   'de nuevo', // again
   'que alegria verte', // how happy to see you
   'te extraño amor', // I miss you love
   'te extraño', // I miss you
   'mesa para dos por favor', // table for two please (Spanish - uses 'dos')
   'mesa para dos', // table for two (Spanish - uses 'dos')
   'para dos', // for two (Spanish - uses 'dos')
   'dos', // two (Spanish - distinct from Portuguese 'dois')
   'que coraje me da', // it makes me angry
   'que coraje', // how angry
   'coraje', // anger
   'como hago para devolver esto', // how do I return this
   'como hago para', // how do I
   'devolver esto', // return this
   'jamas', // never
   'jamás', // never
   'la bateria esta baja', // the battery is low (Spanish - uses 'la')
   'la bateria', // the battery (Spanish - uses 'la')
   'bateria esta baja', // battery is low
   'esta baja', // is low
   'baja', // low (Spanish - Portuguese uses 'baixa')
   'que antojo de pizza', // I'm craving pizza
   'que antojo', // what a craving
   'antojo', // craving
   'que golazo metio', // what a great goal
   'que golazo', // what a goal
   'golazo', // great goal
   'que bonito dia', // what a nice day
   'bonito dia', // nice day
   'me lo llevo', // I'll take it
   'me siento super bien', // I feel super good
   'me siento super', // I feel super
   'cuando llega mi orden', // when does my order arrive
   'mi orden', // my order
   'que alivio', // what a relief (Spanish)
   'q alivio', // what a relief (abbreviated)

   // === Regional - Spanish (Spain) ===
   'tio',
   'tia',
   'tios',
   'tias',
   'tioo',
   'tiaa', // dude (Spain)
   'mola',
   'molaa',
   'molaaa', // cool (Spain)
   'guay',
   'guai',
   'guayy', // cool (Spain)
   'flipar',
   'flipo',
   'flipoo', // to freak out
   'currar',
   'curro',
   'curroo', // work
   'pasta',
   'pastaa', // money
   'quedamos',
   'kdamos',
   'quedamoss', // let's meet
   'majo',
   'maja',
   'majoo', // nice
   'tronco',
   'troncoo', // dude
   'colegas',
   'colgass', // buddies
   'mogollon',
   'mogollón', // a lot
   'flipante',
   'flipantee', // amazing
   'cachondo',
   'cachondoo', // funny
   'pirarse',
   'pirarsee', // to leave
   'molar',
   'molaar', // to be cool
   'lio',
   'lioo', // mess
   'movida',
   'movidaa', // thing/situation
   'mazo',
   'mazoo', // a lot
   'pibón',
   'pibon', // hot person
   'pavo',
   'euro', // euro
   'chaval',
   'chavala',
   'chavalaa', // kid
   'currante',
   'currantee', // worker
   'empanao',
   'empanaoo', // clueless
   'iros',
   'iross', // go away
   'cojonudo',
   'cojonudoo', // great
   'gilipollas',
   'gili', // idiot
   'quedar',
   'qedar', // to meet up
   'finde',
   'findee',
   'findes', // weekend (fin de semana)
   'findi', // weekend
   'curro',
   'curroo', // job/work
   'mogollon',
   'mogollón', // a lot
   'illo',
   'illoo', // dude (Andalusia)
   'churri',
   'churrii', // sweetheart
   'colega',
   'colegaa', // buddy

   // === Regional - Argentina ===
   'che',
   'chee', // hey
   'boludo',
   'boluda',
   'bolu',
   'boludoo',
   'boludaa', // dude (vulgar)
   'pibe',
   'piba',
   'pibee',
   'pibaa', // guy/girl
   'laburo',
   'laburoo', // work
   'guita',
   'guitaa', // money
   'morfi',
   'morfii', // food
   'afanar',
   'afanaar', // to steal
   'chabon',
   'chabona',
   'chabonn', // guy/girl
   'copado',
   'copada',
   'copadoo', // cool
   're',
   're copado',
   'ree', // very
   'sos',
   'soss', // eres (you are)
   'vos',
   'voss', // tú (you)
   'mina',
   'minaa', // girl
   'flaco',
   'flaca',
   'flacoo', // thin/dude
   'chabón',
   'chabona', // dude
   'cualquiera',
   'cualquieraa', // whatever
   'garrón',
   'garron', // bummer
   'bajón',
   'bajonn', // bummer
   'flashear',
   'flashiar', // to imagine/hallucinate
   'zarpado',
   'zarpadoo', // crazy/over the top
   'bardear',
   'bardiar', // to mess with
   'bancar',
   'bankaar', // to support/tolerate
   'manija',
   'manijaa', // excited
   'gil',
   'gill', // fool
   'groso',
   'grosoo', // great
   'garca',
   'garcaa', // jerk
   'trucho',
   'truchoo', // fake
   'posta',
   'postaa', // really/true
   'quilombo',
   'kilomboo', // mess
   'mambo',
   'mamboo', // issue
   'birra',
   'birraa', // beer
   'asado',
   'asadoo', // barbecue
   'buenardo',
   'buenardoo', // very good
   'malardo',
   'malardoo', // very bad

   // === Regional - Colombia ===
   'parcero',
   'parce',
   'parcerito',
   'parceroo', // buddy
   'bacano',
   'bakano',
   'bacanoo', // cool
   'chimba',
   'chimbaa', // cool/great
   'gonorrea',
   'gonorreaa', // expression (vulgar)
   'marica',
   'marikaa', // dude (friendly)
   'berraco',
   'verraco',
   'verrakoo', // great/tough
   'chino',
   'china',
   'chinoo', // kid
   'sisas',
   'sisass', // yes
   'llave',
   'llaveee', // buddy
   'man',
   'mann', // dude
   'paila',
   'pailaa', // bummer
   'guaro',
   'guaroo', // aguardiente
   'rumba',
   'rumbaa', // party
   'rumbear',
   'rumbiaar', // to party
   'parchar',
   'parchaar', // to hang out
   'parchando',
   'parchandoo', // hanging out
   'visaje',
   'visajee', // show off
   'camello',
   'camelloo', // work
   'camellar',
   'camellaar', // to work
   'lucas',
   'lucass', // money (1000 pesos)
   'chimbisimo',
   'chimbísimo', // very cool
   'severo',
   'severoo', // great
   'juemadre',
   'juepucha', // expression
   'oiga',
   'oigaa', // hey/listen
   'vea pues',
   'veapues', // okay/well
   'que mas',
   'qmas',
   'quemas', // what's up

   // === Regional - Chile ===
   'po',
   'poh',
   'poo', // emphasis particle
   'cachai',
   'cachas',
   'cachaii', // you know?
   'fome',
   'fomee', // boring
   'filete',
   'filetee', // great
   'al tiro',
   'altiro',
   'altiroo', // right away
   'pololo',
   'polola',
   'pololoo', // boyfriend/girlfriend
   'luca',
   'lucaa', // 1000 pesos
   'weon',
   'weón',
   'hueon',
   'hueón',
   'wn', // dude
   'weona',
   'hueona',
   'wna', // girl
   'cagao',
   'cagaoo', // in trouble
   'bacán',
   'bacan',
   'bakaan', // cool
   'capo',
   'capoo', // great/boss
   'cuatico',
   'cuaticoo', // crazy/intense
   'flaite',
   'flaitee', // low-class
   'la raja',
   'laraja', // great
   'penca',
   'pencaa', // bad
   'cachar',
   'kachaar', // to understand
   'poh si',
   'pohsi', // yes emphatic
   'poh no',
   'pohno', // no emphatic
   'sipo',
   'sipoo', // yes emphatic
   'nopo',
   'nopoo', // no emphatic
   'yapo',
   'yapoo', // come on
   'pucha',
   'puchaa', // darn
   'gringo',
   'gringoo', // foreigner
   'gamba',
   'gambaa', // 100 pesos
   'cabro',
   'cabra',
   'cabroo', // kid

   // === Regional - Venezuela ===
   'pana',
   'panaa', // buddy
   'chamo',
   'chama',
   'chamoo',
   'chamaa', // dude/girl
   'chevere',
   'cheveree',
   'xeveree', // cool
   'burda',
   'burdaa', // a lot
   'arrecho',
   'arrechoo', // awesome/angry
   'ladilla',
   'ladillaa', // annoying
   'marico',
   'marikoo', // dude
   'verga',
   'vergaa', // damn
   'coño',
   'coñoo', // damn
   'fino',
   'finoo', // great
   'vaina',
   'vainaa', // thing
   'broma',
   'bromaa', // thing
   'peo',
   'peoo', // problem
   'curda',
   'kurdaa', // drunk
   'rolo',
   'rolaa', // person from Caracas
   'catire',
   'catiree', // blonde
   'jeva',
   'jevaa', // girlfriend
   'jevo',
   'jevoo', // boyfriend
   'chimbo',
   'chimboo', // fake/bad
   'depinga',
   'de pinga', // great
   'como e la vaina',
   'comoeslavaina', // what's up

   // === Regional - Caribbean (Dominican, Puerto Rican, Cuban) ===
   'manito',
   'manitoo', // buddy (DR)
   'tigere',
   'tigeree', // dude (DR)
   'klk',
   'qlq',
   'quelok', // what's up (DR)
   'dimelo',
   'dimelop', // what's up (DR)
   'jevi',
   'jevii', // cool (DR)
   'tato',
   'tatoo', // okay (DR)
   'coro',
   'coroo', // cool (DR)
   'bobo',
   'boboo', // fool
   'frikiloca',
   'frikii', // cool (DR)
   'manín',
   'maniinn', // buddy (Cuba)
   'asere',
   'asereee', // buddy (Cuba)
   'ecobio',
   'ecobioo', // buddy (Cuba)
   'fula',
   'fulaa', // dollar (Cuba)
   'papi',
   'papii',
   'papiii', // babe/dude (Caribbean)
   'mami',
   'mamii',
   'mamiii', // babe (Caribbean)
   'brutal',
   'brutaal', // great (PR)
   'nítido',
   'nitidoo', // great (PR)
   'chavos',
   'chavoss', // money (PR)
   'corillo',
   'corillop', // group (PR)
   'pai',
   'paii', // for/to (PR slang)
   'wepa',
   'wepaa', // awesome (PR)
   'mano',
   'manoo', // buddy
   'zafacon',
   'zafaconn', // trash (PR/DR)

   // === Regional - Central America ===
   'puchica',
   'puchikaa', // darn (Guatemala, El Salvador)
   'maje',
   'majee', // dude (Honduras, Nicaragua)
   'pasmado',
   'pasmadoo', // dazed
   'chilero',
   'chileroo', // cool (Guatemala)
   'tuani',
   'tuanii', // cool (Nicaragua)
   'cabal',
   'kaball', // exactly (Guatemala)
   'vaya pues',
   'vayapues', // okay (Central Am)
   'va pues',
   'vapues', // okay
   'cipote',
   'cipotee', // kid (El Salvador)
   'bicho',
   'bichoo', // kid (El Salvador)
   'pisto',
   'pistoo', // money (Guatemala)
   'pija',
   'pijaa', // cool (Central Am)
   'baboso',
   'babosoo', // fool
   'chonte',
   'chontee', // cop (Nicaragua)
   'chapin',
   'chapinn', // Guatemalan
   'catracho',
   'catrachoo', // Honduran
   'guanaco',
   'guanakoo', // Salvadoran
   'nica',
   'nikaa', // Nicaraguan
   'tico',
   'tikoo', // Costa Rican

   // === Regional - Peru ===
   'causa',
   'causaa', // buddy
   'pata',
   'pataa', // buddy
   'broder',
   'brodeer', // brother
   'bacán',
   'bakaan', // cool
   'mostro',
   'mostroo', // cool/monster
   'chorear',
   'choriar', // to steal
   'choro',
   'choroo', // thief
   'jato',
   'jatoo', // house
   'taba',
   'tabaa', // cool
   'aguja',
   'agujaa', // cool
   'yara',
   'yaraa', // to run
   'tombo',
   'tomboo', // cop
   'firme',
   'firmee', // cool
   'chévere',
   'xevere', // cool
   'pilas',
   'pilss', // watch out
   'misio',
   'misioo', // broke
   'lorna',
   'lornaa', // fool
   'yuca',
   'yukaa', // hard
   'oe',
   'oee', // hey

   // === Regional - Ecuador ===
   'man',
   'mann', // dude
   'nota',
   'notaa', // cool
   'chiro',
   'chiroo', // broke
   'chucha',
   'chuchaa', // damn
   'huevon',
   'huevonn', // dude
   'achachay',
   'achachaii', // cold
   'arrarrai',
   'arrarray', // hot
   'chuta',
   'chutaa', // darn
   'mashi',
   'mashii', // buddy
   'caleta',
   'kaletaa', // hidden
   'full',
   'fulll', // very

   // === Regional - Bolivia ===
   'yunta',
   'yuntaa', // buddy
   'cuñado',
   'cuñadoo', // buddy
   'chango',
   'changoo', // kid
   'sonso',
   'sonsoo', // fool
   'choro',
   'choroo', // thief
   'jailón',
   'jailoon', // uppity
   'imilla',
   'imillaa', // girl
   'karas', // white people
   'camba',
   'kambaa', // person from east Bolivia
   'colla',
   'kollaa', // person from highlands

   // === Common Phrases (Multi-word) ===
   'q tal',
   'k tal',
   'qtal',
   'ktal', // how's it going
   'como estas',
   'como stas',
   'cmo estas', // how are you
   'como va',
   'comova',
   'cmo va', // how's it going
   'q haces',
   'k haces',
   'qaces', // what are you doing
   'q paso',
   'k paso',
   'qpaso', // what happened
   'no se',
   'nose',
   'ns', // I don't know
   'no c',
   'no see', // I don't know
   'ya voy',
   'yavoy', // I'm coming
   'ya vengo',
   'yavengo', // I'll be back
   'ya vuelvo',
   'yavuelvo', // I'll be back
   'nos vemos',
   'nosvemos',
   'nsvmos', // see you
   'que onda',
   'keonda',
   'qonda', // what's up
   'todo bien',
   'todobien',
   'tdo bn', // all good
   'ta bien',
   'tabn',
   'ta bn', // it's okay
   'esta bien',
   'stbn',
   'sta bn', // it's okay
   'por favor',
   'porfavor',
   'porfaa', // please
   'de verdad',
   'deverdad',
   'd vrdd', // really
   'en serio',
   'enserio',
   'nserio', // seriously
   'lo se',
   'lose',
   'lo c', // I know
   'no pasa nada',
   'npn',
   'nopasa nada', // no worries
   'tranquilo',
   'tranki',
   'trnki', // calm down
   'mas tarde',
   'mastarde',
   'ms trd', // later
   'un momento',
   'unmomento',
   'un seg', // one moment
   'te quiero',
   'tkm',
   'tqm', // I love you
   'te amo',
   'tam',
   'teamoo', // I love you
   'buenas noches',
   'bns noches',
   'bnsnox', // good night
   'buenos dias',
   'buenos dias amigo', // good morning friend
   'bnsdias',
   'bns dias', // good morning
   'que chimba', // Colombian slang - awesome
   'que chimba de lugar', // what an awesome place (Colombian)
   'chimba', // Colombian slang
   'el restaurante es popular', // the restaurant is popular
   'el restaurante', // the restaurant
   'mi numero es', // my number is
   'mi numero', // my number
   'numero es', // number is
   'perdoname', // forgive me
   'llamame', // call me
   'mi telefono', // my phone
   'buenas tardes',
   'bnstardes',
   'bns trd', // good afternoon
   'que tal',
   'qtal',
   'ketal', // how's it going
   'como andas',
   'comoandas',
   'cmo andas', // how are you
   'que haces',
   'qhaces',
   'kehaces', // what are you doing

   // === Spanglish (English words in Spanish context) ===
   'like',
   'ponle like',
   'dale like',
   'dm',
   'manda dm',
   'mandame dm',
   'fake',
   'es fake',
   'eso es fake',
   'hermano',
   'wtf hermano',
   'selfie',
   'hashtag',
   'trending',
   'viral',
   'online',
   'offline',
   'link',
   'post',
   'postea',
   'postear',
   'follow',
   'followear',
   'unfollow',
   'stalkear',
   'hater',
   'haters',
   'crush',
   'cringe',
   'random',
   'cool',
   'sorry',
   'please',
   // Note: 'thanks', 'nice', 'ok' removed - primarily English words
   'okey',

   // === Money & Work ===
   'pagaron',
   'ya me pagaron',
   'pagado',
   'cobrar',
   'cobro',
   'sueldo',
   'quincena',
   'lana',
   'feria',
   'varo',
   'varos',
   'billete',
   'billetes',

   // === Mixed Spanish phrases ===
   'manda dm',
   'mandame dm',
   'ponle like',
   'dale like',
   'dame like',
   'ponle like a mi foto',

   // === Spanish phrases with borrowed words ===
   'wtf hermano',
   'wtf wey',
   'wtf guey',
   'eso es fake',
   'es fake',
   'fake news',
   'muy fake',
   'super fake',
   'q fake',
   'que fake',
]);

export default SPANISH_SLANG;
