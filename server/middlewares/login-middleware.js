const validateLogin = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }
    catch (err) {
        const status = 400;
        const message = err.errors[0].message;
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
};

export default validateLogin;