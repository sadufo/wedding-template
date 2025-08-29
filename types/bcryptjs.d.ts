declare module "bcryptjs" {
  // минимальные экспорты, используемые в проекте
  export function hash(s: string, saltOrRounds: number | string): Promise<string>;
  export function compare(s: string, hash: string): Promise<boolean>;
  const _default: {
    hash: typeof hash;
    compare: typeof compare;
  };
  export default _default;
}
