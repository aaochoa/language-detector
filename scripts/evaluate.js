/* eslint-disable no-console */
/**
 * Evaluate trained model with test cases
 *
 * Usage: npm run evaluate
 * Usage: npm run evaluate -- -i (interactive mode)
 */

const path = require('path');
const readline = require('readline');
const { getDetector, resetDetector } = require('../dist');

const MODEL_PATH = path.join(__dirname, '../models/language-model.json');

// Test cases
const TEST_CASES = [
   // ==========================================
   // SPANISH - Basic conversational
   // ==========================================
   { text: 'hola como estas', expected: 'es' },
   { text: 'buenos dias amigo', expected: 'es' },
   { text: 'muchas gracias por todo', expected: 'es' },
   { text: 'que tal te fue hoy', expected: 'es' },
   { text: 'nos vemos mañana', expected: 'es' },
   { text: 'me gusta mucho', expected: 'es' },
   { text: 'donde estas ahora', expected: 'es' },
   { text: 'porque no viniste', expected: 'es' },
   { text: 'vamos a comer algo', expected: 'es' },
   { text: 'te espero en la entrada', expected: 'es' },

   // SPANISH - Longer sentences
   { text: 'ayer fui al supermercado y compre muchas cosas para la cena', expected: 'es' },
   { text: 'no puedo creer que ya sea viernes, la semana paso muy rapido', expected: 'es' },
   { text: 'mi hermana viene a visitarnos el proximo fin de semana', expected: 'es' },
   { text: 'necesito hablar contigo sobre algo muy importante', expected: 'es' },
   { text: 'el clima esta muy frio hoy, mejor quedate en casa', expected: 'es' },

   // SPANISH - Questions
   { text: 'a que hora sales del trabajo', expected: 'es' },
   { text: 'cuanto cuesta el boleto de avion', expected: 'es' },
   { text: 'quien va a llevar a los niños a la escuela', expected: 'es' },
   { text: 'cuando fue la ultima vez que hablaste con ella', expected: 'es' },
   { text: 'como puedo llegar a tu casa desde aqui', expected: 'es' },

   // SPANISH - Informal/Slang (Mexico)
   { text: 'q onda wey', expected: 'es' },
   { text: 'xq no vienes', expected: 'es' },
   { text: 'tmb voy pa alla', expected: 'es' },
   { text: 'ta bien', expected: 'es' },
   { text: 'orale pues', expected: 'es' },
   { text: 'neta que si estuvo chido', expected: 'es' },
   { text: 'no mames guey eso esta cabron', expected: 'es' },
   { text: 'andale pues te veo al rato', expected: 'es' },
   { text: 'arre vamos a la fiesta', expected: 'es' },
   { text: 'que pedo carnal', expected: 'es' },
   { text: 'a huevo que si', expected: 'es' },
   { text: 'esta bien chido el lugar', expected: 'es' },
   { text: 'nmms eso esta muy caro', expected: 'es' },

   // SPANISH - Informal/Slang (Spain)
   { text: 'tio eso mola mucho', expected: 'es' },
   { text: 'que guay esta esto', expected: 'es' },
   { text: 'quedamos luego vale', expected: 'es' },
   { text: 'vaya lio que tenemos', expected: 'es' },
   { text: 'flipo con lo que me cuentas', expected: 'es' },
   { text: 'me he quedado flipando', expected: 'es' },
   { text: 'tronco vamos a currar', expected: 'es' },
   { text: 'que chaval mas majo', expected: 'es' },

   // SPANISH - Informal/Slang (Argentina)
   { text: 'che boludo como andas', expected: 'es' },
   { text: 'esta re bueno esto', expected: 'es' },
   { text: 'dale nos vemos', expected: 'es' },
   { text: 'que quilombo se armo', expected: 'es' },
   { text: 'vos sos el mejor pibe', expected: 'es' },
   { text: 'que copado esta el laburo', expected: 'es' },
   { text: 'tengo que ir al laburo', expected: 'es' },
   { text: 'me falta guita para el finde', expected: 'es' },

   // SPANISH - Informal/Slang (Colombia)
   { text: 'parce eso esta bacano', expected: 'es' },
   { text: 'que chimba de lugar', expected: 'es' },
   { text: 'quiubo parcero como vas', expected: 'es' },
   { text: 'vamos a rumbear el finde', expected: 'es' },
   { text: 'oiga parce venga le cuento', expected: 'es' },
   { text: 'severo el concierto hermano', expected: 'es' },

   // SPANISH - Informal/Slang (Venezuela)
   { text: 'chamo eso esta fino', expected: 'es' },
   { text: 'de pinga el partido', expected: 'es' },
   { text: 'que ladilla esta vaina', expected: 'es' },
   { text: 'burda de chevere la fiesta', expected: 'es' },

   // SPANISH - Informal/Slang (Chile)
   { text: 'cachai lo que te digo po', expected: 'es' },
   { text: 'esta filete la comida', expected: 'es' },
   { text: 'weon vamos altiro', expected: 'es' },
   { text: 'la raja po', expected: 'es' },

   // SPANISH - Informal/Slang (Caribbean)
   { text: 'klk manito', expected: 'es' },
   { text: 'dimelo papi', expected: 'es' },
   { text: 'wepa que brutal', expected: 'es' },
   { text: 'asere que bola', expected: 'es' },

   // SPANISH - Texting abbreviations
   { text: 'tqm nos vms lgo', expected: 'es' },
   { text: 'xfa pasame la info', expected: 'es' },
   { text: 'dnd tas', expected: 'es' },
   { text: 'q hcs hoy', expected: 'es' },
   { text: 'msj cuando llegues', expected: 'es' },
   { text: 'tb kiero ir', expected: 'es' },
   { text: 'bn y tu q tal', expected: 'es' },
   { text: 'stoy en ksa', expected: 'es' },
   { text: 'xq no contestas', expected: 'es' },
   { text: 'q pex', expected: 'es' },

   // SPANISH - With numbers and context
   { text: 'te llamo a las 3 de la tarde', expected: 'es' },
   { text: 'son 500 pesos en total', expected: 'es' },
   { text: 'llegamos en 20 minutos', expected: 'es' },
   { text: 'el vuelo sale a las 7am', expected: 'es' },

   // SPANISH - Emotions/Exclamations
   { text: 'que alegria verte de nuevo', expected: 'es' },
   { text: 'esto es increible no lo puedo creer', expected: 'es' },
   { text: 'ay no que pena contigo', expected: 'es' },
   { text: 'que emocion ya quiero que sea el dia', expected: 'es' },
   { text: 'jajaja eso estuvo muy bueno', expected: 'es' },
   { text: 'uff que cansado estoy', expected: 'es' },
   { text: 'uy que susto me diste', expected: 'es' },

   // SPANISH - Business/Professional
   { text: 'adjunto los documentos que me solicito', expected: 'es' },
   { text: 'quisiera agendar una reunion para la proxima semana', expected: 'es' },
   { text: 'gracias por su pronta respuesta', expected: 'es' },
   { text: 'quedamos atentos a sus comentarios', expected: 'es' },
   { text: 'le confirmo la cita para el martes', expected: 'es' },
   { text: 'por favor revisar el archivo adjunto', expected: 'es' },

   // SPANISH - Customer service
   { text: 'tengo un problema con mi cuenta', expected: 'es' },
   { text: 'necesito ayuda con mi pedido', expected: 'es' },
   { text: 'cuando llega mi paquete', expected: 'es' },
   { text: 'quiero hacer una reclamacion', expected: 'es' },
   { text: 'me pueden dar informacion sobre el servicio', expected: 'es' },
   { text: 'cual es el horario de atencion', expected: 'es' },

   // ==========================================
   // ENGLISH - Basic conversational
   // ==========================================
   { text: 'hello how are you', expected: 'en' },
   { text: 'good morning friend', expected: 'en' },
   { text: 'thank you so much', expected: 'en' },
   { text: 'how was your day', expected: 'en' },
   { text: 'see you tomorrow', expected: 'en' },
   { text: 'i really like it', expected: 'en' },
   { text: 'where are you now', expected: 'en' },
   { text: 'why didnt you come', expected: 'en' },
   { text: 'lets grab something to eat', expected: 'en' },
   { text: 'ill wait at the entrance', expected: 'en' },

   // ENGLISH - Longer sentences
   {
      text: 'i went to the grocery store yesterday and bought a lot of stuff for dinner',
      expected: 'en',
   },
   { text: 'i cant believe its already friday the week went by so fast', expected: 'en' },
   { text: 'my sister is coming to visit us next weekend and i am so excited', expected: 'en' },
   { text: 'i need to talk to you about something really important', expected: 'en' },
   { text: 'the weather is really cold today you should stay home', expected: 'en' },

   // ENGLISH - Questions
   { text: 'what time do you get off work', expected: 'en' },
   { text: 'how much does the plane ticket cost', expected: 'en' },
   { text: 'who is going to take the kids to school', expected: 'en' },
   { text: 'when was the last time you talked to her', expected: 'en' },
   { text: 'how can i get to your house from here', expected: 'en' },

   // ENGLISH - Informal/Slang (American)
   { text: 'whats up dude', expected: 'en' },
   { text: 'u coming or what', expected: 'en' },
   { text: 'gonna be there soon', expected: 'en' },
   { text: 'thats cool', expected: 'en' },
   { text: 'lol thats funny', expected: 'en' },
   { text: 'bruh thats crazy', expected: 'en' },
   { text: 'nah im good thanks', expected: 'en' },
   { text: 'yeah for sure lets do it', expected: 'en' },
   { text: 'tbh i dont really care about it', expected: 'en' },
   { text: 'idk what youre talking about', expected: 'en' },

   // ENGLISH - Informal/Slang (British)
   { text: 'mate thats brilliant', expected: 'en' },
   { text: 'cheers for that', expected: 'en' },
   { text: 'innit a lovely day', expected: 'en' },
   { text: 'that bloke is mental', expected: 'en' },
   { text: 'im absolutely knackered', expected: 'en' },
   { text: 'thats proper rubbish', expected: 'en' },
   { text: 'fancy a cuppa', expected: 'en' },
   { text: 'im gutted about the result', expected: 'en' },

   // ENGLISH - Gen Z / Social Media Slang
   { text: 'thats lowkey fire', expected: 'en' },
   { text: 'no cap thats bussin', expected: 'en' },
   { text: 'fr fr thats sus', expected: 'en' },
   { text: 'she totally slayed that', expected: 'en' },
   { text: 'its giving main character energy', expected: 'en' },
   { text: 'that hits different ngl', expected: 'en' },
   { text: 'periodt queen', expected: 'en' },
   { text: 'the vibes are immaculate', expected: 'en' },
   { text: 'bet lets do it', expected: 'en' },
   { text: 'ong thats so valid', expected: 'en' },
   { text: 'you understood the assignment', expected: 'en' },
   { text: 'living rent free in my head', expected: 'en' },

   // ENGLISH - Gaming Slang
   { text: 'gg wp that was close', expected: 'en' },
   { text: 'ez game ez life', expected: 'en' },
   { text: 'you got rekt noob', expected: 'en' },
   { text: 'that was so clutch', expected: 'en' },
   { text: 'lfg lets grind', expected: 'en' },
   { text: 'afk for a bit brb', expected: 'en' },
   { text: 'hes such a tryhard', expected: 'en' },
   { text: 'poggers that play was insane', expected: 'en' },

   // ENGLISH - AAVE
   { text: 'finna go to the store', expected: 'en' },
   { text: 'deadass thats facts', expected: 'en' },
   { text: 'you trippin hard rn', expected: 'en' },
   { text: 'that song slaps', expected: 'en' },
   { text: 'his drip is crazy', expected: 'en' },
   { text: 'she spilled the tea', expected: 'en' },

   // ENGLISH - Texting abbreviations
   { text: 'omg thats amazing', expected: 'en' },
   { text: 'btw did you see that', expected: 'en' },
   { text: 'lmk when you get there', expected: 'en' },
   { text: 'wyd tonight', expected: 'en' },
   { text: 'hbu are you free', expected: 'en' },
   { text: 'brb gotta do something', expected: 'en' },
   { text: 'nvm i figured it out', expected: 'en' },
   { text: 'hmu later we can hang', expected: 'en' },
   { text: 'wya rn', expected: 'en' },
   { text: 'tysm for your help', expected: 'en' },
   { text: 'istg this is too much', expected: 'en' },
   { text: 'smh cant believe it', expected: 'en' },

   // ENGLISH - With numbers and context
   { text: 'ill call you at 3 in the afternoon', expected: 'en' },
   { text: 'that will be 500 dollars in total', expected: 'en' },
   { text: 'we will arrive in 20 minutes', expected: 'en' },
   { text: 'the flight leaves at 7am', expected: 'en' },

   // ENGLISH - Emotions/Exclamations
   { text: 'so happy to see you again', expected: 'en' },
   { text: 'this is incredible i cant believe it', expected: 'en' },
   { text: 'oh no im so sorry about that', expected: 'en' },
   { text: 'im so excited cant wait for the day', expected: 'en' },
   { text: 'lmaooo that was hilarious', expected: 'en' },
   { text: 'ugh this is so frustrating', expected: 'en' },
   { text: 'yikesss thats rough', expected: 'en' },
   { text: 'sheesh that was intense', expected: 'en' },

   // ENGLISH - Business/Professional
   { text: 'please find attached the documents you requested', expected: 'en' },
   { text: 'i would like to schedule a meeting for next week', expected: 'en' },
   { text: 'thank you for your prompt response', expected: 'en' },
   { text: 'please let me know if you have any questions', expected: 'en' },
   { text: 'as per our previous discussion', expected: 'en' },
   { text: 'i wanted to follow up on the email i sent', expected: 'en' },
   { text: 'looking forward to hearing from you', expected: 'en' },
   { text: 'please advise on the next steps', expected: 'en' },

   // ENGLISH - Customer service
   { text: 'i have an issue with my account', expected: 'en' },
   { text: 'i need help with my order', expected: 'en' },
   { text: 'when will my package arrive', expected: 'en' },
   { text: 'i would like to file a complaint', expected: 'en' },
   { text: 'can you provide more information about the service', expected: 'en' },
   { text: 'what are your business hours', expected: 'en' },
   { text: 'i want to cancel my subscription', expected: 'en' },
   { text: 'how do i reset my password', expected: 'en' },

   // ==========================================
   // EDGE CASES - Very short
   // ==========================================
   { text: 'ok', expected: 'en' },
   { text: 'yes', expected: 'en' },
   // Note: 'no' is valid in both English and Spanish, accepting Spanish
   { text: 'no', expected: 'es' },
   { text: 'hi', expected: 'en' },
   { text: 'bye', expected: 'en' },
   { text: 'hey', expected: 'en' },
   { text: 'yep', expected: 'en' },
   { text: 'nah', expected: 'en' },
   { text: 'sup', expected: 'en' },
   { text: 'yo', expected: 'en' },
   { text: 'si', expected: 'es' },
   { text: 'hola', expected: 'es' },
   { text: 'hello', expected: 'en' },
   { text: 'gracias', expected: 'es' },
   { text: 'thanks', expected: 'en' },
   { text: 'bueno', expected: 'es' },
   { text: 'good', expected: 'en' },
   { text: 'bien', expected: 'es' },
   { text: 'fine', expected: 'en' },
   { text: 'claro', expected: 'es' },
   { text: 'sure', expected: 'en' },
   { text: 'dale', expected: 'es' },
   { text: 'vale', expected: 'es' },
   { text: 'cool', expected: 'en' },
   { text: 'nice', expected: 'en' },
   { text: 'lol', expected: 'en' },
   { text: 'jaja', expected: 'es' },
   { text: 'orale', expected: 'es' },
   { text: 'chido', expected: 'es' },
   { text: 'dope', expected: 'en' },
   { text: 'bruh', expected: 'en' },

   // EDGE CASES - Similar words (cognates)
   { text: 'the situation is complicated', expected: 'en' },
   { text: 'la situacion es complicada', expected: 'es' },
   { text: 'this is important information', expected: 'en' },
   { text: 'esta es informacion importante', expected: 'es' },
   { text: 'the problem is serious', expected: 'en' },
   { text: 'el problema es serio', expected: 'es' },
   { text: 'the hotel is excellent', expected: 'en' },
   { text: 'el hotel es excelente', expected: 'es' },
   { text: 'the restaurant is popular', expected: 'en' },
   { text: 'el restaurante es popular', expected: 'es' },

   // EDGE CASES - Numbers heavy
   { text: 'my number is 555 123 4567', expected: 'en' },
   { text: 'mi numero es 555 123 4567', expected: 'es' },
   { text: 'call me at 8', expected: 'en' },
   { text: 'llamame a las 8', expected: 'es' },
   { text: 'the price is 99 dollars', expected: 'en' },
   { text: 'el precio es 99 dolares', expected: 'es' },

   // EDGE CASES - Laughter variations
   { text: 'that was so fun haha', expected: 'en' },
   { text: 'eso estuvo muy divertido jaja', expected: 'es' },
   { text: 'lmaooo im dying', expected: 'en' },
   { text: 'jajajaja me muero', expected: 'es' },
   { text: 'hahaha good one', expected: 'en' },
   { text: 'jejeje muy bueno', expected: 'es' },

   // EDGE CASES - Love/Affection
   { text: 'love you so much', expected: 'en' },
   { text: 'te quiero mucho', expected: 'es' },
   { text: 'miss you babe', expected: 'en' },
   { text: 'te extraño amor', expected: 'es' },
   { text: 'xoxo see you soon', expected: 'en' },
   { text: 'besos nos vemos pronto', expected: 'es' },

   // EDGE CASES - Borrowed words
   { text: 'lets go get some tacos', expected: 'en' },
   { text: 'vamos por unos tacos', expected: 'es' },
   { text: 'i love the beach in california', expected: 'en' },
   { text: 'me encanta la playa en california', expected: 'es' },
   { text: 'pizza for dinner tonight', expected: 'en' },
   { text: 'pizza para cenar hoy', expected: 'es' },

   // EDGE CASES - Very casual/minimal context
   { text: 'yeah yeah', expected: 'en' },
   { text: 'si si', expected: 'es' },
   { text: 'come on', expected: 'en' },
   { text: 'ven aca', expected: 'es' },
   { text: 'lets go', expected: 'en' },
   { text: 'vamonos', expected: 'es' },
   { text: 'hurry up', expected: 'en' },
   { text: 'apurate', expected: 'es' },
   { text: 'wait a sec', expected: 'en' },
   { text: 'espera tantito', expected: 'es' },
   { text: 'chill out', expected: 'en' },
   { text: 'tranquilo wey', expected: 'es' },
   { text: 'my bad', expected: 'en' },
   { text: 'mi culpa', expected: 'es' },

   // EDGE CASES - Common phrases
   { text: 'long time no see', expected: 'en' },
   { text: 'hace mucho que no te veo', expected: 'es' },
   { text: 'take care of yourself', expected: 'en' },
   { text: 'cuidate mucho', expected: 'es' },
   { text: 'have a nice day', expected: 'en' },
   { text: 'que tengas buen dia', expected: 'es' },
   { text: 'happy birthday', expected: 'en' },
   { text: 'feliz cumpleaños', expected: 'es' },
   { text: 'merry christmas', expected: 'en' },
   { text: 'feliz navidad', expected: 'es' },
   { text: 'good luck with that', expected: 'en' },
   { text: 'buena suerte con eso', expected: 'es' },

   // EDGE CASES - Tech/IT terms
   { text: 'can you reset my password', expected: 'en' },
   { text: 'puedes resetear mi contraseña', expected: 'es' },
   { text: 'the app keeps crashing', expected: 'en' },
   { text: 'la app se sigue cerrando', expected: 'es' },
   { text: 'check your email inbox', expected: 'en' },
   { text: 'revisa tu bandeja de entrada', expected: 'es' },
   { text: 'download the latest update', expected: 'en' },
   { text: 'descarga la ultima actualizacion', expected: 'es' },

   // EDGE CASES - Food/Restaurant
   { text: 'table for two please', expected: 'en' },
   { text: 'mesa para dos por favor', expected: 'es' },
   { text: 'can i get the check', expected: 'en' },
   { text: 'me trae la cuenta', expected: 'es' },
   { text: 'the food was delicious', expected: 'en' },
   { text: 'la comida estuvo deliciosa', expected: 'es' },

   // EDGE CASES - Travel
   { text: 'where is the nearest airport', expected: 'en' },
   { text: 'donde esta el aeropuerto mas cercano', expected: 'es' },
   { text: 'i need to book a hotel', expected: 'en' },
   { text: 'necesito reservar un hotel', expected: 'es' },
   { text: 'how do i get to downtown', expected: 'en' },
   { text: 'como llego al centro', expected: 'es' },

   // EDGE CASES - Weather
   { text: 'its so hot today', expected: 'en' },
   { text: 'hace mucho calor hoy', expected: 'es' },
   { text: 'looks like rain tomorrow', expected: 'en' },
   { text: 'parece que llueve mañana', expected: 'es' },

   // EDGE CASES - Work/School
   { text: 'i have a meeting at noon', expected: 'en' },
   { text: 'tengo una junta al mediodia', expected: 'es' },
   { text: 'the deadline is friday', expected: 'en' },
   { text: 'la fecha limite es el viernes', expected: 'es' },
   { text: 'i finished the project', expected: 'en' },
   { text: 'termine el proyecto', expected: 'es' },

   // EDGE CASES - Health
   { text: 'i dont feel well', expected: 'en' },
   { text: 'no me siento bien', expected: 'es' },
   { text: 'i have a headache', expected: 'en' },
   { text: 'me duele la cabeza', expected: 'es' },
   { text: 'get well soon', expected: 'en' },
   { text: 'que te mejores pronto', expected: 'es' },

   // EDGE CASES - Shopping
   { text: 'how much is this', expected: 'en' },
   { text: 'cuanto cuesta esto', expected: 'es' },
   { text: 'do you have this in blue', expected: 'en' },
   { text: 'lo tienen en azul', expected: 'es' },
   { text: 'i want to return this item', expected: 'en' },
   { text: 'quiero devolver este articulo', expected: 'es' },

   // ==========================================
   // ADDITIONAL TEST CASES
   // ==========================================

   // SOCIAL MEDIA / TEXTING STYLE - Spanish
   { text: 'jajajaja q risa', expected: 'es' },
   { text: 'omg no puedo mas', expected: 'es' },
   { text: 'wtf hermano q paso', expected: 'es' },
   { text: 'lol estuvo bueno', expected: 'es' },
   { text: 'eso es fake bro', expected: 'es' },
   { text: 'esta viral el video', expected: 'es' },
   { text: 'dame follow', expected: 'es' },
   { text: 'manda dm', expected: 'es' },
   { text: 'ponle like a mi foto', expected: 'es' },

   // SOCIAL MEDIA / TEXTING STYLE - English
   { text: 'lmao thats hilarious', expected: 'en' },
   { text: 'omg i cant even', expected: 'en' },
   { text: 'ngl that was fire', expected: 'en' },
   { text: 'lowkey want to go', expected: 'en' },
   { text: 'thats so sus bro', expected: 'en' },
   { text: 'no cap thats facts', expected: 'en' },
   { text: 'bruh moment fr fr', expected: 'en' },
   { text: 'idk what ur talking about', expected: 'en' },
   { text: 'wanna hang out tmrw', expected: 'en' },
   { text: 'hmu when ur free', expected: 'en' },

   // EMOTIONS / EXCLAMATIONS - Spanish
   { text: 'que emocion', expected: 'es' },
   { text: 'no lo puedo creer', expected: 'es' },
   { text: 'que alegria verte', expected: 'es' },
   { text: 'estoy muy feliz', expected: 'es' },
   { text: 'que tristeza me da', expected: 'es' },
   { text: 'me siento super bien', expected: 'es' },
   { text: 'estoy muy enojado', expected: 'es' },
   { text: 'que coraje me da', expected: 'es' },
   { text: 'me da mucha pena', expected: 'es' },

   // EMOTIONS / EXCLAMATIONS - English
   { text: 'im so excited', expected: 'en' },
   { text: 'cant believe it', expected: 'en' },
   { text: 'so happy to see you', expected: 'en' },
   { text: 'feeling great today', expected: 'en' },
   { text: 'this makes me sad', expected: 'en' },
   { text: 'im really upset right now', expected: 'en' },
   { text: 'thats so annoying', expected: 'en' },
   { text: 'love it so much', expected: 'en' },
   { text: 'hate when that happens', expected: 'en' },

   // CUSTOMER SERVICE - Spanish
   { text: 'necesito hablar con un agente', expected: 'es' },
   { text: 'tengo un problema con mi pedido', expected: 'es' },
   { text: 'quiero cancelar mi suscripcion', expected: 'es' },
   { text: 'no me llego el paquete', expected: 'es' },
   { text: 'me cobraron de mas', expected: 'es' },
   { text: 'cuando llega mi orden', expected: 'es' },
   { text: 'quiero un reembolso', expected: 'es' },
   { text: 'el producto llego danado', expected: 'es' },
   { text: 'como hago para devolver esto', expected: 'es' },
   { text: 'no funciona bien el servicio', expected: 'es' },

   // CUSTOMER SERVICE - English
   { text: 'i need to speak to an agent', expected: 'en' },
   { text: 'i have a problem with my order', expected: 'en' },
   { text: 'i want to cancel my subscription', expected: 'en' },
   { text: 'my package never arrived', expected: 'en' },
   { text: 'i was overcharged', expected: 'en' },
   { text: 'when will my order arrive', expected: 'en' },
   { text: 'i want a refund please', expected: 'en' },
   { text: 'the product arrived damaged', expected: 'en' },
   { text: 'how do i return this item', expected: 'en' },
   { text: 'the service is not working', expected: 'en' },

   // CASUAL GREETINGS - Spanish
   { text: 'que hay', expected: 'es' },
   { text: 'que hubo', expected: 'es' },
   { text: 'buenas', expected: 'es' },
   { text: 'que paso', expected: 'es' },
   { text: 'como andas', expected: 'es' },
   { text: 'todo bien', expected: 'es' },
   { text: 'como te va', expected: 'es' },
   { text: 'que cuentas', expected: 'es' },

   // CASUAL GREETINGS - English
   { text: 'whats up', expected: 'en' },
   { text: 'hey there', expected: 'en' },
   { text: 'yo whats good', expected: 'en' },
   { text: 'sup dude', expected: 'en' },
   { text: 'hows it going', expected: 'en' },
   { text: 'all good here', expected: 'en' },
   { text: 'whats going on', expected: 'en' },
   { text: 'long time no see', expected: 'en' },

   // CONFIRMATIONS / AGREEMENTS - Spanish
   { text: 'dale', expected: 'es' },
   { text: 'va', expected: 'es' },
   { text: 'sale', expected: 'es' },
   { text: 'listo', expected: 'es' },
   { text: 'de acuerdo', expected: 'es' },
   { text: 'claro que si', expected: 'es' },
   { text: 'por supuesto', expected: 'es' },
   { text: 'obvio', expected: 'es' },
   { text: 'seguro', expected: 'es' },

   // CONFIRMATIONS / AGREEMENTS - English
   { text: 'sure thing', expected: 'en' },
   { text: 'sounds good', expected: 'en' },
   { text: 'for sure', expected: 'en' },
   { text: 'definitely', expected: 'en' },
   { text: 'of course', expected: 'en' },
   { text: 'you got it', expected: 'en' },
   { text: 'no problem', expected: 'en' },
   { text: 'absolutely', expected: 'en' },

   // DENIALS / DISAGREEMENTS - Spanish
   { text: 'nel pastel', expected: 'es' },
   { text: 'para nada', expected: 'es' },
   { text: 'ni modo', expected: 'es' },
   { text: 'nel', expected: 'es' },
   { text: 'que va', expected: 'es' },
   { text: 'ni loco', expected: 'es' },
   { text: 'jamas', expected: 'es' },
   { text: 'de ninguna manera', expected: 'es' },

   // DENIALS / DISAGREEMENTS - English
   { text: 'no way', expected: 'en' },
   { text: 'not at all', expected: 'en' },
   { text: 'nope', expected: 'en' },
   { text: 'nah im good', expected: 'en' },
   { text: 'hard pass', expected: 'en' },
   { text: 'thats a no from me', expected: 'en' },
   { text: 'absolutely not', expected: 'en' },
   { text: 'forget about it', expected: 'en' },

   // TECH / APP RELATED - Spanish
   { text: 'la app no carga', expected: 'es' },
   { text: 'se trabo el telefono', expected: 'es' },
   { text: 'no tengo internet', expected: 'es' },
   { text: 'la bateria esta baja', expected: 'es' },
   { text: 'mandame el link', expected: 'es' },
   { text: 'ya te comparti el archivo', expected: 'es' },
   { text: 'descarga la nueva version', expected: 'es' },
   { text: 'actualiza el sistema', expected: 'es' },

   // TECH / APP RELATED - English
   { text: 'the app wont load', expected: 'en' },
   { text: 'my phone is frozen', expected: 'en' },
   { text: 'i have no internet', expected: 'en' },
   { text: 'battery is low', expected: 'en' },
   { text: 'send me the link', expected: 'en' },
   { text: 'just shared the file with you', expected: 'en' },
   { text: 'download the new version', expected: 'en' },
   { text: 'update the system', expected: 'en' },

   // WEEKEND / PLANS - Spanish
   { text: 'que planes tienes', expected: 'es' },
   { text: 'vamos a pistear', expected: 'es' },
   { text: 'hay fiesta el sabado', expected: 'es' },
   { text: 'quedamos para el domingo', expected: 'es' },
   { text: 'me quedo en casa', expected: 'es' },
   { text: 'vamos al cine', expected: 'es' },
   { text: 'me apunto', expected: 'es' },

   // WEEKEND / PLANS - English
   { text: 'what are your plans', expected: 'en' },
   { text: 'lets grab drinks', expected: 'en' },
   { text: 'party on saturday', expected: 'en' },
   { text: 'see you sunday', expected: 'en' },
   { text: 'staying home', expected: 'en' },
   { text: 'lets go to the movies', expected: 'en' },
   { text: 'count me in', expected: 'en' },

   // FAREWELLS - Spanish
   { text: 'nos vemos luego', expected: 'es' },
   { text: 'hasta pronto', expected: 'es' },
   { text: 'cuidense mucho', expected: 'es' },
   { text: 'que les vaya bien', expected: 'es' },
   { text: 'adiosito', expected: 'es' },
   { text: 'te cuidas', expected: 'es' },
   { text: 'chao pescao', expected: 'es' },
   { text: 'ahi nos vidrios', expected: 'es' },

   // FAREWELLS - English
   { text: 'catch you later', expected: 'en' },
   { text: 'see ya soon', expected: 'en' },
   { text: 'take care', expected: 'en' },
   { text: 'have a good one', expected: 'en' },
   { text: 'peace out', expected: 'en' },
   { text: 'gotta go', expected: 'en' },
   { text: 'ttyl', expected: 'en' },
   { text: 'later gator', expected: 'en' },

   // ==========================================
   // FOOD & RESTAURANTS - Spanish
   // ==========================================
   { text: 'vamos a comer tacos', expected: 'es' },
   { text: 'que antojo de pizza', expected: 'es' },
   { text: 'ya pediste la comida', expected: 'es' },
   { text: 'esta muy rica la salsa', expected: 'es' },
   { text: 'me muero de hambre', expected: 'es' },
   { text: 'quiero unos churros', expected: 'es' },
   { text: 'pasame la cuenta', expected: 'es' },
   { text: 'dejamos propina', expected: 'es' },

   // FOOD & RESTAURANTS - English
   { text: 'lets get some tacos', expected: 'en' },
   { text: 'im craving pizza', expected: 'en' },
   { text: 'did you order the food yet', expected: 'en' },
   { text: 'this sauce is so good', expected: 'en' },
   { text: 'im starving', expected: 'en' },
   { text: 'i want some ice cream', expected: 'en' },
   { text: 'can we get the check', expected: 'en' },
   { text: 'how much should we tip', expected: 'en' },

   // ==========================================
   // SPORTS & FITNESS - Spanish
   // ==========================================
   { text: 'vamos al gym', expected: 'es' },
   { text: 'ya hiciste ejercicio', expected: 'es' },
   { text: 'jugamos futbol el domingo', expected: 'es' },
   { text: 'gano el partido', expected: 'es' },
   { text: 'que golazo metio', expected: 'es' },
   { text: 'vamos a correr', expected: 'es' },
   { text: 'me duelen las piernas', expected: 'es' },
   { text: 'necesito descansar', expected: 'es' },

   // SPORTS & FITNESS - English
   { text: 'lets hit the gym', expected: 'en' },
   { text: 'did you work out today', expected: 'en' },
   { text: 'we play soccer on sunday', expected: 'en' },
   { text: 'they won the game', expected: 'en' },
   { text: 'what a great goal', expected: 'en' },
   { text: 'lets go for a run', expected: 'en' },
   { text: 'my legs are sore', expected: 'en' },
   { text: 'i need to rest', expected: 'en' },

   // ==========================================
   // WEATHER - Spanish
   // ==========================================
   { text: 'esta lloviendo fuerte', expected: 'es' },
   { text: 'que frio hace', expected: 'es' },
   { text: 'hace un calor terrible', expected: 'es' },
   { text: 'esta nublado hoy', expected: 'es' },
   { text: 'parece que va a llover', expected: 'es' },
   { text: 'lleva un paraguas', expected: 'es' },
   { text: 'que bonito dia', expected: 'es' },
   { text: 'esta nevando afuera', expected: 'es' },

   // WEATHER - English
   { text: 'its raining hard', expected: 'en' },
   { text: 'its freezing outside', expected: 'en' },
   { text: 'its so hot today', expected: 'en' },
   { text: 'its cloudy today', expected: 'en' },
   { text: 'looks like rain', expected: 'en' },
   { text: 'bring an umbrella', expected: 'en' },
   { text: 'beautiful day today', expected: 'en' },
   { text: 'its snowing outside', expected: 'en' },

   // ==========================================
   // MONEY & SHOPPING - Spanish
   // ==========================================
   { text: 'cuanto cuesta', expected: 'es' },
   { text: 'esta muy caro', expected: 'es' },
   { text: 'no traigo efectivo', expected: 'es' },
   { text: 'aceptan tarjeta', expected: 'es' },
   { text: 'hay descuento', expected: 'es' },
   { text: 'me lo llevo', expected: 'es' },
   { text: 'ya me pagaron', expected: 'es' },
   { text: 'ando corto de lana', expected: 'es' },

   // MONEY & SHOPPING - English
   { text: 'how much is it', expected: 'en' },
   { text: 'thats too expensive', expected: 'en' },
   { text: 'i dont have cash', expected: 'en' },
   { text: 'do you take cards', expected: 'en' },
   { text: 'is there a discount', expected: 'en' },
   { text: 'ill take it', expected: 'en' },
   { text: 'just got paid', expected: 'en' },
   { text: 'im broke right now', expected: 'en' },

   // ==========================================
   // EMOTIONS & REACTIONS - Spanish
   // ==========================================
   { text: 'que emocion', expected: 'es' },
   { text: 'estoy muy feliz', expected: 'es' },
   { text: 'me siento triste', expected: 'es' },
   { text: 'que coraje me da', expected: 'es' },
   { text: 'me asustaste', expected: 'es' },
   { text: 'que alivio', expected: 'es' },
   { text: 'no lo puedo creer', expected: 'es' },
   { text: 'me sorprendiste', expected: 'es' },

   // EMOTIONS & REACTIONS - English
   { text: 'so excited', expected: 'en' },
   { text: 'im so happy', expected: 'en' },
   { text: 'feeling sad today', expected: 'en' },
   { text: 'that makes me mad', expected: 'en' },
   { text: 'you scared me', expected: 'en' },
   { text: 'what a relief', expected: 'en' },
   { text: 'i cant believe it', expected: 'en' },
   { text: 'you surprised me', expected: 'en' },

   // ==========================================
   // APOLOGIES & THANKS - Spanish
   // ==========================================
   { text: 'perdoname', expected: 'es' },
   { text: 'lo siento mucho', expected: 'es' },
   { text: 'fue mi culpa', expected: 'es' },
   { text: 'mil gracias', expected: 'es' },
   { text: 'te lo agradezco', expected: 'es' },
   { text: 'eres muy amable', expected: 'es' },
   { text: 'no hay de que', expected: 'es' },
   { text: 'con mucho gusto', expected: 'es' },

   // APOLOGIES & THANKS - English
   { text: 'forgive me', expected: 'en' },
   { text: 'im so sorry', expected: 'en' },
   { text: 'my bad', expected: 'en' },
   { text: 'thanks so much', expected: 'en' },
   { text: 'i appreciate it', expected: 'en' },
   { text: 'thats so kind of you', expected: 'en' },
   { text: 'dont mention it', expected: 'en' },
   { text: 'my pleasure', expected: 'en' },

   // ==========================================
   // HEALTH & WELLNESS - Spanish
   // ==========================================
   { text: 'me duele la cabeza', expected: 'es' },
   { text: 'tengo gripa', expected: 'es' },
   { text: 'necesito ir al doctor', expected: 'es' },
   { text: 'ya me siento mejor', expected: 'es' },
   { text: 'tome medicina', expected: 'es' },
   { text: 'tengo cita con el dentista', expected: 'es' },
   { text: 'ando muy cansado', expected: 'es' },
   { text: 'no he dormido bien', expected: 'es' },

   // HEALTH & WELLNESS - English
   { text: 'i have a headache', expected: 'en' },
   { text: 'i caught a cold', expected: 'en' },
   { text: 'i need to see a doctor', expected: 'en' },
   { text: 'feeling better now', expected: 'en' },
   { text: 'i took some medicine', expected: 'en' },
   { text: 'got a dentist appointment', expected: 'en' },
   { text: 'im so tired', expected: 'en' },
   { text: 'havent been sleeping well', expected: 'en' },

   // ==========================================
   // FAMILY - Spanish
   // ==========================================
   { text: 'como estan tus papas', expected: 'es' },
   { text: 'mi hermana viene de visita', expected: 'es' },
   { text: 'los ninos estan dormidos', expected: 'es' },
   { text: 'hable con mi abuela', expected: 'es' },
   { text: 'reunion familiar el domingo', expected: 'es' },
   { text: 'extraño a mi familia', expected: 'es' },
   { text: 'mi primo se caso', expected: 'es' },
   { text: 'voy a la casa de mis tios', expected: 'es' },

   // FAMILY - English
   { text: 'how are your parents', expected: 'en' },
   { text: 'my sister is visiting', expected: 'en' },
   { text: 'the kids are asleep', expected: 'en' },
   { text: 'talked to my grandma', expected: 'en' },
   { text: 'family reunion on sunday', expected: 'en' },
   { text: 'i miss my family', expected: 'en' },
   { text: 'my cousin got married', expected: 'en' },
   { text: 'going to my aunts house', expected: 'en' },

   // ==========================================
   // MIXED DIFFICULTY EDGE CASES
   // ==========================================
   { text: 'ok cool', expected: 'en' },
   { text: 'jajaja', expected: 'es' },
   { text: 'lol', expected: 'en' },
   { text: 'omg', expected: 'en' },
   { text: 'wtf', expected: 'en' },
   { text: 'nmms', expected: 'es' },
   { text: 'alv', expected: 'es' },
   { text: 'xd', expected: 'es' },
   { text: 'bruh', expected: 'en' },
   { text: 'wey', expected: 'es' },
   { text: 'bro', expected: 'en' },
   { text: 'mano', expected: 'es' },
   { text: 'sis', expected: 'en' },
   { text: 'compa', expected: 'es' },

   // ==========================================
   // FRENCH - Basic conversational
   // ==========================================
   { text: 'bonjour comment allez vous', expected: 'fr' },
   { text: 'salut ca va bien', expected: 'fr' },
   { text: 'merci beaucoup pour tout', expected: 'fr' },
   { text: 'comment vas tu', expected: 'fr' },
   { text: 'a bientot', expected: 'fr' },
   { text: 'je suis fatigue', expected: 'fr' },
   { text: 'ou es tu maintenant', expected: 'fr' },
   { text: 'pourquoi tu ne reponds pas', expected: 'fr' },
   { text: 'on va manger quelque chose', expected: 'fr' },
   { text: 'je tattends a lentree', expected: 'fr' },

   // FRENCH - Longer sentences
   { text: 'hier je suis alle au supermarche et jai achete beaucoup de choses', expected: 'fr' },
   {
      text: 'je ne peux pas croire que cest deja vendredi la semaine est passee vite',
      expected: 'fr',
   },
   { text: 'ma soeur vient nous rendre visite le week end prochain', expected: 'fr' },
   { text: 'jai besoin de te parler de quelque chose de tres important', expected: 'fr' },
   { text: 'il fait tres froid aujourdhui tu devrais rester a la maison', expected: 'fr' },

   // FRENCH - Questions
   { text: 'a quelle heure tu finis le travail', expected: 'fr' },
   { text: 'combien coute le billet davion', expected: 'fr' },
   { text: 'qui va emmener les enfants a lecole', expected: 'fr' },
   { text: 'quand est ce que tu as parle avec elle', expected: 'fr' },
   { text: 'comment je peux arriver chez toi', expected: 'fr' },

   // FRENCH - Informal/Slang
   { text: 'salut ca va', expected: 'fr' },
   { text: 'mdr trop drole', expected: 'fr' },
   { text: 'ptdr je suis mort de rire', expected: 'fr' },
   { text: 'jsp quoi faire', expected: 'fr' },
   { text: 'jtm trop', expected: 'fr' },
   { text: 'tkt cest pas grave', expected: 'fr' },
   { text: 'cc tu fais quoi', expected: 'fr' },
   { text: 'jpp de cette journee', expected: 'fr' },
   { text: 'cest ouf ce truc', expected: 'fr' },
   { text: 'trop chanme cette soiree', expected: 'fr' },
   { text: 'grave bien le film', expected: 'fr' },
   { text: 'cest relou franchement', expected: 'fr' },

   // FRENCH - Texting abbreviations
   { text: 'bjr comment tu vas', expected: 'fr' },
   { text: 'bsr on se voit demain', expected: 'fr' },
   { text: 'slt jespere que tu vas bien', expected: 'fr' },
   { text: 'pk tu dis ca', expected: 'fr' },
   { text: 'stp envoie moi le fichier', expected: 'fr' },
   { text: 'svp pouvez vous maider', expected: 'fr' },
   { text: 'mtn je dois partir', expected: 'fr' },
   { text: 'ajd jai beaucoup de travail', expected: 'fr' },
   { text: 'tjrs la meme chose', expected: 'fr' },
   { text: 'dsl je suis en retard', expected: 'fr' },

   // FRENCH - Emotions/Reactions
   { text: 'je suis trop content', expected: 'fr' },
   { text: 'cest vraiment super', expected: 'fr' },
   { text: 'oh la la quelle surprise', expected: 'fr' },
   { text: 'cest genial cette nouvelle', expected: 'fr' },
   { text: 'je suis tres triste', expected: 'fr' },
   { text: 'ca me rend fou', expected: 'fr' },
   { text: 'jai eu tellement peur', expected: 'fr' },
   { text: 'quel soulagement', expected: 'fr' },

   // FRENCH - Customer service
   { text: 'je voudrais parler a un conseiller', expected: 'fr' },
   { text: 'jai un probleme avec ma commande', expected: 'fr' },
   { text: 'je veux annuler mon abonnement', expected: 'fr' },
   { text: 'mon colis nest pas arrive', expected: 'fr' },
   { text: 'je demande un remboursement', expected: 'fr' },
   { text: 'quand est ce que ma commande arrive', expected: 'fr' },
   { text: 'le produit est arrive endommage', expected: 'fr' },
   { text: 'comment je fais pour retourner cet article', expected: 'fr' },

   // FRENCH - Casual greetings
   { text: 'coucou ca va', expected: 'fr' },
   { text: 'salut mon ami', expected: 'fr' },
   { text: 'bonsoir tout le monde', expected: 'fr' },
   { text: 'bonne journee', expected: 'fr' },
   { text: 'bonne nuit a demain', expected: 'fr' },
   { text: 'bisous a plus', expected: 'fr' },

   // FRENCH - Confirmations/Agreements
   { text: 'daccord pas de souci', expected: 'fr' },
   { text: 'oui bien sur', expected: 'fr' },
   { text: 'ca marche pour moi', expected: 'fr' },
   { text: 'parfait on fait comme ca', expected: 'fr' },
   { text: 'pas de probleme', expected: 'fr' },
   { text: 'cest bon pour moi', expected: 'fr' },

   // FRENCH - Denials/Disagreements
   { text: 'non merci ca va', expected: 'fr' },
   { text: 'pas du tout', expected: 'fr' },
   { text: 'certainement pas', expected: 'fr' },
   { text: 'jamais de la vie', expected: 'fr' },
   { text: 'cest hors de question', expected: 'fr' },

   // FRENCH - Weather
   { text: 'il pleut beaucoup aujourdhui', expected: 'fr' },
   { text: 'il fait tres chaud', expected: 'fr' },
   { text: 'il fait froid dehors', expected: 'fr' },
   { text: 'il neige ce matin', expected: 'fr' },
   { text: 'quel beau temps aujourdhui', expected: 'fr' },

   // FRENCH - Work/School
   { text: 'jai une reunion a midi', expected: 'fr' },
   { text: 'la date limite est vendredi', expected: 'fr' },
   { text: 'jai fini le projet', expected: 'fr' },
   { text: 'je dois travailler demain', expected: 'fr' },
   { text: 'les cours commencent a huit heures', expected: 'fr' },

   // FRENCH - Food/Restaurant
   { text: 'une table pour deux sil vous plait', expected: 'fr' },
   { text: 'laddition sil vous plait', expected: 'fr' },
   { text: 'cetait delicieux merci', expected: 'fr' },
   { text: 'quest ce que tu veux manger', expected: 'fr' },
   { text: 'on commande une pizza', expected: 'fr' },

   // FRENCH - Travel
   { text: 'ou est laeroport', expected: 'fr' },
   { text: 'je dois reserver un hotel', expected: 'fr' },
   { text: 'comment je vais au centre ville', expected: 'fr' },
   { text: 'le train part a quelle heure', expected: 'fr' },
   { text: 'jai rate mon vol', expected: 'fr' },

   // FRENCH - Very short
   { text: 'oui', expected: 'fr' },
   { text: 'non', expected: 'fr' },
   { text: 'salut', expected: 'fr' },
   { text: 'merci', expected: 'fr' },
   { text: 'bonjour', expected: 'fr' },
   { text: 'bonsoir', expected: 'fr' },
   { text: 'bisou', expected: 'fr' },
   { text: 'coucou', expected: 'fr' },
   { text: 'mdr', expected: 'fr' },
   { text: 'tkt', expected: 'fr' },
   { text: 'slt', expected: 'fr' },
   { text: 'dac', expected: 'fr' },
];

