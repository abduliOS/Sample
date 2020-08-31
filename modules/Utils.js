import * as AppConstants from './AppConstants'
import { AsyncStorage } from 'react-native';

class Utils {

    constructor() {

        this.cashFree = {
            test: 'https://test.cashfree.com/api/v2/cftoken/order'
        }

        this.host_point = "https://dev.moviepanda.in";

        const hostWalletEP = "http://117.200.79.81:9087"

        const hostQA = "https://qa.moviepanda.in/services/"
        const baseHost = "https://dev.moviepanda.in/services/"
        const hostDev = baseHost

        const host = hostDev + "admin-service/api/rest/v1/";
        const host_shows = hostDev + "show-service/api/rest/v1/";
        const host_reservation = hostDev + "reservation-service/api/rest/v1/";
        const host_user_management = hostDev + "user-service/api/rest/v1/user/";
        const host_pre_booking = hostDev + "prebooking-service/api/rest/v1/";
        const host_wallet = hostDev + "payment-web/api/rest/v1/";
        const host_payment_web = hostDev + "payment-web/api/rest/v1/";
        // const host_pre_booking = "https://dev.ticketpanda.in/services/schedule-service/api/rest/v1/";
        this.endpoint = {
            // cityList: host + 'manage/get-deployed-locations',
            cityList: host + 'manage/get-deployed-locations',
            movieList: host_shows + 'shows/now-showing',
            movieDates: host_shows + 'shows/fetch/showdates',
            movieShows: host_shows + 'shows/movie/show-times',
            movieShowsByVenue: host_shows + 'shows/venue/show-times',
            reserveBlockSeats: host_reservation + 'reservation/reserveAndBlock',
            castCrew: host + 'manage-cineast/movie/cineasts',
            relatedMovies: host_shows + 'shows/recommended/movies',
            userReviews: host + 'manage-review/user/reviews',
            criticsReviews: host + 'manage-review/critic/reviews',
            seatLayout: host_reservation + 'reservation/seatingRepresentation',
            sendOTP: host_user_management + 'authenticate/otp/initiate',
            authenticateOTP: host_user_management + 'authenticate',
            getProfile: host_user_management + 'profile/retrieve',
            setProfile: host_user_management + 'profile/update',
            bookingSuccess: host_reservation + 'reservation/booking/success',
            upcomingMovies: host + 'manage-movies/upcoming/movies',
            venuesByCity: host + 'manage-venues/city/venues',
            venuesDate: host_shows + 'shows/fetch/venuedates',
            venuesShowTimes: host_shows + 'shows/venue/show-times',
            // bookingHistory: host_reservation + 'bookinghistory/retrieve',
            bookingHistory: hostDev + 'reservation-service/api/rest/v2/booking/history',
            // cancelTicket: host_reservation + 'reservation/booking/cancel',
            cancelTicket: hostDev + '/reservation-service/api/rest/v2/cancellation/submit',
            genreList: host + 'manage-movies/get-all-genres',
            addVenue: host_user_management + 'profile/add/preference/venue',
            addGenre: host_user_management + 'profile/add/preference/genre',
            removeVenue: host_user_management + 'profile/delete/preference/venue',
            removeGenre: host_user_management + 'profile/delete/preference/genre',
            userVenues: host_user_management + 'profile/fetch/preference/venue',
            userGenres: host_user_management + 'profile/fetch/preference/genre',
            timeSlot: host_pre_booking + 'schedule/booking/preference/get-All-Time',
            experienceList: host + 'manage/venue/experiences',
            scheduleBooking: host_pre_booking + 'schedule/booking/preference/add',
            addReview: host_reservation + 'manage-review/user/store',
            // Wallet
            walletSummary: host_payment_web + 'getWalletDetails',
            walletOrderId: host_payment_web + 'details/wallet',
            // getFareDetails: hostDev + 'reservation-service/api/rest/v2/Reservation/getFareDetails',
            getFareDetails: hostDev + 'reservation-service/api/rest/v2/reservation/fare-details',
            // getPaymentDetails: host_payment_web + 'details',
            getPaymentDetails: host_payment_web + 'third-party',
            updatePaymentStatus: host_payment_web + 'mobile/redirect',
            // getTicketDetails: hostDev + 'reservation-service/api/rest/v2/Reservation/getTicketDetails',
            getTicketDetails: hostDev + 'reservation-service/api/rest/v2/reservation/ticket-details',
        }

    }

    async getHeader(header = {}) {

        let authorizationToken = null
        let loginType = await AsyncStorage.getItem(AppConstants.LOGIN_TYPE)
        console.log('loginType ' + loginType)

        if (loginType == AppConstants.ANONYMOUS_LOGIN) {

            let anonymsTokenData = await AsyncStorage.getItem(AppConstants.ANONYMOUS_TOKEN_DATA)
            anonymsTokenData = anonymsTokenData.length > 0 ? JSON.parse(anonymsTokenData) : ''
            authorizationToken = anonymsTokenData.token ? anonymsTokenData.token : ''
            console.log('authorizationToken ' + authorizationToken)

        } else if (loginType == AppConstants.USER_LOGIN) {

            authorizationToken = await AsyncStorage.getItem(AppConstants.USER_TOKEN)

        }

        console.log('authorizationToken ' + authorizationToken)

        header["Content-Type"] = "application/json";
        header["Authorization"] = 'Bearer ' + authorizationToken;
        return new Headers(header);
    }

    async getPaymentTokenHeader(header = {}) {
        header["Content-Type"] = "application/json";
        header["x-client-id"] = '90928299dd37d577fc564d032909';
        header["x-client-secret"] = '9e3903c80fc83226de7e193f0d3a39816ad5830a';
        return new Headers(header);
    }

    async getCity() {
        return await AsyncStorage.getItem(AppConstants.USER_CITY)
    }

    saveAnonymsToken(data) {

        return new Promise((resolve, reject) => {

            AsyncStorage.setItem(AppConstants.ANONYMOUS_TOKEN_DATA, JSON.stringify(data))
            AsyncStorage.setItem(AppConstants.LOGIN_TYPE, AppConstants.ANONYMOUS_LOGIN)

            resolve()
        })
    }

    async getMobileNo() {
        return await AsyncStorage.getItem(AppConstants.USER_MOBILE_NO)
    }

}

module.exports = new Utils();