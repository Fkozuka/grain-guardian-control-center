
import { format } from 'date-fns';

export const sampleDryerData = {
  secador1: {
    unidadeEntrada: 18.5,
    unidadeSaida: 14.2,
    temperaturaQueimador: 105,
    temperaturaFornalha: 95,
    temperaturaEntrada: 80,
    temperaturaSaida: 45,
    toneladaHoraEntrada: 28.5,
    toneladaHoraSaida: 26.8,
  },
  secador2: {
    unidadeEntrada: 19.2,
    unidadeSaida: 14.0,
    temperaturaQueimador: 110,
    temperaturaFornalha: 98,
    temperaturaEntrada: 85,
    temperaturaSaida: 42,
    toneladaHoraEntrada: 30.2,
    toneladaHoraSaida: 28.5,
  }
};

export const generateChartData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() - 24 + i);
    
    data.push({
      time: format(time, 'HH:mm'),
      temperaturaQueimador1: Math.floor(100 + Math.random() * 15),
      temperaturaFornalha1: Math.floor(90 + Math.random() * 10),
      temperaturaEntrada1: Math.floor(75 + Math.random() * 10),
      temperaturaSaida1: Math.floor(40 + Math.random() * 10),
      unidadeEntrada1: Math.floor(17 + Math.random() * 3),
      unidadeSaida1: Math.floor(13 + Math.random() * 2),
      temperaturaQueimador2: Math.floor(105 + Math.random() * 15),
      temperaturaFornalha2: Math.floor(95 + Math.random() * 10),
      temperaturaEntrada2: Math.floor(80 + Math.random() * 10),
      temperaturaSaida2: Math.floor(40 + Math.random() * 10),
      unidadeEntrada2: Math.floor(18 + Math.random() * 3),
      unidadeSaida2: Math.floor(13 + Math.random() * 2),
    });
  }
  
  return data;
};
