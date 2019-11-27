import createDataContext from './CreateDataContext';

const authReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
};

export const { Context, Provider } = createDataContext(
    authReducer,
    {}, //actions object
    { isSignedIn: false}
)

//actions
