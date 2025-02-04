import type { Brand, BaseOf } from 'ts-brand'

type AccountId = Brand<string, 'AccountId'>
type MemberId = Brand<AccountId, 'MemberId'>
type Test01 = BaseOf<MemberId>
// never. I expected AccountId
