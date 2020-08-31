// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,

    /*Get All Services*/
    getAllZonePath: "/admin-service/api/rest/v1/manage/get-all-zones",
    getAllLocalityPath: "/admin-service/api/rest/v1/manage/get-all-localities",
    getAllVenueCategoryPath: "/admin-service/api/rest/v1/manage-venues/get-all-venue-categories",
    getAllMoviePath: "/admin-service/api/rest/v1/manage-movies/get-all-movies",
    getAllGenrePath: "/admin-service/api/rest/v1/manage-movies/get-all-genres",
    viewCompanyPath: "/admin-service/api/rest/v1/manage-companies/get-all-companies",
    getAllActiveCompanyPath: "/admin-service/api/rest/v1/manage-companies/get-all-active-companies",
    viewAllVenuePath: "/admin-service/api/rest/v1/manage-venues/get-all-venues",
    getAllVenueByCompanyPath: "/admin-service/api/rest/v1/manage-venues/get-venues-of-company",
    viewAllScreenPath: "/admin-service/api/rest/v1/manage-screens/get-screens-of-venue",
    getAllClassesByScreen: "/admin-service/api/rest/v1/manage-seat-layout/get-all-classs-of-screen",
    getAllChargePath: "/fare-service/api/rest/v1/charge/get/all",
    getAllTaxPath: "/fare-service/api/rest/v1/tax/get/all",
    getAllFarePath: "/fare-service/api/rest/v1/fare/get/all",
    getFarePath: "/fare-service/api/rest/v1/fare/get",
    getAllExperience: "/admin-service/api/rest/v1/manage-screens/all/experience",

    //Publish Module
    deletePublishShowsPath: "/publish-service/api/rest/v1/reservation-publish/delete-published-shows",
    fetchLastPublishScreenDate: "/publish-service/api/rest/v1/reservation-publish/fetch-last-published-date-for-screen",
    newzonePath: "/publish-service/api/rest/v1/reservation-publish/setup-new-zone",
    savePublishData: "/publish-service/api/rest/v1/reservation-publish/publish-shows",
    editPublishData: "/publish-service/api/rest/v1/reservation-publish/modify-published-shows",
    getPublishedShows: "/publish-service/api/rest/v1/reservation-publish/get-published-shows",
    approvePublishedShows: "/publish-service/api/rest/v1/reservation-publish/approve-shows",
    /*CRUD Services*/
    // Screen Module
    addScreenPath: "/admin-service/api/rest/v1/manage-screens/add-screen",
    addClassPath: "/admin-service/api/rest/v1/manage-seat-layout/add-class",
    addClassesAndSeatsPath: "/admin-service/api/rest/v1/manage-seat-layout/add-classes-seat-layout",
    addScreenLayoutToClassPath: "/admin-service/api/rest/v1/manage-seat-layout/add-seat-layout-to-class",
    deleteScreenPath: "/admin-service/api/rest/v1/manage-screens/delete-screen",

    updateScreenPath: "/admin-service/api/rest/v1/manage-screens/update-screen",
    updateClassPath: "/admin-service/api/rest/v1/manage-seat-layout/update-class",
    updateScreenLayoutToClassPath: "/admin-service/api/rest/v1/manage-seat-layout/update-seat-layout-of-class",

    viewAllClassesForScreenPath: "/admin-service/api/rest/v1/manage-seat-layout/get-all-classs-of-screen",
    viewAllSeatLayoutForClassPath: "/admin-service/api/rest/v1/manage-seat-layout/get-seat-layout-of-class",
    deleteScreenLayoutToClassPath: "/admin-service/api/rest/v1/manage-seat-layout/delete-seat-layout-of-class",

    /*CRUD Services*/
    //Zone
    addZonePath: "/admin-service/api/rest/v1/manage/add-zone",
    updateZonePath: "/admin-service/api/rest/v1/manage/update-zone",
    deleteZonePath: "/admin-service/api/rest/v1/manage/delete-zone",

    //Locality
    addLocalityPath: "/admin-service/api/rest/v1/manage/add-locality",
    updateLocalityPath: "/admin-service/api/rest/v1/manage/update-locality",
    deleteLocalityPath: "/admin-service/api/rest/v1/manage/delete-locality",

    //Venue Category
    addVenueCategoryPath: "/admin-service/api/rest/v1/manage-venues/add-venue-category",
    updateVenueCategoryPath: "/admin-service/api/rest/v1/manage-venues/update-venue-category",
    deleteVenueCategoryPath: "/admin-service/api/rest/v1/manage-venues/delete-venue-category",

    //Movie
    addMoviePath: "/admin-service/api/rest/v1/manage-movies/add-movie",
    updateMoviePath: "/admin-service/api/rest/v1/manage-movies/update-movie",
    deleteMoviePath: "/admin-service/api/rest/v1/manage-movies/delete-movie",

    //Genre
    addGenrePath: "/admin-service/api/rest/v1/manage-movies/add-genre",
    updateGenrePath: "/admin-service/api/rest/v1/manage-movies/update-genre",
    deleteGenrePath: "/admin-service/api/rest/v1/manage-movies/delete-genre",

    // Module-operation
    viewAllModuleOperationsPath: "/rbac-service/api/rest/v1/module/fetch-all-module-operations",
    deleteModuleOperationsPath: "/rbac-service/api/rest/v1/module-operation/delete",
    updateModuleAndOperationPath: "/rbac-service/api/rest/v1/module-operation/modify",
    addModuleAndOperationPath: "/rbac-service/api/rest/v1/module/create-module-operation",

    fetchAllModulesPath: "/rbac-service/api/rest/v1/role/get/user/operation/access",
    // User Management
    authenticate: "/user-service/api/rest/v1/user/authenticate",
    getAllRolePath: "/rbac-service/api/rest/v1/role/get-all",
    addUserPath: "/user-service/api/rest/v1/user/profile/create",
    updateUserProfilePath: "/user-service/api/rest/v1/user/profile/update",
    retrieveUserProfilePath: "/user-service/api/rest/v1/user/profile/retrieve",
    updatePassword: "/user-service/api/rest/v1/user/password/update",

    //Company
    addCompanyPath: "/admin-service/api/rest/v1/manage-companies/add-company",
    updateCompanyPath: "/admin-service/api/rest/v1/manage-companies/update-company",
    deleteCompanyPath: "/admin-service/api/rest/v1/manage-companies/delete-company",
    getParticularCompany: "/admin-service/api/rest/v1/manage-companies/get-company-details",
    //Venue
    addVenuePath: "/admin-service/api/rest/v1/manage-venues/add-venue",
    updateVenuePath: "/admin-service/api/rest/v1/manage-venues/update-venue",
    deleteVenuePath: "/admin-service/api/rest/v1/manage-venues/delete-venue",
    getParticularVenuePath: "/admin-service/api/rest/v1/manage-venues/get-venue-details",
    //Charge
    addChargePath: "/admin-service/api/rest/v1/charge/create",
    updateChargePath: "/admin-service/api/rest/v1/charge/update",
    deleteChargePath: "/admin-service/api/rest/v1/charge/delete",

    //Fare
    addFarePath: "/fare-service/api/rest/v1/fare/create",
    updateFarePath: "/fare-service/api/rest/v1/fare/update",
    deleteFarePath: "/fare-service/api/rest/v1/fare/delete",

    //Tax
    addTaxPath: "/fare-service/api/rest/v1/tax/create",
    updateTaxPath: "/fare-service/api/rest/v1/tax/update",
    deleteTaxPath: "/fare-service/api/rest/v1/tax/delete",

    getAllCountries: "/location-service/api/rest/v1/location/country/all",
    getAllStates: "/location-service/api/rest/v1/location/region/all",

};