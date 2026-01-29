/**
 * Slang Dictionaries for Language Detection
 *
 * Contains texting slang, abbreviations, and informal language patterns
 * for multiple languages. Used to improve language detection accuracy
 * for informal/casual text messages.
 *
 * Categories:
 * - Greetings & Farewells
 * - Pronouns & Articles
 * - Common Verbs & Phrases
 * - Questions & Responses
 * - Time & Numbers
 * - Emotions & Reactions
 * - Tech & Social Media
 * - Regional Variations (Mexico, Spain, Argentina, Colombia, Chile, Venezuela,
 *   Caribbean, Central America, Peru, Ecuador, Bolivia)
 *
 * Total terms: ~1500+ Spanish, ~800+ English
 */

/**
 * Spanish texting slang and informal abbreviations
 */
const SPANISH_SLANG = new Set([
   // === Greetings & Farewells ===
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
   'bye',
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
   'nope',
   'nel',
   'naa',
   'naaa',
   'noooo',
   'nooo', // no
   'ok',
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
   'oi',
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
   'omg',
   'dios mio',
   'omggg', // oh my god
   'wtf',
   'qtf',
   'wtff', // what the f***
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
   'lol',
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
   'bnsdias',
   'bns dias', // good morning
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
   'bro',
   'hermano',
   'wtf',
   'wtf hermano',
   'lol',
   'omg',
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
   'nice',
   'sorry',
   'please',
   // Note: 'thanks' removed - primarily English word
   'ok',
   'okay',
   'okey',

   // === Emotions & Reactions ===
   'alivio',
   'que alivio',
   'q alivio',

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

/**
 * English texting slang and informal abbreviations
 */
const ENGLISH_SLANG = new Set([
   // === Greetings & Farewells ===
   'hello',
   'hellooo',
   'hi',
   'hii',
   'hiii',
   'hiiii',
   'hiiiii', // hi
   'hey',
   'heyy',
   'heyyy',
   'heyyyy',
   'heyyyyy', // hey
   'yo',
   'yoo',
   'yooo',
   'yoooo', // yo
   'sup',
   'wassup',
   'whatsup',
   'wazzup',
   'wsup',
   'watsup', // what's up
   'hru',
   'howru',
   'how r u',
   'howru', // how are you
   'howdy',
   'howdyy', // howdy
   'heya',
   'hiya',
   'hiyaa', // hi ya
   'helloo',
   'hellooo',
   'helloooo', // hello
   'ello',
   'ellop', // hello (British)
   'bye',
   'byee',
   'byeee',
   'byeeee',
   'bbye', // bye
   'cya',
   'cyu',
   'cyaa', // see you
   'laterz',
   'laters',
   'l8rz',
   'latersss', // later
   'peace',
   'pce',
   'peaceee', // peace out
   'gn',
   'gnight',
   'gnite',
   'gnitee', // good night
   'gm',
   'gmorning',
   'gmooorning', // good morning
   'nighty',
   'nightyyy', // night
   'morningg',
   'morninn', // morning
   'g2g',
   'gtg',
   'gotta go', // got to go
   'bfn', // bye for now
   'tc',
   'tcare', // take care
   'hugs',
   'hugss', // hugs

   // === Pronouns & You/Your ===
   'u',
   'uu',
   'uuu', // you
   'ur',
   'urs',
   'urss', // your, yours
   'urself',
   'yourself', // yourself
   'ya',
   'yah',
   'yahh', // you/yeah
   'yall',
   "y'all",
   'yalll', // you all
   'em',
   "'em",
   'emm', // them
   'im',
   "i'm",
   'imm', // I'm
   'ive',
   "i've", // I've
   'ill',
   "i'll", // I'll
   'id',
   "i'd", // I'd
   'whos',
   "who's", // who's
   'thats',
   "that's", // that's
   'whats',
   "what's",
   'wuts', // what's
   'hows',
   "how's", // how's
   'wheres',
   "where's", // where's
   'theres',
   "there's", // there's
   'theyre',
   "they're", // they're
   'were',
   "we're", // we're
   'dont',
   "don't",
   'dnt', // don't
   'wont',
   "won't", // won't
   'cant',
   "can't",
   'cnt', // can't
   'didnt',
   "didn't",
   'ddnt', // didn't
   'wasnt',
   "wasn't", // wasn't
   'isnt',
   "isn't",
   'isit', // isn't
   'wouldnt',
   "wouldn't",
   'wudnt', // wouldn't
   'couldnt',
   "couldn't",
   'cudnt', // couldn't
   'shouldnt',
   "shouldn't",
   'shudnt', // shouldn't
   'aint',
   "ain't",
   'aint', // ain't

   // === Are/Were ===
   'r',
   'rr', // are
   'ru',
   'r u',
   'r uu', // are you
   'wer',
   'wr', // were
   'wru',
   'wher r u',
   'where r u', // where are you
   'wya', // where you at
   'wyd', // what you doing
   'hyd', // how you doing

   // === Because/Cause ===
   'cuz',
   'coz',
   'cos',
   'cause',
   'cuzz', // because
   'bcuz',
   'bcoz',
   'bcos',
   'bc',
   'bcc', // because
   'bcz',
   'bcause', // because

   // === Thank You ===
   'thx',
   'thnx',
   'thks',
   'thnks',
   'thnxxx', // thanks
   'ty',
   'tyy',
   'tyyy', // thank you
   'tysm',
   'tysmm', // thank you so much
   'tyvm', // thank you very much
   'thk u',
   'thank u',
   'thanku', // thank you
   'tanks',
   'tanx',
   'thankss', // thanks (typo/emphasis)
   'appreciated',
   'appreciatedd', // appreciated
   'cheers',
   'cheerss', // cheers (British)
   'ta',
   'taa', // ta (British thanks)

   // === Please ===
   'pls',
   'plz',
   'plse',
   'plzz',
   'plzzz',
   'plez',
   'pleaseee',
   'pleeease', // please

   // === No Problem ===
   'np',
   'npp',
   'nppp', // no problem
   'nw',
   'nww', // no worries
   'npb', // no problem bro
   'dw',
   'dwi',
   'dww', // don't worry (about it)
   'nbd',
   'nbdd', // no big deal
   'its ok',
   'its fine',
   'its cool',
   'itsok', // it's ok
   'allgood',
   'all good', // all good
   'noworries', // no worries
   'nocap', // truly/no lie

   // === I Don't Know ===
   'idk',
   'idek',
   'idkk', // I don't know, I don't even know
   'dk',
   'dunno',
   'dno',
   'duno', // don't know
   'idrk', // I don't really know
   'idrc', // I don't really care
   'idgaf', // I don't give a f***
   'idgi', // I don't get it
   'tbf', // to be fair

   // === I Don't Care ===
   'idc',
   'idcc', // I don't care
   'dgaf', // don't give a f***
   'whatevs',
   'whateverr', // whatever
   'whtvr', // whatever

   // === Time ===
   'rn',
   'rnn',
   'rnnn', // right now
   'atm',
   'atmm', // at the moment
   'asap',
   'asp',
   'asapp', // as soon as possible
   'tmr',
   'tmrw',
   '2moro',
   'tmrrow',
   'tmrrw', // tomorrow
   '2day',
   'tdy',
   'tday',
   'todayy', // today
   '2nite',
   'tnite',
   '2night',
   'tonite', // tonight
   'l8r',
   'l8',
   'l8er',
   'laterr', // later
   'b4',
   'bfr',
   'b4r',
   'befor', // before
   'rly',
   'rlly',
   'rllyyy', // really (used for time too)
   'nw',
   'noww', // now
   'thn',
   'thenn', // then
   'aftr',
   'afterr', // after
   'alwys',
   'alwayss', // always
   'nvr',
   'neverr', // never
   'smtms',
   'sometimes', // sometimes
   'soon',
   'soooon', // soon
   'sec',
   'secc', // second
   'min',
   'minn', // minute
   'hrs', // hours
   'wknd',
   'weekendd', // weekend
   'ystd',
   'ystrday', // yesterday

   // === Okay/Yes/No ===
   'ok',
   'okay',
   'okey',
   'kay',
   'k',
   'kk',
   'kkk',
   'kkkk',
   'okayyy', // okay
   'ya',
   'yea',
   'yeh',
   'yeah',
   'ye',
   'yeahh',
   'yeahhh', // yeah
   'yup',
   'yep',
   'yap',
   'yupp',
   'yepp',
   'yeppp', // yes
   'yass',
   'yasss',
   'yassss',
   'yas', // yes (excited)
   'nah',
   'nahh',
   'naahh',
   'nahhh', // nah
   'nope',
   'nop',
   'nopp',
   'nopee', // nope
   'nuh',
   'nuhuh',
   'nuhuhh', // no
   'def',
   'deffo',
   'defs',
   'defff', // definitely
   'probs',
   'prolly',
   'prob',
   'probss', // probably
   'mayb',
   'maybee', // maybe
   'mby', // maybe
   'fo sho',
   'fosho', // for sure
   'fs',
   'fss', // for sure
   'ofc',
   'ofcc', // of course
   'obvi',
   'obviouslyy', // obviously
   'totes',
   'totallyy', // totally
   'absol',
   'absolutelyy', // absolutely
   'exactlyy', // exactly
   'righttt', // right

   // === Want/Going To ===
   'wanna',
   'wana',
   'wan',
   'wnt',
   'wannaaa', // want to
   'gonna',
   'gona',
   'gna',
   'gunna',
   'gonnaaa', // going to
   'gotta',
   'gota',
   'gottaaa', // got to
   'tryna',
   'trynna',
   'trynaaa', // trying to
   'bouta',
   'bout to',
   'boutaaa', // about to
   'finna',
   'finnaaa', // fixing to (AAVE)
   'needa',
   'need to',
   'needaaa', // need to
   'shoulda',
   'coulda',
   'woulda',
   'mustve', // should/could/would have
   'oughta', // ought to
   'kinda',
   'kindof',
   'kindaaa', // kind of
   'sorta',
   'sortof',
   'sortaaa', // sort of
   'lotsa',
   'lotta',
   'lotsss', // lots of
   'hafta', // have to
   'usta',
   'useta', // used to
   'lemme',
   'lemmee', // let me
   'gimme',
   'gimmee', // give me
   'dunno',
   'dunnoo', // don't know
   'gotcha',
   'gotchaa', // got you

   // === About ===
   'bout',
   'abt',
   'abut',
   'aboutt', // about

   // === Problem ===
   'prob',
   'prb',
   'prblm',
   'prblms',
   'problemm', // problem(s)
   'issue',
   'issuee', // issue
   'trouble',
   'troublee', // trouble

   // === Account/Number ===
   'acct',
   'acc',
   'accnt',
   'accountt', // account
   'num',
   'nbr',
   'numb', // number
   'txt',
   'txts',
   'textt', // text(s)
   'msg',
   'msgs',
   'msgg', // message(s)
   'phn',
   'fone',
   'phonee', // phone
   'email',
   'emaill', // email
   'addy',
   'addyy', // address

   // === Sorry ===
   'sry',
   'srry',
   'sori',
   'sowy',
   'sryyy', // sorry
   'mb',
   'myb',
   'mybad', // my bad
   'oops',
   'whoops',
   'woops',
   'oopsie', // oops
   'apologies',
   'apologiess', // apologies

   // === Think/Thought ===
   'thnk',
   'thk',
   'thkn',
   'thinkkk', // think
   'thot',
   'thght',
   'thoughttt', // thought
   'reckon',
   'rekkon', // reckon
   'figured',
   'figrd', // figured

   // === Help ===
   'hlp',
   'hep',
   'helpp',
   'helppp', // help
   'helpme',
   'hlpme', // help me

   // === Let Me Know ===
   'lmk',
   'lmkk',
   'lmkkk', // let me know
   'lmn', // let me know

   // === Be Right Back ===
   'brb',
   'brbb',
   'brbbb', // be right back
   'bbs',
   'bbss', // be back soon
   'bbl', // be back later
   'afk', // away from keyboard
   'gtg',
   'g2g', // got to go

   // === Talk To You Later ===
   'ttyl',
   'ttylr',
   'ttyls', // talk to you later
   'ttys',
   'ttyss', // talk to you soon
   'ttfn', // ta ta for now

   // === On My Way ===
   'omw',
   'omww',
   'omwww', // on my way
   'otw',
   'otww', // on the way
   'almost there',
   'almostthere', // almost there

   // === Great/Good ===
   'gr8',
   'grt',
   'gr8t',
   'greatt', // great
   'gud',
   'gd',
   'goood',
   'gooddd', // good
   'nice',
   'noice',
   'nicee',
   'niceee', // nice
   'cool',
   'kool',
   'kewl',
   'coool',
   'cooool', // cool
   'awesome',
   'awsum',
   'awsm',
   'awesomeee', // awesome
   'amazing',
   'amzing',
   'amazingg', // amazing
   'sick',
   'sik',
   'sickk', // sick (cool)
   'dope',
   'dopee', // dope
   'lit',
   'litty',
   'litttt', // lit
   'fire',
   'firee',
   'fireee', // fire (great)
   'goat',
   'goatt', // greatest of all time
   'legit',
   'legitt',
   'legittt', // legitimate/legitimately
   'bet',
   'bett',
   'bettt', // bet (okay/sure)
   'rad',
   'radd', // radical
   'sweet',
   'sweeet', // sweet
   'tight',
   'tightt', // tight
   'bomb',
   'bombb', // bomb (great)
   'epic',
   'epicc', // epic
   'stellar',
   'stellarr', // stellar
   'insane',
   'insanee', // insane
   'crazy',
   'crazyy', // crazy (good)
   'wild',
   'wildd', // wild
   'nuts',
   'nutss', // nuts (crazy)
   'savage',
   'savagee', // savage
   'clutch',
   'clutchh', // clutch

   // === Bad/Negative ===
   'bad',
   'badd', // bad
   'trash',
   'trashh', // trash
   'garbage',
   'garbagee', // garbage
   'wack',
   'whack', // wack
   'weak',
   'weakk', // weak
   'lame',
   'lamee', // lame
   'cringe',
   'cringey', // cringe
   'mid',
   'midd', // mid (mediocre)
   'ass',
   'asss', // bad (vulgar)
   'rough',
   'roughh', // rough
   'brutal',
   'brutall', // brutal

   // === Social Media/Internet ===
   'dm',
   'dms',
   'dmm', // direct message
   'pm',
   'pms',
   'pmm', // private message
   'ig',
   'igg', // Instagram / I guess
   'fb',
   'fbb', // Facebook
   'yt',
   'ytt', // YouTube
   'tt',
   'ttt', // TikTok
   'tw',
   'twt', // Twitter
   'snap',
   'snapp', // Snapchat
   'tbh',
   'tbhh', // to be honest
   'imo',
   'imho',
   'imoo', // in my (humble) opinion
   'ngl',
   'ngll', // not gonna lie
   'fr',
   'frfr',
   'frrr', // for real
   'ong',
   'ongg', // on god
   'fax',
   'facts',
   'factsss', // facts (true)
   'cap',
   'nocap',
   'no cap',
   'cappp', // lie / no lie
   'sus',
   'suss',
   'sussy', // suspicious
   'slay',
   'slayed',
   'slayy', // slay
   'bussin',
   'bussinn', // great (food especially)
   'vibe',
   'vibes',
   'vibin',
   'vibeee', // vibe
   'mood',
   'mooood', // mood
   'lowkey',
   'lowk',
   'lk',
   'lowkeyyy', // lowkey
   'highkey',
   'hk',
   'highkeyy', // highkey
   'deadass',
   'deadasss', // seriously (AAVE)
   'periodt',
   'period',
   'periodttt', // period (emphasis)
   'stan',
   'stanning',
   'stannn', // stan
   'simp',
   'simping',
   'simppp', // simp
   'salty',
   'saltyy', // salty (upset)
   'shook',
   'shookk', // shocked
   'tea',
   'thetea',
   'teaaa', // gossip
   'shade',
   'throwing shade',
   'shadee', // subtle insult
   'extra',
   'extraaa', // extra (over the top)
   'basic',
   'basiccc', // basic
   'boomer',
   'boomerr', // boomer
   'karen',
   'karenn', // Karen
   'flex',
   'flexing',
   'flexx', // flex (show off)
   'ghosted',
   'ghosting',
   'ghostt', // ghosted
   'yeet',
   'yeeted',
   'yeett', // yeet
   'ratio',
   'ratiod', // ratio (Twitter)
   'based',
   'basedd', // based
   'cringe',
   'cringee', // cringe
   'pog',
   'poggers',
   'pogg', // pog (gaming)
   'valid',
   'validdd', // valid
   'iconic',
   'iconicc', // iconic
   'ate',
   'atee', // ate (did well)
   'understood the assignment', // understood
   'main character',
   'maincharacter', // main character
   'rent free',
   'rentfree', // rent free
   'built different',
   'builtdifferent', // built different
   'hits different',
   'hitsdifferent', // hits different
   'no thoughts',
   'nothoughts', // no thoughts
   'touch grass',
   'touchgrass', // go outside
   'caught in 4k',
   'caughtin4k', // caught red-handed

   // === Gaming Slang ===
   'gg',
   'ggg',
   'ggwp', // good game (well played)
   'wp',
   'wpp', // well played
   'ez',
   'ezz',
   'eazy', // easy
   'noob',
   'n00b',
   'newb', // newbie
   'pwned',
   'ownedd', // owned
   'rekt',
   'rektt', // wrecked
   'tryhard',
   'tryhrd', // tryhard
   'smurf',
   'smurff', // smurf account
   'nerf',
   'nerff', // nerf
   'buff',
   'bufff', // buff
   'op',
   'opp', // overpowered
   'glhf', // good luck have fun
   'lfg',
   'lfgg', // looking for group / let's go
   'afk',
   'afkk', // away from keyboard
   'brb',
   'brbb', // be right back
   'ftw', // for the win
   'fml', // f*** my life
   'irl', // in real life
   'npc',
   'npcc', // non-player character (boring person)
   'lag',
   'lagg', // lag
   'carry',
   'carryy', // carry (the team)
   'sweaty',
   'sweatyy', // sweaty (tryhard)
   'grind',
   'grindd', // grind
   'spawn',
   'spawnn', // spawn
   'respawn', // respawn
   'camp',
   'campp', // camp (gaming)
   'aggro',
   'agroo', // aggro
   'clutch',
   'clutchh', // clutch

   // === British Slang ===
   'mate',
   'matee',
   'mateee', // mate
   'innit',
   'innitt', // isn't it
   'bruv',
   'bruvv', // brother
   'bloke',
   'blokee', // guy
   'lad',
   'ladd', // guy
   'lass',
   'lasss', // girl
   'chap',
   'chapp', // guy
   'bloody',
   'bloodyy', // bloody
   'bollocks',
   'bollocksss', // nonsense
   'bugger',
   'buggerr', // bugger
   'blimey',
   'blimeyy', // wow
   'crikey',
   'crikeyy', // wow
   'cheeky',
   'cheekyy', // cheeky
   'dodgy',
   'dodgyy', // suspicious
   'fancy',
   'fancyy', // want/like
   'gutted',
   'guttedd', // disappointed
   'knackered',
   'knackeredd', // tired
   'posh',
   'poshh', // fancy
   'rubbish',
   'rubbishh', // trash
   'snog',
   'snogg', // kiss
   'sorted',
   'sortedd', // fixed/done
   'brilliant',
   'brilliantt', // great
   'lovely',
   'lovelyy', // nice
   'reckon',
   'reckonn', // think
   'proper',
   'properr', // really/properly
   'mental',
   'mentall', // crazy
   'bonkers',
   'bonkerss', // crazy
   'ace',
   'acee', // great
   'wicked',
   'wickedd', // great
   'naff',
   'nafff', // uncool
   'chuffed',
   'chuffedd', // pleased
   'skint',
   'skintt', // broke
   'bants',
   'bantss', // banter
   'mandem',
   'mandemm', // group of friends
   'fam',
   'famm', // family/friends
   'wagwan',
   'wagwann', // what's going on
   'peng',
   'pengg', // attractive
   'buff',
   'bufff', // attractive
   'peak',
   'peakk', // bad/unfortunate
   'bare',
   'baree', // very/a lot
   'allow it',
   'allowit', // stop/leave it
   'say less',
   'sayless', // understood

   // === AAVE/African American Vernacular ===
   'finna',
   'finnaaa', // fixing to
   'deadass',
   'deadasss', // seriously
   'facts',
   'factsss', // true
   'aight',
   'aiight', // alright
   'bet',
   'bettt', // okay/sure
   'trippin',
   'trippinn', // crazy/wrong
   'wildin',
   'wildinn', // acting crazy
   'buggin',
   'bugginn', // tripping
   'slaps',
   'slapss', // is great
   'bops',
   'bopss', // good song
   'hits',
   'hitss', // is great
   'bussin',
   'bussinn', // really good
   'on god',
   'ongod', // truly
   'no cap',
   'nocapp', // truly
   'fye',
   'fyee', // fire/great
   'drip',
   'dripp', // style/fashion
   'swag',
   'swagg', // style
   'whip',
   'whipp', // car
   'crib',
   'cribb', // house
   'peep',
   'peepp', // look at
   'word',
   'wordd', // okay/true
   'dope',
   'dopee', // cool
   'woke',
   'wokee', // aware
   'slay',
   'slayy', // do well
   'tea',
   'teaaa', // gossip
   'shade',
   'shadee', // disrespect
   'sis',
   'sisss', // sister/friend
   'queen',
   'queenn', // term of endearment
   'king',
   'kingg', // term of endearment
   'yall',
   "y'all",
   'yalll', // you all
   'aint',
   "ain't", // isn't
   'bouta',
   'boutaa', // about to
   'outta',
   'outtaa', // out of
   'tryna',
   'trynaa', // trying to
   'gonna',
   'gonnaa', // going to
   'wanna',
   'wannaa', // want to

   // === Laughing ===
   'lol',
   'loll',
   'lolol',
   'lololol', // laugh out loud
   'lmao',
   'lmaoo',
   'lmaooo',
   'lmaoooo', // laughing my a** off
   'lmfao',
   'lmfaoo', // laughing my f***ing a** off
   'rofl',
   'roflmao',
   'rofll', // rolling on floor laughing
   'haha',
   'hahaha',
   'hahahaha',
   'hahahahaha', // haha
   'hehe',
   'hehehe',
   'hehehehe', // hehe
   // Note: xd/xD removed - more commonly used in Spanish-speaking communities
   'lulz',
   'lulzz', // lulz
   'kek',
   'kekk',
   'kekw', // kek (gaming laugh)
   'dead',
   'deaddd', // dying of laughter
   'crying',
   'cryingg', // crying laughing
   'wheeze',
   'wheezee', // wheezing

   // === Emotions/Reactions ===
   'omg',
   'omfg',
   'omggg',
   'omgggg', // oh my god
   'wtf',
   'wth',
   'wtfff',
   'wtffff', // what the f***/heck
   'smh',
   'smhh',
   'smhhh', // shaking my head
   'ikr',
   'ikrr', // I know right
   'af',
   'aff', // as f***
   'rip',
   'ripp',
   'rippp', // rest in peace (sympathy)
   'oof',
   'ooof',
   'ooooof', // oof
   'yikes',
   'yikess',
   'yikesss', // yikes
   'aw',
   'aww',
   'awww',
   'awwww',
   'awwwww', // aw
   'ew',
   'eww',
   'ewww',
   'ewwww', // ew
   'ugh',
   'ughh',
   'ughhh',
   'ughhhh', // ugh
   'meh',
   'mehh', // meh
   'bruh',
   'bruhhh',
   'bruhhhh', // bruh
   'bro',
   'broo',
   'brooo', // bro
   'dude',
   'duude',
   'duuude', // dude
   'man',
   'mann',
   'mannn', // man
   'damn',
   'damnn',
   'damnnn', // damn
   'dang',
   'dangg', // dang
   'heck',
   'heckk', // heck
   'geez',
   'geezz', // geez
   'jeez',
   'jeezz', // jeez
   'welp',
   'welpp', // welp
   'woah',
   'whoaa',
   'whoaaa', // whoa
   'wow',
   'woww',
   'wowww', // wow
   'whew',
   'phew', // phew
   'sheesh',
   'sheeshh',
   'sheeshhh', // sheesh
   'ayy',
   'ayyy',
   'ayyyy', // ayy
   'eyyy',
   'eyyyy', // ey
   'lesgo',
   'lesgoo',
   'letsgooo', // let's go
   'woo',
   'wooo',
   'woooo', // woo

   // === Miss You/Love You ===
   'ily',
   'ilysm',
   'ilyy', // I love you (so much)
   'ilu',
   'iluu', // I love you
   'luv',
   'luvu',
   'luvya',
   'luvv', // love you
   'ly',
   'lyy',
   'lyyy', // love you
   'imy',
   'imysm',
   'imyy', // I miss you (so much)
   'imu',
   'imuu', // I miss you
   'muah',
   'mwah',
   'muahh', // kiss sound
   'xoxo',
   'xoxoo', // hugs and kisses
   'bae',
   'baee', // babe
   'bby',
   'bbyy', // baby
   'bb',
   'bbb', // baby
   'hun',
   'hunn', // honey
   'hun',
   'hunny',
   'hunnyy', // honey
   'babe',
   'babee', // babe
   'sweetie',
   'sweetiee', // sweetie
   'darling',
   'darlingg', // darling
   'cutie',
   'cutiee', // cutie
   'qt',
   'qtt', // cutie

   // === See You ===
   'cu',
   'cya',
   'cyu',
   'cyaa', // see you
   'c u',
   'c ya', // see you
   'seeya',
   'seeu',
   'seeyaa', // see you
   'catchya',
   'catchyaa', // catch you later

   // === Common Phrases ===
   'wyd',
   'wydd', // what you doing
   'wya',
   'wyaa', // where you at
   'hmu',
   'hmuu', // hit me up
   'hbu',
   'hbuu', // how about you
   'wbu',
   'wbuu', // what about you
   'imo',
   'imoo', // in my opinion
   'fyi',
   'fyii', // for your information
   'btw',
   'btww', // by the way
   'smth',
   'smthh', // something
   'sth',
   'sthh', // something
   'idc',
   'idcc', // I don't care
   'nvm',
   'nvmm', // never mind
   'jk',
   'jkk', // just kidding
   'obv',
   'obvv', // obviously
   'prob',
   'probb', // probably
   'ppl',
   'ppll', // people
   'tho',
   'thoo', // though
   'tbf',
   'tbff', // to be fair
   'imo',
   'imoo', // in my opinion
   'rn',
   'rnn', // right now
   'ngl',
   'ngll', // not gonna lie
   'imo',
   'imoo', // in my opinion
   'fomo',
   'fomoo', // fear of missing out
   'yolo',
   'yoloo', // you only live once
   'bff',
   'bfff', // best friends forever
   'jfc', // jesus f***ing christ
   'smfh', // shaking my f***ing head
   'istg',
   'istgg', // I swear to god
   'swear',
   'swearr', // I swear
   'stg',
   'stgg', // swear to god

   // === Common phrases with "no" ===
   'no problem',
   'no worries',
   'no way',
   'no cap',
   'no doubt',
   'no clue',
   'no idea',
   'no chance',
   'no thanks',
   'not at all',
   'have no',
   'i have no',
   'got no',
   'i got no',
   'theres no',
   'there is no',
   'no internet',
   'i have no internet',

   // === Thanks phrases ===
   'thanks',
   'thankss',
   'thanksss',
   'thanks so much',
   'thanks a lot',
   'thanks man',
   'thanks bro',
   'thanks dude',
   'thx',
   'thxx',
   'thxxx',
   'tysm', // thank you so much
   'tyvm', // thank you very much
   'thank you',
   'thank u',
   'thanku',

   // === Weather phrases ===
   'looks like rain',
   'looks like snow',
   'looks like its gonna rain',
   'gonna rain',
]);

/**
 * Combined slang dictionaries export
 */
const SLANG_WORDS = {
   es: SPANISH_SLANG,
   en: ENGLISH_SLANG,
};

module.exports = {
   SLANG_WORDS,
   SPANISH_SLANG,
   ENGLISH_SLANG,
};
