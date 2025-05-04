import { TripEndDate, TripId, TripName, TripStartDate } from './trip-objects'

export interface TripBrief {
  id: TripId
  stage: 'brief'
  // everything is optional, at this stage the trip is under construction
  name: TripName | undefined
  startDate: TripStartDate | undefined
  endDate: TripEndDate | undefined
  archiveDate: Date | undefined
  // …
}

// a trip brief can be archived or submitted.
export declare function archiveTripBrief(
  trip: Active<TripBrief>,
): Archived<TripBrief>

export declare function submitTripBrief(
  trip: Active<TripBrief>,
): Active<TripToLaunch>

export interface TripToLaunch {
  id: TripId
  stage: 'launch'
  // These cannot be `undefined` anymore.
  name: TripName
  startDate: TripStartDate
  endDate: TripEndDate
  archiveDate: Date | undefined
  // …
}

// from `launch` to `operate` stage:
/**
 * After a certain deadline (60 days before the trip start date, usually), we remove
 * the trip from the market.
 * If it sold enough, it moves to `operate` stage
 * If it has not sold enough, we archive it.
 */
export declare function removeFromMarket(
  trip: Active<TripToLaunch>,
): Archived<TripToLaunch> | Active<TripToOperate>

export interface TripToOperate {
  id: TripId
  stage: 'operate'
  name: TripName
  startDate: TripStartDate
  endDate: TripEndDate

  archiveDate: undefined // The trip cannot be archived here.
}

// export interface TripDone { … }

export type Trip = TripBrief | TripToLaunch | TripToOperate

export type Archived<T extends Trip> = T & { archiveDate: Date }
export type Active<T extends Trip> = T & { archiveDate: undefined }
