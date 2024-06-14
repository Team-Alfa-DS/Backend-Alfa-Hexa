import { Result } from "src/common/domain/result-handler/result";

export abstract class IService<I extends ServiceRequestDto, O extends ServiceResponseDto> {
  get name(){
    return this.constructor.name;
  }

  abstract execute(service: I): Promise<Result<O>>; //Acción singular que realiza el servicio
}

//Por cosas de como funciona el logging en TS, hace falta que los DTO de petición y respuesta implementen una interfaz
export interface ServiceRequestDto {
  dataToString(): string; //Esto debería devolver un string con los datos formateados para loggear
}

export interface ServiceResponseDto {
  dataToString(): string; //Esto debería devolver un string con los datos formateados para loggear
}