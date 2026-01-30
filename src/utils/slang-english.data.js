/**
 * English texting slang and informal abbreviations
 *
 * Contains:
 * - Greetings & Farewells
 * - Common English words (disambiguation)
 * - Pronouns & You/Your
 * - Are/Were
 * - Because/Cause
 * - Thank You
 * - Please
 * - No Problem
 * - I Don't Know
 * - I Don't Care
 * - Time
 * - Okay/Yes/No
 * - Want/Going To
 * - About
 * - Problem
 * - Account/Number
 * - Sorry
 * - Think/Thought
 * - Help
 * - Let Me Know
 * - Be Right Back
 * - Talk To You Later
 * - On My Way
 * - Great/Good
 * - Bad/Negative
 * - Social Media/Internet
 * - Gaming Slang
 * - British Slang
 * - AAVE/African American Vernacular
 * - Laughing
 * - Emotions/Reactions
 * - Miss You/Love You
 * - See You
 * - Common Phrases
 * - Common phrases with "no"
 * - Thanks phrases
 * - Weather phrases
 *
 * Total terms: ~1300+
 */

const ENGLISH_SLANG = new Set([
   // === Disambiguation (English-specific phrases) ===
   'lets get some tacos',
   'family reunion on sunday',
   'family reunion',
   'on sunday',
   'lets get some',
   'get some tacos',

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
   'fine', // I'm fine / that's fine
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
   'whats up',
   'wazzup',
   'wsup',
   'watsup', // what's up
   'bye',
   'byee',
   'byeee',
   'bbye',

   // === Common English words (disambiguation) ===
   'ok',
   'okay',
   'yes',
   'yess',
   'yesss',
   'no',
   'noo',
   'nooo',
   'nah',
   'nope',
   'nopee',
   'sure',
   'nice',
   'nicee',
   'niceee',
   'definitely',
   'absolutely',
   'come on',
   'happy birthday',
   'merry christmas',
   'hard pass',
   'lets grab drinks',
   'got a dentist appointment',
   'im so sorry',
   'we play soccer',
   'we play soccer on sunday',
   'have a nice day',
   'as per our previous discussion',
   'count me in',
   'later gator',
   'i appreciate it',
   'appreciate it',
   'see ya later',
   'see ya soon',
   'i need to talk to you about something really important',
   'something really important',
   'who is going to take the kids to school',
   'take the kids to school',
   'the kids to school',
   'i need to speak to an agent',
   'speak to an agent',
   'i need to rest',
   'need to rest',
   'hahaha good one',
   'good one',
   'bro',
   'broo',
   'brooo',
   'wtf',
   'wtff',
   'lol',
   'loll',
   'lolll',
   'lolol',
   'lololol',
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

export default ENGLISH_SLANG;
