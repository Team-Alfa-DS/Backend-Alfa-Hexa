export interface IMapper<D, O> {
  toOrm(DomainEntity: D): Promise<O>;
  toDomain(OrmEntity: O): Promise<D>;
}
