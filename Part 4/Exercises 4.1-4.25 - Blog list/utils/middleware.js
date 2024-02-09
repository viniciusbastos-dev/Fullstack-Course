const logger = require("./logger");

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        response.status(400).send({ error: "malformatted id" });
        return;
    } else if (error.name === "ValidationError") {
        response.status(400).json({ error: error.message });
        return;
    } else if (error.name === "JsonWebTokenError") {
        return response.status(400).json({ error: error.message });
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "token expired" });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        const token = authorization.replace("Bearer ", "");
        request.token = token;
    }
    next();
};

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
};
