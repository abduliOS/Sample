import { combineReducers } from "redux";

import CitySelection from './modules/city_selection/reducer'
import MovieListReducer from './modules/movie_list/reducer'
import MovieShowReducer from './modules/movie_shows/reducer'
import SeatLayoutReducer from './modules/seat_layout/reducer'
import CastCrewReducer from './modules/cast_crew/reducer'
import OTPLoginReducer from './modules/login_with_otp/reducer'
import AppReducer from './modules/splash/reducer'
import ProfileReducer from './modules/profiles/reducer'
import CinemasReducer from './modules/cinemas/reducer'
import CinemasDetailReducer from './modules/cinemas/cinemaDetailReducer'
import MyBookingsReducer from './modules/my_bookings/reducer'
import MovieDetailReducer from './modules/movie_detail/reducer'
import WalletReducer from './modules/wallet/reducer'

const rootReducer = combineReducers({
    appReducer: AppReducer,
    citySelection: CitySelection,
    movieListReducer: MovieListReducer,
    movieShowReducer: MovieShowReducer,
    seatLayoutReducer: SeatLayoutReducer,
    castCrewReducer: CastCrewReducer,
    otpLoginReducer: OTPLoginReducer,
    profileReducer: ProfileReducer,
    cinemasReducer: CinemasReducer,
    cinemasDetailReducer: CinemasDetailReducer,
    myBookingsReducer: MyBookingsReducer,
    movieDetailReducer: MovieDetailReducer,
    walletReducer: WalletReducer,
});

export default rootReducer;
