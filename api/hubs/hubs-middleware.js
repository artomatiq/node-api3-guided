const Hubs = require('./hubs-model.js');

function checkHubId(req, res, next) {
    Hubs.findById(req.params.id)
        .then (hub => {
            if (!hub) {
                next({
                    status: 404,
                    message: `Hub ${req.params.id} not found`
                });
            }
            else {
                req.hub = hub;
                next();
            }
        })
        .catch(error => {
            next(error);
        });
}
module.exports = {
    checkHubId,
};