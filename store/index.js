const { configureStore } = require("@reduxjs/toolkit");
const { default: UserDetailsSlice } = require("./detailsSlice");

const store=configureStore({
    reducer:{
        UserDetailsSlice:UserDetailsSlice.reducer,
    }
})

export default store;