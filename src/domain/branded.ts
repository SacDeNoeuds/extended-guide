export declare const tag: unique symbol
export declare const base: unique symbol

export interface _Tag<Base, Brand> {
  readonly [base]: Base
  readonly [tag]: Brand
}

export type Branded<Base, Brand extends PropertyKey> = BaseOf<Base> &
  _Tag<Base, Brand>

export type BrandOf<T> = T extends { [tag]: infer Tag } ? Tag : never
export type BaseOf<T> = T extends _Tag<infer U, any> ? U : T
