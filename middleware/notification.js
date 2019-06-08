let Notifications = require("../lib/notification.js");

module.exports = createSendNotificationMiddleware;
function createSendNotificationMiddleware(kind) {
    return function sendNotificationsMiddleware(req, res, next) {
        let { groupID } = req;
        let notification = createNotification(kind, req);

        // this promise shouldn't be `await`ed because the request shouldn't
        // block on delivery. error handling happens inside .deliver()
        notification.deliver();

        next();
    };
}

function createNotification(kind, req) {
    let NotificationImplementation = Object.values(Notifications).find(
        clazz => clazz.prototype.kind == kind
    );

    // passing a request object to the notification system smells like a leaky
    // abstraction but each notification implementation needs different data
    return new NotificationImplementation(req);
}