/**
 * Run interactive mode
 */
function runInteractiveMode(detector) {
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
   });

   console.log('\n=== Interactive Mode ===');
   console.log('Enter text to detect language (Ctrl+C to exit)\n');

   const prompt = () => {
      rl.question('> ', (text) => {
         if (text.trim()) {
            const result = detector.detect(text);
            console.log(
               `  Language: ${result.language} (${(result.confidence * 100).toFixed(1)}%)`,
            );
            console.log(`  Reliable: ${result.isReliable}`);
            console.log('  Probabilities:', result.probabilities);
         }
         prompt();
      });
   };

   prompt();
}

/**
 * Run evaluation
 */
function evaluate() {
   console.log('=== Language Detector Evaluation ===\n');

   // Reset and load detector
   resetDetector();

   let detector;
   try {
      detector = getDetector(MODEL_PATH);
   } catch (error) {
      console.error('Failed to load model:', error.message);
      console.log('\nRun: npm run train');
      throw new Error('Model not found. Run: npm run train');
   }

   console.log(`Supported languages: ${detector.supportedLanguages.join(', ')}\n`);

   let correct = 0;
   let total = 0;
   const errors = [];

   TEST_CASES.forEach(({ text, expected }) => {
      const result = detector.detect(text);
      const isCorrect = result.language === expected;

      if (isCorrect) {
         correct += 1;
      } else {
         errors.push({
            text,
            expected,
            predicted: result.language,
            confidence: result.confidence,
         });
      }
      total += 1;

      const status = isCorrect ? '✓' : '✗';
      const confidence = (result.confidence * 100).toFixed(1);
      console.log(
         `${status} "${text}" -> ${result.language} (${confidence}%) [expected: ${expected}]`,
      );
   });

   const accuracy = ((correct / total) * 100).toFixed(2);

   console.log('\n=== Results ===');
   console.log(`Accuracy: ${accuracy}% (${correct}/${total})`);

   if (errors.length > 0) {
      console.log(`\nErrors (${errors.length}):`);
      errors.forEach((e) => {
         console.log(
            `  "${e.text}": predicted ${e.predicted} (${(e.confidence * 100).toFixed(1)}%), expected ${e.expected}`,
         );
      });
   }

   // Interactive mode
   if (process.argv.includes('--interactive') || process.argv.includes('-i')) {
      runInteractiveMode(detector);
   }
}

evaluate();
