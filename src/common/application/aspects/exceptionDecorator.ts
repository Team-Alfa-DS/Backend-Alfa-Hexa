import { Result } from "src/common/domain/result-handler/result";
import { ServiceRequestDto, ServiceResponseDto } from "../interfaces/IService";
import { IServiceDecorator } from "../interfaces/IServiceDecorator";

export class ExceptionDecorator<I extends ServiceRequestDto, O extends ServiceResponseDto> extends IServiceDecorator<I, O> {

    async execute(input: I): Promise<Result<O>> {
        try {
            const res = await this.decoratee.execute(input);
            return res;
        } catch (err) {
            return Result.fail(err);
        }
    }

}