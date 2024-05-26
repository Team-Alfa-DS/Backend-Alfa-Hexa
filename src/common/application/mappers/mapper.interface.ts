
export interface IMapper<D,O> {
    toORM(DomainEntity: D): Promise<O>;
    toDomain(OrmEntity: O): Promise<D>;
}