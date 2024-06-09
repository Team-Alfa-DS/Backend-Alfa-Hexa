import { ServiceResponseDto } from "src/common/application/interfaces/IService";

export class MarkEndProgressResponse implements ServiceResponseDto {
    
    dataToString(): string {
        return `MarkEndProgressRes: { }`
    }
}