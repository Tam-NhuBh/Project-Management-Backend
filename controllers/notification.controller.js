const NotificationModel = require('../models/notification.model')
module.exports = {
    list: async (req, res) => {
        try {
            let notifications = await NotificationModel
                .find({ user: req.params.user })
                .select("message");
                
            if (notifications.length === 0) {
                // console.log(req.params.user)
                return res.status(404).json({ message: "No notifications found for this user." });
            }

            return res.status(200).json(notifications);
        } catch (error) {
            console.log(error)
        }
    },
    createNotification: async (userId, message) => {
        try {
          const notification = new NotificationModel({
            user: userId,
            message: message,
          });
    
          await notification.save();
          return notification;
        } catch (error) {
          console.error("Error creating notification:", error);
        }
      },

    //   markAsRead: async (req, res) => {
    //     try {
    //       const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    //       res.status(200).json(notification);
    //     } catch (error) {
    //       res.status(500).json({ error: error.message });
    //     }
    //   }
};
