// teacherObserver.js
const Observer = require('./observers');
const { createNotification } = require('../../../controllers/notification.controller');

class TeacherObserver extends Observer {
  async update(data) {
    console.log("Teacher notified with data: ", data);

    if (data.teacher) {
      try {
        await createNotification(data.teacher, `Topic ${data.title} has been updated.`);
      } catch (error) {
        console.error("Error creating notification for teacher:", error);
      }
    }else {console.log("Teacher does not exist!")}
  }
}

module.exports = TeacherObserver;
