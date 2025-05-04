import * as trip from './trip'
import type { Archived, Active } from './trip'
import { removeFromMarket, submitTripBrief } from './trip-behavior'

declare const archivedTrip: {
  brief: Archived<trip.TripBrief>
  toLaunch: Archived<trip.TripToLaunch>
  toOperate: Archived<trip.TripToOperate>
}
declare const activeTrip: {
  brief: Active<trip.TripBrief>
  toLaunch: Active<trip.TripToLaunch>
  toOperate: Active<trip.TripToOperate>
}

// testing `submitTripBrief`:
submitTripBrief(activeTrip.brief) // OK
submitTripBrief(activeTrip.toLaunch) // Fails, cannot submit a trip to launch.
submitTripBrief(activeTrip.toOperate) // Fails, cannot submit a trip to operate.
submitTripBrief(archivedTrip.brief) // Fails, cannot submit an archived trip.

// testing `removeFromMarket`:
removeFromMarket(activeTrip.toLaunch) // OK
removeFromMarket(archivedTrip.toLaunch) // Fails, cannot remove from market an archived trip.
removeFromMarket(activeTrip.brief) // Fails, cannot remove from market on trip brief.
removeFromMarket(activeTrip.toOperate) // Fails, cannot remove from market a trip to operate.
