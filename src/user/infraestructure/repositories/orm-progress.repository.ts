import { Repository } from "typeorm";
import { ProgressEntity } from "../entities/progress.entity";

export class OrmProgressRepository extends Repository<ProgressEntity> {}