export interface IService<TService, O> {
  execute(service: TService): O;
}

export interface TService {
  //Debería guardar los aspectos comunes de todos los servicios (Usuario que lo ejecuta, autorización, etc)
  
  toString(): string; //Para las implementaciones, nada más debe devolver el nombre del Servicio
}