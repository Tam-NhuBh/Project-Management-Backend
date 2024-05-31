// studentObserver.js
const Observer = require('./observers');
const { createNotification } = require('../../../controllers/notification.controller');

class StudentObserver extends Observer {
  async update(data) {
    console.log("Student notified with data: ", data);

    if (data.student) {
      try {
        await createNotification(data.student, `Topic ${data.title} has been updated.`);
      } catch (error) {
        console.error("Error creating notification for student:", error);
      }
    }else {console.log("Student does not exist!")}
  }
}

module.exports = StudentObserver;
