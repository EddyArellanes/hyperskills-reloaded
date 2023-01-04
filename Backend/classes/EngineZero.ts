import {NlpManager } from 'node-nlp'
import uuid from 'uuidv4'
const manager = new NlpManager({ languages: ['es'] });


export function generateSession(){
  return uuid()
}

export async function train(){  
  /*
  const fs = require('fs');
  if (fs.existsSync('./model.nlp')) {
    manager.load('./model.nlp');
    return;
  }
  */
    // Add Entity
  manager.addNamedEntityText('username', 'Adrian', ['es'], ['andrick', 'adri', 'adry', 'adrian']);
  manager.addNamedEntityText('username', 'Adriana', ['es'], ['adri', 'adriana']);
  manager.addNamedEntityText('username', 'Alan', ['es'], ['alan', 'Alán']);
  manager.addNamedEntityText('username', 'Alberto', ['es'], ['albert', 'alberto', 'beto', 'betito']);
  manager.addNamedEntityText('username', 'Alejandra', ['es'], ['Ale', 'Alexandra', 'alegandra']);
  manager.addNamedEntityText('username', 'Alejandro', ['es'], ['ale', 'Ale', 'alegandro', 'alexandro']);
  manager.addNamedEntityText('username', 'Alfredo', ['es'], ['alfredy', 'alfre', 'alfred', 'alfredito']);
  manager.addNamedEntityText('username', 'Alicia', ['es'], ['alice', 'alis', 'alicia']);
  manager.addNamedEntityText('username', 'América', ['es'], ['amrica', 'america', 'américa', 'ame']);
  manager.addNamedEntityText('username', 'Ana', ['es'], ['anna', 'ana', 'anita', 'ann']);
  manager.addNamedEntityText('username', 'Andrea', ['es'], ['andy', 'andrea', 'andi']);
  manager.addNamedEntityText('username', 'Andrés', ['es'], ['andy', 'andres']);
  manager.addNamedEntityText('username', 'Ángel', ['es'], ['angy', 'angelito', 'anyel', 'angel']);
  manager.addNamedEntityText('username', 'Ángeles', ['es'], ['angelita', 'angela', 'angy']);
  manager.addNamedEntityText('username', 'Antonia', ['es'], ['toña', 'toñita', 'antonia']);
  manager.addNamedEntityText('username', 'Antonio', ['es'], ['toño', 'toñito', 'antonio']);
  manager.addNamedEntityText('username', 'Agustin', ['es'], ['gus', 'agustin']);
  manager.addNamedEntityText('username', 'Araceli', ['es'], ['araceli', 'ara']);
  manager.addNamedEntityText('username', 'Armando', ['es'], ['armando', 'armandito']);
  manager.addNamedEntityText('username', 'Arturo', ['es'], ['arturito', 'artur', 'arturo']);
  manager.addNamedEntityText('username', 'Bernardo', ['es'], ['berny', 'bernardo', 'berna']);
  manager.addNamedEntityText('username', 'Bobby', ['es'], ['boby', 'bobi', 'bobby']);
  manager.addNamedEntityText('username', 'Brenda', ['es'], ['brend', 'brendita', 'brenda', 'brends']);
  manager.addNamedEntityText('username', 'Brisa', ['es'], ['bris', 'brisa']);
  manager.addNamedEntityText('username', 'Carlos', ['es'], ['charly', 'carlitos', 'carlos']);
  manager.addNamedEntityText('username', 'Carmen', ['es'], ['carmen']);
  manager.addNamedEntityText('username', 'César', ['es'], ['cesar', 'sesar']);
  manager.addNamedEntityText('username', 'Cinthya', ['es'], ['cin', 'cintya', 'cinthya']);
  manager.addNamedEntityText('username', 'Cosme', ['es'], ['cosme']);
  manager.addNamedEntityText('username', 'Daniel', ['es'], ['dany', 'dan', 'daniel', 'danyel']);
  manager.addNamedEntityText('username', 'David', ['es'], ['deivid', 'david']);
  manager.addNamedEntityText('username', 'Diana', ['es'], ['diana', 'dianita', 'dian']);
  manager.addNamedEntityText('username', 'Diego', ['es'], ['diegito', 'diego']);
  manager.addNamedEntityText('username', 'Eduardo', ['es'], ['Lalo', 'edu', 'eduardo', 'lalito']);
  manager.addNamedEntityText('username', 'Eddy', ['es'], ['edy','eddie', 'eddi', 'eddy']);
  manager.addNamedEntityText('username', 'Elena', ['es'], ['elena',  'ele', 'jelen']);
  manager.addNamedEntityText('username', 'Elizabeth', ['es'], ['eli', 'eliza', 'elizabeth', 'elisabet']);
  manager.addNamedEntityText('username', 'Enrique', ['es'], ['kike', 'enrique', 'quique']);
  manager.addNamedEntityText('username', 'Erick', ['es'], ['erick']);
  manager.addNamedEntityText('username', 'Estela', ['es'], ['estela', 'tela', 'este']);
  manager.addNamedEntityText('username', 'Fabiola', ['es'], ['faby', 'fabi', 'fabiola' ]);
  manager.addNamedEntityText('username', 'Felipe', ['es'], ['jelipe', 'feli', 'felipe']);
  manager.addNamedEntityText('username', 'Fernanda', ['es'], ['fer', 'fernanda', 'fernandita', 'fers']);
  manager.addNamedEntityText('username', 'Fernando', ['es'], ['fer', 'fercho', 'ferxo', 'fernandito', 'fernando']);
  manager.addNamedEntityText('username', 'Francisca', ['es'], ['francis', 'francisca', 'fransisca']);
  manager.addNamedEntityText('username', 'Francisco Javier', ['es'], ['frans' ]);
  manager.addNamedEntityText('username', 'Francisco', ['es'], ['francis', 'frankyn', 'fran', 'francis', 'francys', 'francisco']);
  manager.addNamedEntityText('username', 'Gabriel', ['es'], ['gaby', 'gabi', 'gabriel']);
  manager.addNamedEntityText('username', 'Gabríela', ['es'], ['gaby', 'gabriela']);
  manager.addNamedEntityText('username', 'Gerardo', ['es'], ['jerar', 'Jerad', 'gerar', 'gerardo', 'gera']);
  manager.addNamedEntityText('username', 'Gloria', ['es'], ['goya', 'glo', 'gloria']);
  manager.addNamedEntityText('username', 'Guadalupe', ['es'], ['lupe', 'lupita', 'guada', 'guadalupe', 'guadalupita']);
  manager.addNamedEntityText('username', 'Guillermo', ['es'], ['guille', 'memo', 'nemo', 'memito', 'memin', 'guillermo']);
  manager.addNamedEntityText('username', 'Guillermina', ['es'], ['guille', 'guillermina', 'mema']);
  manager.addNamedEntityText('username', 'Hércules', ['es'], ['hercules', 'ercules']);
  manager.addNamedEntityText('username', 'Héctor', ['es'], ['ector', 'toreto', 'hector']);
  manager.addNamedEntityText('username', 'Hilda', ['es'], ['ilda', 'hilda']);
  manager.addNamedEntityText('username', 'Homero', ['es'], ['homero', 'omero', 'omerito']);
  manager.addNamedEntityText('username', 'Horacio', ['es'], ['oracio', 'horacio', 'hora']);
  manager.addNamedEntityText('username', 'Hugo', ['es'], ['ugo', 'hugito', 'hugo']);
  manager.addNamedEntityText('username', 'Humberto', ['es'], ['humbert', 'humber', 'umber', 'chumbert']);
  manager.addNamedEntityText('username', 'Irma', ['es'], ['irmita', 'irma']);
  manager.addNamedEntityText('username', 'Isabel', ['es'], ['isa', 'isabela', 'isabel']);
  manager.addNamedEntityText('username', 'Ivan', ['es'], ['ivan', 'ivans']);
  manager.addNamedEntityText('username', 'Jaime', ['es'], ['yaime', 'jaime', 'jaim']);
  manager.addNamedEntityText('username', 'Javier', ['es'], ['javi', 'javiers', 'javier']);
  manager.addNamedEntityText('username', 'Joan', ['es'], ['joan', 'joa']);
  manager.addNamedEntityText('username', 'Jorge', ['es'], ['jorge', 'yorchs', 'jorch']);
  manager.addNamedEntityText('username', 'José', ['es'], ['jose', 'joss']);
  manager.addNamedEntityText('username', 'José Luis', ['es'], ['jose', '']);
  manager.addNamedEntityText('username', 'José Antonio', ['es'], ['', '']);
  manager.addNamedEntityText('username', 'José Manuel', ['es'], ['', '']);
  manager.addNamedEntityText('username', 'Josefina', ['es'], ['josefina', 'josefina']);
  manager.addNamedEntityText('username', 'Juan', ['es'], ['juan', 'juanito', 'juans']);
  manager.addNamedEntityText('username', 'Juan Manuel', ['es'], ['', '']);
  manager.addNamedEntityText('username', 'Juan Carlos', ['es'], ['', '']);
  manager.addNamedEntityText('username', 'Juana', ['es'], ['juanita', 'juana']);
  manager.addNamedEntityText('username', 'Julio', ['es'], ['july', 'julio', 'yulio']);
  manager.addNamedEntityText('username', 'Karla', ['es'], ['qarla', 'qarlita', 'carla', 'karly', 'karla']);
  manager.addNamedEntityText('username', 'Kenia', ['es'], ['keni', 'kenya', 'ken', 'kenia']);
  manager.addNamedEntityText('username', 'Karen', ['es'], ['karen', 'ka']);
  manager.addNamedEntityText('username', 'Laura', ['es'], ['laurs', 'laura', 'lau', 'laurita']);
  manager.addNamedEntityText('username', 'Leticia', ['es'], ['lety', 'leti', 'leticia']);
  manager.addNamedEntityText('username', 'Luis', ['es'], ['luis', 'luiz', 'luisito', 'luis','lui', 'lius']);
  manager.addNamedEntityText('username', 'Luz', ['es'], ['lus', 'lucesita', 'luciernaga', 'luz']);
  manager.addNamedEntityText('username', 'Manuel', ['es'], ['manu', 'manis', 'manuel', 'maniwish']);
  manager.addNamedEntityText('username', 'Margarita', ['es'], ['magy', 'margarita', 'march']);
  manager.addNamedEntityText('username', 'María', ['es'], ['mary', 'mari', 'maria']);
  manager.addNamedEntityText('username', 'María de Jesús', ['es'], ['mari jesus', 'maria de jesus']);
  manager.addNamedEntityText('username', 'María del Rosario', ['es'], ['maria del rosario', 'mari rosa']);
  manager.addNamedEntityText('username', 'María de los Angeles', ['es'], ['maria de todos los angeles', 'mari angel', 'maria de los angeles']);
  manager.addNamedEntityText('username', 'María Elena', ['es'], ['marielena', 'maria elena']);
  manager.addNamedEntityText('username', 'María Guadalupe', ['es'], ['mari lupe', 'mari lupita', 'maria guadalupe']);
  manager.addNamedEntityText('username', 'María Fernanda', ['es'], ['marifer', 'maria fernanda', 'maria fer', 'mari fer']);
  manager.addNamedEntityText('username', 'María Isabel', ['es'], ['mari isa', 'maria isabel']);
  manager.addNamedEntityText('username', 'María Luisa', ['es'], ['mari luisa', 'maria luisa']);
  manager.addNamedEntityText('username', 'María Teresa', ['es'], ['mari tere', 'maria teresa']);
  manager.addNamedEntityText('username', 'Mariana', ['es'], ['mari', 'mariana', 'mariana']);
  manager.addNamedEntityText('username', 'Maricruz', ['es'], ['maricrus', 'mari cruz', 'maricruz']);
  manager.addNamedEntityText('username', 'Mario', ['es'], ['mario', 'marios']);
  manager.addNamedEntityText('username', 'Martha', ['es'], ['marta', 'martita', 'martha']);
  manager.addNamedEntityText('username', 'Martín', ['es'], ['martin', 'martinillo', 'mart']);
  manager.addNamedEntityText('username', 'Melanie', ['es'], ['melani', 'melany', 'mela']);
  manager.addNamedEntityText('username', 'Miguel', ['es'], ['mike', 'migel', 'megue', 'miguel']);
  manager.addNamedEntityText('username', 'Miguel Ángel', ['es'], ['miguel anguel', 'mike angel']);
  manager.addNamedEntityText('username', 'Monserrat', ['es'], ['monse', 'monsesita', 'monserra', 'monserrat']);
  manager.addNamedEntityText('username', 'Nadia', ['es'], ['nadia', 'nadi', 'nady']);
  manager.addNamedEntityText('username', 'Nancy', ['es'], ['nanci', 'nancy']);
  manager.addNamedEntityText('username', 'Naomi', ['es'], ['nahomi', 'nao', 'naomi']);
  manager.addNamedEntityText('username', 'Nicolle', ['es'], ['nicole', 'nicol', 'nicolle', 'nicols']);
  manager.addNamedEntityText('username', 'Norma', ['es'], ['norma', 'normis']);
  manager.addNamedEntityText('username', 'Ñaki', ['es'], ['ñanky', 'ñakis']);
  manager.addNamedEntityText('username', 'Oscar', ['es'], ['oscarin', 'oscars', 'oscar', 'óscar', '']);
  manager.addNamedEntityText('username', 'Omar', ['es'], ['omarsin', 'omar', 'osmar']);
  manager.addNamedEntityText('username', 'Osvaldo', ['es'], ['oswaldo', 'osval', 'osbaldo', 'osvaldo']);
  manager.addNamedEntityText('username', 'Olivia', ['es'], ['olivia', 'oli', 'oliv']);
  manager.addNamedEntityText('username', 'Octavio', ['es'], ['octa', 'octavi', 'octavion']);
  manager.addNamedEntityText('username', 'Olinda', ['es'], ['olinda', 'olin']);
  manager.addNamedEntityText('username', 'Orión', ['es'], ['orion', 'orión']);
  manager.addNamedEntityText('username', 'Olga', ['es'], ['olga', 'olgita']);
  manager.addNamedEntityText('username', 'Olivier', ['es'], ['olivier', 'olivi']);
  manager.addNamedEntityText('username', 'Odín', ['es'], ['odin', 'odins']);
  manager.addNamedEntityText('username', 'Pablo', ['es'], ['pablin', 'pablon', 'pablito', 'pablo']);
  manager.addNamedEntityText('username', 'Patricia', ['es'], ['patricia', 'paty', 'pati', 'patis']);
  manager.addNamedEntityText('username', 'Pedro', ['es'], ['padrito', 'pedro','pedo', 'pdro']);
  manager.addNamedEntityText('username', 'Pánfilo', ['es'], ['panfilo', 'panfi', 'panfilio']);
  manager.addNamedEntityText('username', 'Paloma', ['es'], ['paloma', 'palomita', 'palomon', 'palomo']);
  manager.addNamedEntityText('username', 'Pamela', ['es'], ['pame', 'pamela']);
  manager.addNamedEntityText('username', 'Paola', ['es'], ['pao', 'paola']);
  manager.addNamedEntityText('username', 'Pilar', ['es'], ['pilar', 'pilarsita']);
  manager.addNamedEntityText('username', 'Quintana', ['es'], ['quita', 'quintana', 'kintana']);
  manager.addNamedEntityText('username', 'Quetzalcoátl', ['es'], ['quetzal', 'quetza', 'quetzalcoatl', 'ketzal']);
  manager.addNamedEntityText('username', 'Rafael', ['es'], ['rafa', 'rafita', 'rafael']);
  manager.addNamedEntityText('username', 'Ramón', ['es'], ['ramon', 'ramonsito', 'ramón']);
  manager.addNamedEntityText('username', 'Ricardo', ['es'], ['ricardo', 'richard', 'richar', 'ricardito']);
  manager.addNamedEntityText('username', 'Roberto', ['es'], ['roberto', 'robert', 'rob']);
  manager.addNamedEntityText('username', 'Rocio', ['es'], ['rosio', 'rocio', 'roci']);
  manager.addNamedEntityText('username', 'Rosa', ['es'], ['rosa', 'rosita', 'ross', 'rosy']);
  manager.addNamedEntityText('username', 'Rosa María', ['es'], ['rosa maria', 'ross mari', 'rosmar']);
  manager.addNamedEntityText('username', 'Rubén', ['es'], ['ruben', 'rub', 'rubensin']);
  manager.addNamedEntityText('username', 'Raúl', ['es'], ['raul', 'raulito']);
  manager.addNamedEntityText('username', 'Santiago', ['es'], ['santi', 'santiago', 'santis']);
  manager.addNamedEntityText('username', 'Salvador', ['es'], ['salva', 'salvador', 'salvas']);
  manager.addNamedEntityText('username', 'Sergio', ['es'], ['sergio', 'serch']);
  manager.addNamedEntityText('username', 'Silvia', ['es'], ['silvia', 'silvi']);
  manager.addNamedEntityText('username', 'Teresa', ['es'], ['tere', 'teresa', 'teresita']);
  manager.addNamedEntityText('username', 'Ulises', ['es'], ['ulises', 'uli', 'ulices', 'ulizes']);
  manager.addNamedEntityText('username', 'Vanessa', ['es'], ['vane', 'vanessa', 'vanesa']);
  manager.addNamedEntityText('username', 'Viridiana', ['es'], ['viri', 'viris', 'viridiana','biridiana']);
  manager.addNamedEntityText('username', 'Victor', ['es'], ['vitor', 'vic', 'victor']);
  manager.addNamedEntityText('username', 'Veronica', ['es'], ['veronica', 'vero', 'verito']);
  manager.addNamedEntityText('username', 'Wendy', ['es'], ['wen', 'wendy', 'wendi']);
  manager.addNamedEntityText('username', 'Ximena', ['es'], ['jime', 'xime', 'jimena', 'ximena']);
  manager.addNamedEntityText('username', 'Yolanda', ['es'], ['yolanda', 'yoli', 'yolis', 'yol']);
  manager.addNamedEntityText('username', 'Zacarías', ['es'], ['zacarias', 'zacaria', 'sacaria', 'zaca']);

  
  manager.addNamedEntityText('username', 'Beto', ['es'], ['beto','betto', 'bto']);
  manager.addNamedEntityText('username', 'Diana', ['es'], ['diana','duana', 'dian']);
  manager.addNamedEntityText('username', 'Luz', ['es'], ['lus','lzu']);
  manager.addNamedEntityText('username', 'Laura', ['es'], ['laurs','laura']);

  manager.addNamedEntityText('lastname', 'Reyes', ['es'], ['reysz','reeys']);
  manager.addNamedEntityText('lastname', 'Arellanes', ['es'], ['arellanz','arellane']);
  manager.addNamedEntityText('lastname', 'Padilla', ['es'], ['padilla','adilla']);
  manager.addNamedEntityText('lastname', 'Reyes', ['es'], ['reysz', 'reeys']);
  manager.addNamedEntityText('lastname', 'Andrade', ['es'], ['andrad', 'andrades']);
  manager.addNamedEntityText('lastname', 'Alvares', ['es'], ['alvarez','alvares']);   
  manager.addNamedEntityText('lastname', 'Aguilar', ['es'], ['aguilar','agilar']);                   
  manager.addNamedEntityText('lastname', 'Alarcon', ['es'], ['alarcon','alarcons']);                   
  manager.addNamedEntityText('lastname', 'Aguirre', ['es'], ['aguire', 'agirre']);                   
  manager.addNamedEntityText('lastname', 'Ayala', ['es'], ['allala', 'ayala']);                   
  manager.addNamedEntityText('lastname', 'Arellanes', ['es'], ['areyanes', 'areyan', 'arellan']);                   
  manager.addNamedEntityText('lastname', 'Araisa', ['es'], ['araiza', 'araisa']);                   
  manager.addNamedEntityText('lastname', 'Bautista', ['es'], ['bautista','bautizta']);                   
  manager.addNamedEntityText('lastname', 'Becerra', ['es'], ['becerrin','becerro','becerra']);                   
  manager.addNamedEntityText('lastname', 'Benitez', ['es'], ['benites','benitez']);                   
  manager.addNamedEntityText('lastname', 'Castro', ['es'], ['castro']);                   
  manager.addNamedEntityText('lastname', 'Casimiro', ['es'], ['casimiro','casimir']);                   
  manager.addNamedEntityText('lastname', 'Contreras', ['es'], ['contreras','contrera']);                   
  manager.addNamedEntityText('lastname', 'Cortez', ['es'], ['cortes','cortez']);                   
  manager.addNamedEntityText('lastname', 'Colón', ['es'], ['colon', 'colón']);                   
  manager.addNamedEntityText('lastname', 'Caballero', ['es'], ['caballero','cabayero']);                   
  manager.addNamedEntityText('lastname', 'Dominguez', ['es'], ['domingez','dominjes', 'domingez']);                   
  manager.addNamedEntityText('lastname', 'Dorantes', ['es'], ['dorantes','dorantez']);                   
  manager.addNamedEntityText('lastname', 'Espino', ['es'], ['espino','espin']);                   
  manager.addNamedEntityText('lastname', 'Espinoza', ['es'], ['espinoza','espinosa']);                   
  manager.addNamedEntityText('lastname', 'Fernadez', ['es'], ['fernandez','fernandes']);                   
  manager.addNamedEntityText('lastname', 'Flores', ['es'], ['flores','flowers']);                   
  manager.addNamedEntityText('lastname', 'Fonseca', ['es'], ['fonseca','fonzeca']);                   
  manager.addNamedEntityText('lastname', 'Goméz', ['es'], ['gomez','gomes']);                   
  manager.addNamedEntityText('lastname', 'García', ['es'], ['garcia','garzia']);                   
  manager.addNamedEntityText('lastname', 'Gonzalez', ['es'], ['gonzales','gonsalez','gonzalez']);                   
  manager.addNamedEntityText('lastname', 'Hernández', ['es'], ['hernandez','hernandes']);
  manager.addNamedEntityText('lastname', 'Hurtado', ['es'], ['hurtado','urtado']);
  manager.addNamedEntityText('lastname', 'Herrera', ['es'], ['herrera']);                   
  manager.addNamedEntityText('lastname', 'Hinojosa', ['es'], ['hinojosa']);                                    
  manager.addNamedEntityText('lastname', 'Jimenez', ['es'], ['jimnez','jimenes','jimenez']);                   
  manager.addNamedEntityText('lastname', 'Juaréz', ['es'], ['juarez','juarez']);                   
  manager.addNamedEntityText('lastname', 'Jaramillo', ['es'], ['jaramillo','jaramiyo']);                   
  manager.addNamedEntityText('lastname', 'Mendoza', ['es'], ['mendoza','mendosa']);                   
  manager.addNamedEntityText('lastname', 'Montes de Oca', ['es'], ['montes de oca','montez de oca']);                   
  manager.addNamedEntityText('lastname', 'Morales', ['es'], ['morales']);                   
  manager.addNamedEntityText('lastname', 'Medina', ['es'], ['medina']);                   
  manager.addNamedEntityText('lastname', 'Miranda', ['es'], ['miranda']);                   
  manager.addNamedEntityText('lastname', 'Mendez', ['es'], ['mendes', 'mendez']);                   
  manager.addNamedEntityText('lastname', 'Montero', ['es'], ['montero']);                   
  manager.addNamedEntityText('lastname', 'Marquez', ['es'], ['marques','marquez']);                   
  manager.addNamedEntityText('lastname', 'Murillo', ['es'], ['murillo']);                   
  manager.addNamedEntityText('lastname', 'Montejo', ['es'], ['montejo']);                   
  manager.addNamedEntityText('lastname', 'Matamoros', ['es'], ['matamoros']);                   
  manager.addNamedEntityText('lastname', 'Monrroy', ['es'], ['monroy', 'monrroy', 'monrroi']);                   
  manager.addNamedEntityText('lastname', 'Nadal', ['es'], ['nadal']);                   
  manager.addNamedEntityText('lastname', 'Najera', ['es'], ['najera']);                   
  manager.addNamedEntityText('lastname', 'Nabal', ['es'], ['nabal', 'naval']);                   
  manager.addNamedEntityText('lastname', 'Ñanco', ['es'], ['ñanco','nanco']);                   
  manager.addNamedEntityText('lastname', 'Ñunque', ['es'], ['ñunque','nunque', 'ñunke']);                   
  manager.addNamedEntityText('lastname', 'Oca', ['es'], ['oca']);                   
  manager.addNamedEntityText('lastname', 'Obón', ['es'], ['obon']);                   
  manager.addNamedEntityText('lastname', 'Obregón', ['es'], ['obregon']);                   
  manager.addNamedEntityText('lastname', 'Ochoa', ['es'], ['ochoa']);                   
  manager.addNamedEntityText('lastname', 'Pérez', ['es'], ['perez', 'peres']);                   
  manager.addNamedEntityText('lastname', 'Palomo', ['es'], ['palomo']);                   
  manager.addNamedEntityText('lastname', 'Padilla', ['es'], ['padilla', 'padila', '']);                   
  manager.addNamedEntityText('lastname', 'Pacheco', ['es'], ['pacheco']);                   
  manager.addNamedEntityText('lastname', 'Piedras', ['es'], ['piedra','piedras']);                   
  manager.addNamedEntityText('lastname', 'Peralta', ['es'], ['peralta']);                   
  manager.addNamedEntityText('lastname', 'Pineda', ['es'], ['pineda']);                   
  manager.addNamedEntityText('lastname', 'Rodríguez', ['es'], ['rodrigues', 'rodrigez']);                   
  manager.addNamedEntityText('lastname', 'Rojas', ['es'], ['rojas','roja']);                   
  manager.addNamedEntityText('lastname', 'Ramírez', ['es'], ['ramirez','ramirez']);                   
  manager.addNamedEntityText('lastname', 'Ruíz', ['es'], ['ruis','ruiz']);                   
  manager.addNamedEntityText('lastname', 'Romero', ['es'], ['romero','romerito']);                   
  manager.addNamedEntityText('lastname', 'Sánchez', ['es'], ['sanchez','sanches']);                   
  manager.addNamedEntityText('lastname', 'Suarez', ['es'], ['suares','suarez']);                   
  manager.addNamedEntityText('lastname', 'Serrano', ['es'], ['serrano','cerrano']);                   
  manager.addNamedEntityText('lastname', 'Sierra', ['es'], ['sierra']);                   
  manager.addNamedEntityText('lastname', 'Torres', ['es'], ['torres', 'torrez']);                   
  manager.addNamedEntityText('lastname', 'Toledo', ['es'], ['toledo']);                   
  manager.addNamedEntityText('lastname', 'Turrubiates', ['es'], ['turribiatez','turrubiatez']);                   
  manager.addNamedEntityText('lastname', 'Trujillo', ['es'], ['trujillo', 'trujillo']);                   
  manager.addNamedEntityText('lastname', 'Tejada', ['es'], ['tejada']);                   
  manager.addNamedEntityText('lastname', 'Ugalde', ['es'], ['ugalde']);                   
  manager.addNamedEntityText('lastname', 'Urrutia', ['es'], ['urrutia']);                   
  manager.addNamedEntityText('lastname', 'Urban', ['es'], ['urban']);                   
  manager.addNamedEntityText('lastname', 'Urbina', ['es'], ['urbina']);
  

  // Adds the utterances and intents for the NLP
  //Bye
  manager.addDocument('es', 'adios', 'greetings.bye');
  manager.addDocument('es', 'hasta pronto', 'greetings.bye');
  manager.addDocument('es', 'hasta luego', 'greetings.bye');
  manager.addDocument('es', 'bye', 'greetings.bye');
  manager.addDocument('es', 'sayonara', 'greetings.bye');
  //Hello
  manager.addDocument('es', 'hola', 'greetings.hello');
  manager.addDocument('es', 'hi', 'greetings.hello');
  manager.addDocument('es', 'saludos', 'greetings.hello');
  manager.addDocument('es', 'hello', 'greetings.hello');
  manager.addDocument('es', 'hello', 'greetings.hello');

  manager.addDocument('es', 'mi nombre es %username%', 'getusername');
  manager.addDocument('es', 'me llamo %username%', 'getusername');
  manager.addDocument('es', 'soy %username%', 'getusername');
  manager.addDocument('es', '%username%', 'getusername');

  manager.addDocument('es', 'Mi correo es %email%', 'email');
  manager.addDocument('es', 'Mi emai es %email%', 'email');
  manager.addDocument('es', '%email%', 'email');
  manager.addDocument('es', 'eddy@gmail.com', 'email');
  manager.addDocument('es', 'vanessa@yahoo.com.mx', 'email');

  manager.addDocument('es', '%phonenumber%', 'phone');
  manager.addDocument('es', 'mi número es %phonenumber%', 'phone');
  manager.addDocument('es', 'numero %phonenumber%', 'phone');
  manager.addDocument('es', 'celular %phonenumber%', 'phone');

  manager.addAnswer('es', 'greetings.bye', 'Hola soy el Engine Zero, el motor especializado de Azka de NLP');
  manager.addAnswer('es', 'greetings.bye', 'Hola dame tus datos!');
  manager.addAnswer('es', 'greetings.hello', 'Hihihi!');
  manager.addAnswer('es', 'greetings.hello', 'Como tas bb!');
  

  await manager.train();
  return manager.save();
  //  manager.save('./model.nlp', true);
  
}
// Train and save the model.
export async function run( message: string){
    
  const response = await manager.process('es', message)
  return response
}

//Function to format and render data in frontend
export function formatter( data: Array<any>){
  const responses = []
  data.map( response => {
     responses.push({
      author: 'Alfred',
      type: 'text',
      id: 1, // or text '1'
      isEdited: false,
      data: {
        text: response.text,
        meta: new Date()
      }
    })  
  })
  return responses
}

export async function searchEntity( entities: Array<any>, entityWanted: string) {
  //It can be improved using match or regexp, for now use Equals xD
  const entitiesFiltered = entities.filter( e => e.entity === entityWanted)
  const entityFound = (entitiesFiltered.length > 0) ? entitiesFiltered[0].sourceText : 'Entity not foud'

  return entityFound
}

export async function searchEntitySystem( entities: Array<any>, entityWanted: string) {
  //It can be improved using match or regexp, for now use Equals xD
  const entitiesFiltered = entities.filter( e => e.typeName === entityWanted)
  const entityFound = (entitiesFiltered.length > 0) ? entitiesFiltered[0].text : 'Entity not foud'

  return entityFound
}





