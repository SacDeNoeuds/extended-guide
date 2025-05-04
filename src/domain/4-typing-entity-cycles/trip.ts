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
