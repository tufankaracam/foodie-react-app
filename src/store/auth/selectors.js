export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectFullUserDetails = (state) => state.auth.fullUserDetails;
export const selectFollowers = (state) => state.auth.followers;
export const selectFollowing = (state) => state.auth.following;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
