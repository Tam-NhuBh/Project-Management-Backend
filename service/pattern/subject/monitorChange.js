// monitorDatabase.js
const mongoose = require('mongoose');
const Subject = require('./subjects');
const TeacherObserver = require('../observer/teacherObserver');
const StudentObserver = require('../observer/studentObserver');
const RegistrationSystem =require('./RegistrationSystem')
const Topic = require('../../../models/topic.model');

require('dotenv').config();  // Sử dụng thư viện dotenv

// const subject = new Subject();
const teacherObserver = new TeacherObserver();
const studentObserver = new StudentObserver();


const registrationSystem = new RegistrationSystem();

registrationSystem.addObserver(teacherObserver)
registrationSystem.addObserver(studentObserver)


  module.exports = {
    registrationSystem
  };