import type { BaseOf, Branded } from '../branded'

type AccountId = Branded<string, 'AccountId'>
type MemberId = Branded<AccountId, 'MemberId'>
type Test01 = BaseOf<MemberId>
type Test02 = BaseOf<Test01>

declare const accountId: AccountId
declare const memberId: MemberId
declare const baseOfMemberId: BaseOf<MemberId>

// @ts-expect-error because comparing different types
if (accountId === memberId) {
}

// should work, because comparing 2 account ids
if (accountId === baseOfMemberId) {
}
