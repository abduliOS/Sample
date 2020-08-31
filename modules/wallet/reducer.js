import * as Constants from "./constants";

const defaultState = {
    isLoading: false,
    walletHistory: [],
    walletBalance: 0
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case Constants.WALLET_SUMMARY_REQUEST:
            return {
                ...prevState,
                isLoading: true,
            };

        case Constants.WALLET_SUMMARY_RESPONSE:

            let walletSummaryRes = action.data
            let walletDetails = walletSummaryRes.wallet_details ? walletSummaryRes.wallet_details : null
            let walletBalance = walletDetails != null ? walletDetails.currentBalance ? walletDetails.currentBalance : 0 : 0
            let walletHistory = walletDetails != null ? walletDetails.paymentDTOs ? walletDetails.paymentDTOs : [] : []

            return {
                ...prevState,
                isLoading: false,
                walletBalance,
                walletHistory
            };

        default:
            return {
                ...prevState
            };
    }
}