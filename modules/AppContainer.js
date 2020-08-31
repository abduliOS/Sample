import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
} from "react-navigation";

import Splash from './splash/index'
import CitySelection from './city_selection/index'
import MovieList from './movie_list/index'
import MovieDetail from './movie_detail/index'
import VideoPlayer from './movie_detail/VideoPlayer'
import MovieShows from './movie_shows/index'
import SeatLayout from './seat_layout/index'
import CastCrew from './cast_crew/index'
import Sample from './Sample'
import SideMenu from './side_menu/index'

import Login from './login/index'
import LoginOTP from './login_with_otp/index'
import Registration from './registration/index'
import ResetPassword from './reset_password/index'

import SearchMovies from './search_movies/index'
import UpcomingMovies from './movie_list/UpcomingMovies'
import ScheduledBooking from './scheduled_booking/index'
import Profile from './profiles/index'
import EditProfile from './profiles/EditProfile'
import GenreList from './profiles/Genres'
import VenueList from './profiles/Venues'
import UpcomingBooking from './upcoming_booking/index'
import CancelBooking from './cancel_booking/index'

import BookingDetail from './my_bookings/BookingDetail'

import Reviews from './reviews/index'
import Payment from './payment/index'
import PaymentTest from './payment/PaymentTest'

import SideMenuContainer from './side_menu/SideMenuContainer'
import CinemaDetail from '../modules/cinemas/CinemaDetail'
import Wallet from '../modules/wallet/index'
import WalletPayment from '../modules/wallet/Payment'
import BookingPreview from '../modules/payment/BookingPreview'

export const stack = createStackNavigator({
    Splash: { screen: Splash },
    CitySelection: { screen: CitySelection },
    MovieList: { screen: MovieList },
    MovieDetail: { screen: MovieDetail },
    MovieShows: { screen: MovieShows },
    SeatLayout: { screen: SeatLayout },
    CastCrew: { screen: CastCrew },
    Login: { screen: Login },
    LoginOTP: { screen: LoginOTP },
    Registration: { screen: Registration },
    ResetPassword: { screen: ResetPassword },
    Sample: { screen: Sample },
    SearchMovies: { screen: SearchMovies },
    ScheduledBooking: { screen: ScheduledBooking },
    Profile: { screen: Profile },
    UpcomingBooking: { screen: UpcomingBooking },
    CancelBooking: { screen: CancelBooking },
    Reviews: { screen: Reviews },
    EditProfile: { screen: EditProfile },
    Payment: { screen: Payment },
    SideMenuContainer: { screen: SideMenuContainer },
    UpcomingMovies: { screen: UpcomingMovies },
    CinemaDetail: { screen: CinemaDetail },
    BookingDetail: { screen: BookingDetail },
    GenreList: { screen: GenreList },
    VenueList: { screen: VenueList },
    VideoPlayer: { screen: VideoPlayer },
    Wallet: { screen: Wallet },
    WalletPayment: { screen: WalletPayment },
    PaymentTest: { screen: PaymentTest },
    BookingPreview: { screen: BookingPreview }
}, {
    headerMode: 'none',
    initialRouteName: 'Splash'
})

export const App = createDrawerNavigator({
    Stack: { screen: stack }
},
    {
        contentComponent: SideMenu,
        drawerWidth: 300,
        drawerPosition: 'right'
    });

export default createAppContainer(App)