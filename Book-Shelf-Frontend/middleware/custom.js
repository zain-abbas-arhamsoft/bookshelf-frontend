const customMiddleware = (store) => (next) => (action) => {
    // Exclude the 'register' function from the serialized state
    if (action.type === "persist/REHYDRATE") {
        const {
            payload: { auth },
        } = action;

        const newAuth = { ...auth };

        if (newAuth.register) {
            delete newAuth.register;
        }

        action.payload.auth = newAuth;
    }

    // Call the next middleware in the chain
    return next(action);
};

export default customMiddleware;