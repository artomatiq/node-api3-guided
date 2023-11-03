const Hubs = require('./hubs-model.js');

function checkHubId(req, res, next) {
    Hubs.findById(req.params.id)
        .then (hub => {
            if (!hub) {
                // res.status(404).json({message: `Hub ${req.params.id} not found`});
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

function checkHubName (req, res, next) {
    const {name} = req.body;

    if (name !== undefined && typeof name === 'string' && name.length) {
        next();
    }
    else {
        // res.status(422).json({
        //     message: 'please provide a valid name'
        // });
        next({
            status: 422,
            message: 'please provide a valid name'
        });
    }

}
module.exports = {
    checkHubId,
    checkHubName
};