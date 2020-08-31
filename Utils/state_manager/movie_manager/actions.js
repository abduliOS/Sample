import { MOVIE_DATE_REQUEST, MOVIE_DATE_RESPONSE } from "./constants";

export function getMovieDates(data) {
    return {
        type: MOVIE_DATE_REQUEST,
        data
    }
}
