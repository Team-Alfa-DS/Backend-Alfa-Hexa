import { Result } from "src/common/domain/result-handler/result";
import { TokenEntity } from "../../Infraestructure/entities/token.entity";

export interface TokenRepository {
    savetoken(token: string, user: string): Promise<Result<void>>;
  }