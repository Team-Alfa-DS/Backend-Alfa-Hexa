import { IMapper } from "src/common/application/mappers/mappers.interface";
import { NotifyEntity } from "../entities/notify.entity";
import { NotifyDTO } from "../dto/notifydto";

export  class NotifyMapper {
    
    static toDomain(Entity: NotifyDTO): NotifyEntity {
      const dto = NotifyEntity.create(
        Entity.id,
        Entity.title,
        Entity.body,
        Entity.date,
        Entity.userReaded,
      );
      return dto;
    }

    static arrayToDomain(Entity: NotifyDTO[]): NotifyEntity[] {
        const notify: NotifyEntity[] = [];
        for (const entity of Entity) {
          notify.push(this.toDomain(entity));
        }
        return notify;
    }

    async toOrm(domainEntity: NotifyEntity): Promise<NotifyEntity> {
        const ormUser = NotifyEntity.create(
            domainEntity.id,
            domainEntity.title,
            domainEntity.body,
            domainEntity.date,
            domainEntity.userReaded,
        )
        return ormUser;
}   
}
