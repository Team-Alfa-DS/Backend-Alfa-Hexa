import { IMapper } from "src/common/application/mappers/mappers.interface";
import { Notify } from "src/notify/notify/domain/notify";
import { NotifyEntity } from "../entities/notify.entity";

export  class NotifyMapper {
    
    static toDomain(Entity: NotifyEntity): Notify {
      const notify = new Notify(
        Entity.id,
        Entity.title,
        Entity.body,
        Entity.date,
        Entity.userReaded
      );
      return notify;
    }

    static arrayToDomain(Entity: NotifyEntity[]): Notify[] {
        const notify: Notify[] = [];
        for (const entity of Entity) {
          notify.push(this.toDomain(entity));
        }
        return notify;
    }

    async toPersistence(domainEntity: Notify): Promise<NotifyEntity> {
        const ormUser = NotifyEntity.create(
            domainEntity.Id,
            domainEntity.Title,
            domainEntity.Body,
            domainEntity.Date,
            domainEntity.UserReaded,
        )
        return ormUser;
}   
}
