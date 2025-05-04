import * as trip from './trip'

declare const archivedTrip: {
  brief: trip.Archived<trip.TripBrief>
  toLaunch: trip.Archived<trip.TripToLaunch>
  toOperate: trip.Archived<trip.TripToOperate>
}
declare const activeTrip: {
  brief: trip.Active<trip.TripBrief>
  toLaunch: trip.Active<trip.TripToLaunch>
  toOperate: trip.Active<trip.TripToOperate>
}

// testing `submitTripBrief`:
trip.submitTripBrief(activeTrip.brief) // OK
trip.submitTripBrief(activeTrip.toLaunch) // Fails, cannot submit a trip to launch.
trip.submitTripBrief(activeTrip.toOperate) // Fails, cannot submit a trip to operate.
trip.submitTripBrief(archivedTrip.brief) // Fails, cannot submit an archived trip.

// testing `removeFromMarket`:
trip.removeFromMarket(activeTrip.toLaunch) // OK
trip.removeFromMarket(archivedTrip.toLaunch) // Fails, cannot remove from market an archived trip.
trip.removeFromMarket(activeTrip.brief) // Fails, cannot remove from market on trip brief.
trip.removeFromMarket(activeTrip.toOperate) // Fails, cannot remove from market a trip to operate.
