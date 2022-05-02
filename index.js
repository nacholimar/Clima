require('dotenv').config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

//console.log(process.env.Mapbox_key)

const main = async () => {
  const busquedas = new Busquedas();
  let opt;
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const termino = await leerInput(`Ciudad: `);
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        if (id === '0') continue;

        const lugarSelect = lugares.find((l) => (l.id = id));
        busquedas.agregarHistorial(lugarSelect.nombre);
        const clima = await busquedas.clima(lugarSelect.lat, lugarSelect.lng);
        console.clear();
        console.log(`\nInformacion de la ciudad\n`.green);
        console.log('Ciudad:', lugarSelect.nombre.green);
        console.log('Lat:', lugarSelect.lat);
        console.log('Lng:', lugarSelect.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Minima:', clima.min);
        console.log('Maxima:', clima.max);
        console.log('Como esta el clima:', clima.desc.green);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
      default:
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
