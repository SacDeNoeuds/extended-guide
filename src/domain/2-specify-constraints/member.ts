import { Branded } from '../branded'

export interface Member {
  id: MemberId
  name: MemberName
}
export type MemberId = Branded<string, 'MemberId'>
export type MemberName = Branded<string, 'MemberName'>
