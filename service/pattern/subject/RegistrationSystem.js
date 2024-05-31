const Subject = require('./subjects');
const TopicModel = require('../../../models/topic.model');

class RegistrationSystem extends Subject {
    constructor() {
        super();
    }
    async updateTopic(id, updateData) {
        try {
            const updatedData = await TopicModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );
            console.log("updatedData.teacher", updatedData.teacher)
            if (updatedData.teacher && updatedData.student) {
                this.notify(updatedData);  // Notify observers với dữ liệu cập nhật
            } else {
                console.log("Teacher or Student not found, notification not sent.");
            }
            return updatedData;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RegistrationSystem;
