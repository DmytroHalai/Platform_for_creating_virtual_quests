export default interface NormalizedState<T> { 
  byId: Record<number, Partial<T>>;
  allIds: number[];
}