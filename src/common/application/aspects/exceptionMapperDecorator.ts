import { Result } from "src/common/domain/result-handler/result";
import { ServiceRequestDto, ServiceResponseDto } from "../interfaces/IService";
import { IServiceDecorator } from "../interfaces/IServiceDecorator";
import { ExceptionMapper } from "src/common/infraestructure/mappers/exception-mapper";

export class ExceptionMapperDecorator<I extends ServiceRequestDto, O extends ServiceResponseDto> extends IServiceDecorator<I, O> {

    async execute(input: I): Promise<Result<O>> {
        try {
            const res = await this.decoratee.execute(input);
            if (!res.isSuccess) {
                return Result.fail(ExceptionMapper.toHttp(res.Error))
            }
            return res;
        } catch (err) {
            console.log(err);
            throw ExceptionMapper.toHttp(err);
        }
    }

}