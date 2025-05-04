import * as trip from './trip'
import type { Archived, Active } from './trip'

// a trip brief can be archived or submitted.
export declare function archiveTripBrief(
  trip: Active<trip.TripBrief>,
): Archived<trip.TripBrief>

export declare function submitTripBrief(
  trip: Active<trip.TripBrief>,
): Active<trip.TripToLaunch>

// from `launch` to `operate` stage:
/**
 * After a certain deadline (60 days before the trip start date, usually),
 * we remove the trip from the market.
 * If it sold enough, it moves to `operate` stage
 * If it has not sold enough, we archive it.
 */
export declare function removeFromMarket(
  trip: Active<trip.TripToLaunch>,
): Archived<trip.TripToLaunch> | Active<trip.TripToOperate>
