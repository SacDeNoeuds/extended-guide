import type { Tagged, UnwrapTagged } from 'type-fest'

type AccountId = Tagged<string, 'AccountId'>
type MemberId = Tagged<AccountId, 'MemberId'>
type Test01 = UnwrapTagged<MemberId>
// string. I expected AccountId
