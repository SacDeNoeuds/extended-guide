import type { Branded } from '../branded'

export type TripId = Branded<string, 'TripId'>
export type TripName = Branded<string, 'TripName'>
export type TripStartDate = Branded<Date, 'TripStartDate'>
export type TripEndDate = Branded<Date, 'TripEndDate'>
