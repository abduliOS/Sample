import { all, call } from "redux-saga/effects";
import { appWatchers } from './modules/splash/saga'
import { cityWatcher } from './modules/city_selection/saga'
import { movieListWatcher } from './modules/movie_list/saga'
import { movieShowsWatcher } from './modules/movie_shows/saga'
import { seatLayoutWatcher } from './modules/seat_layout/saga'
import { castCrewWatcher } from './modules/cast_crew/saga'
import { otpLoginWatchers } from './modules/login_with_otp/saga'
import { profileWatchers } from './modules/profiles/saga'
import { cinemasWatcher } from './modules/cinemas/saga'
import { myBookingsWatcher } from './modules/my_bookings/saga'
import { movieDetailWatchers } from './modules/movie_detail/saga'
import { walletWatchers } from './modules/wallet/saga'

export default function* rootWatchers() {
  yield all([
    call(appWatchers),
    call(cityWatcher),
    call(movieListWatcher),
    call(movieShowsWatcher),
    call(seatLayoutWatcher),
    call(castCrewWatcher),
    call(otpLoginWatchers),
    call(profileWatchers),
    call(cinemasWatcher),
    call(myBookingsWatcher),
    call(movieDetailWatchers),
    call(walletWatchers)
  ]);
}
