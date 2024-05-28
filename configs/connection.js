const mongoose = require('mongoose');
const configuration = require('./configuration');
const userModel = require('../models/user.model');

class MongoSingleton {
  constructor() {
    // Kiểm tra nếu đã có một thể hiện của MongoSingleton tồn tại, thì trả về thể hiện đó
    if (MongoSingleton.instance) {
      return MongoSingleton.instance;
    }

    // Khởi tạo biến state để theo dõi trạng thái kết nối
    const state = {
      connected: false,
    };

    // Phương thức để kết nối đến cơ sở dữ liệu MongoDB
    this.connectDB = async () => {
      if (!state.connected) {
        try {
          // Thực hiện kết nối đến MongoDB
          await mongoose.connect(configuration.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          // Kiểm tra xem đã có một người dùng với username là "student1" chưa, nếu chưa thì tạo mới từ cấu hình
          let user = await userModel.findOne({ username: "student1" });
          if (!user) {
            await userModel.create(configuration.student);
          }

          state.connected = true;
          console.log("Connected to db successfully");
        } catch (error) {
          console.log("Cannot connect to db: " + error.message);
        }
      }
      // Trả về kết nối đến cơ sở dữ liệu
      return mongoose.connection;
    };

    // Phương thức để đóng kết nối đến cơ sở dữ liệu MongoDB
    this.close = async () => {
      if (state.connected) {
        await mongoose.connection.close();
        state.connected = false;
        console.log('MongoDB connection closed');
      }
    };

    // Gán thể hiện của lớp MongoSingleton vào biến instance để đảm bảo chỉ có một thể hiện duy nhất được tạo ra
    MongoSingleton.instance = this;
  }
}

module.exports = new MongoSingleton();
