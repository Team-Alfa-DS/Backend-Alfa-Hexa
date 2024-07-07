export interface IMapper<D, O> {
  toPersistence(DomainEntity: D): Promise<O>;
  toDomain(OrmEntity: O): Promise<D>;
}
