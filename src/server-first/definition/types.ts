export type Simplify<T> = { [K in keyof T]: T[K] }

export type If<Condition, WhenTrue, WhenFalse> = Condition extends true
  ? WhenTrue
  : WhenFalse

export type Is<A, B> = [A] extends [B] ? true : false

export type Or<A, B> = If<Is<A, never>, B, A>

export type IsNever<A> = [A] extends [never] ? true : false

// type Test01 = Or<never, 'abc'>
// type Test02 = Or<'ab', 'abc'>
