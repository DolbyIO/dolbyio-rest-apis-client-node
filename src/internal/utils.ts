export type Expand<T> = T extends infer O
    ? {
          [K in keyof O]: O[K];
      }
    : never;

export type ExpandRecursively<T> = T extends object
    ? T extends infer O
        ? {
              [K in keyof O]: ExpandRecursively<O[K]>;
          }
        : never
    : T;
