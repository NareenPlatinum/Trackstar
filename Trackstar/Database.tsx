import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import Course from './models/Course';
import Evaluation from './models/Evaluation';
import Task from './models/Task';
import CourseMapper from './data_mappers/CourseMapper';
import CourseMapperImpl from './data_mappers/CourseMapperImpl';
import EvaluationMapper from './data_mappers/EvaluationMapper';
import EvaluationMapperImpl from './data_mappers/EvaluationMapperImpl';
import TaskMapperImpl from './data_mappers/TaskMapperImpl';
import TaskMapper from './data_mappers/TaskMapper';

export default class Database {
  // TODO:
  // figure out how to properly do callbacks for executeSql!!!!
  // test that foreign key is enabled

  static init = () => {
    const db = SQLite.openDatabase("db.db");
    // check that grade constraint works
    return new Promise((resolve) => {
      db.transaction(tx => {
        // add not null to min_grade
        tx.executeSql("create table if not exists Course (code text primary key not null, title text not null, min_grade float check (min_grade >= 0) check (min_grade <= 100) not null, grade float default 0 check (grade >= 0), complete boolean default 0)")
        resolve()
      })
    }).then(() => {
      return new Promise((resolve) => {
        db.transaction(tx => {
          tx.executeSql("create table if not exists Evaluation (id integer primary key, title text not null, due_date text not null, weight number not null, grade float default 0, complete boolean default 0, course_code text not null, foreign key(course_code) references Course(code), check (weight >= 0 & weight <= 100), check (grade >= 0))")
          resolve()
        })
      }).then(() => {
        db.transaction(tx => {
          tx.executeSql("create table if not exists Task (id integer primary key, title text not null, due_date text, est_duration number not null, priority number, complete boolean default 0, eval_id integer not null, foreign key(eval_id) references Evaluation(id))")
        })
      })
    }
  )}

  static populateCourseTable = () => {
    let courseMapper: CourseMapper = new CourseMapperImpl
    let course1  = new Course ("Object-Oriented Software Engineering", "COMP3004", 90);
    let course2  = new Course ("Database Management Systems", "COMP3005", 90);
    let course3  = new Course ("Human Computer Interaction", "COMP3008", 80);
    let course4  = new Course ("The Meaning of Life", "PHIL1200", 90);

    courseMapper.insert(course1)
    courseMapper.insert(course2)
    courseMapper.insert(course3)
    courseMapper.insert(course4)

  }

  static populateEvalTable = () => {
    let evalMapper: EvaluationMapper = new EvaluationMapperImpl

    let eval1  = new Evaluation ("Project 1", "2020-03-16", 20, "COMP3008");
    let eval2  = new Evaluation ("Project 2", "2020-04-16", 20, "COMP3008");
    let eval3  = new Evaluation ("Midterm", "2020-04-20", 20, "COMP3008");
    let eval4  = new Evaluation ("Final", "2020-04-25", 40, "COMP3008");

    let eval5  = new Evaluation ("Deliverable 1", "2020-04-25", 5, "COMP3004");
    let eval6  = new Evaluation ("Deliverable 2", "2020-04-25", 5, "COMP3004");
    let eval7  = new Evaluation ("Deliverable 3", "2020-04-25", 30, "COMP3004");
    let eval8  = new Evaluation ("Deliverable 4", "2020-04-25", 10, "COMP3004");
    let eval9  = new Evaluation ("Deliverable 5", "2020-04-25", 50, "COMP3004");

    let eval10  = new Evaluation ("Test1", "2020-04-25", 50, "PHIL1200");
    let eval11  = new Evaluation ("Test2", "2020-04-25", 50, "PHIL1200");

    evalMapper.insert(eval1)
    evalMapper.insert(eval2)
    evalMapper.insert(eval3)
    evalMapper.insert(eval4)
    evalMapper.insert(eval5)
    evalMapper.insert(eval6)
    evalMapper.insert(eval7)
    evalMapper.insert(eval8)
    evalMapper.insert(eval9)
    evalMapper.insert(eval10)
    evalMapper.insert(eval11)

  }

  static populateTaskTable = () => {
    let taskMapper: TaskMapper = new TaskMapperImpl

    let task1  = new Task ("Study unit 1", "2020-03-25", 120, 10, false, 1);
    let task2  = new Task ("Study unit 2", "2020-03-25", 120, 10, false, 2);
    let task3  = new Task ("Brainstorm project ideas", "2020-03-10", 30, 2, false, 3);
    let task4  = new Task ("Make class diagram", "2020-03-10", 30, 7, false, 4);
    let task5  = new Task ("Make sequence diagram", "2020-03-10", 30, 7, false, 5);
    let task6  = new Task ("Write pseudocode", "2020-03-10", 30, 2, false, 6);

    taskMapper.insert(task1)
    taskMapper.insert(task2)
    taskMapper.insert(task3)
    taskMapper.insert(task4)
    taskMapper.insert(task5)
    taskMapper.insert(task6)
  }

  static deleteCourseData = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("delete from Course")
    })
  }

  static deleteEvalData = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("delete from Evaluation")
    })
  }

  static deleteTaskData = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("delete from Task")
    })
  }

  static deleteCourseTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Course")
    })
  }

  static deleteEvalTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Evaluation")
    })
  }

  static deleteTaskTable = () => {
    const db = SQLite.openDatabase("db.db");
    db.transaction(tx => {
      tx.executeSql("drop table Task")
    })
  }

  static errorCB(err) {
    console.log("Error processing SQL: "+err.code);
  }

  static courseTest() {
    console.log("inside course test")
    let course  = new Course ("COMP3008", "HCI", 80);
    console.log(course.code)
    course.save()
  }
}