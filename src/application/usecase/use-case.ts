export interface UseCase<T extends unknown, R extends unknown> {
  execute(input: T): Promise<R>;
}
