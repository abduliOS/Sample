import * as Constants from "./constants";

export function walletSummaryRequest() {
    return {
        type: Constants.WALLET_SUMMARY_REQUEST
    }
}

export function walletSummaryResponse(data) {
    return {
        type: Constants.WALLET_SUMMARY_RESPONSE,
        data
    }
}

