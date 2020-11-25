const fs = require('fs');
const path = require('path');

const studentsPath = path.resolve('./students.txt');
const gradesPath = path.resolve('./grades.txt');
const creditsPath = path.resolve('./credits.txt');
const resultPath = path.resolve('./result.txt');

Promise.all(
  [
    readFile(studentsPath),
    readFile(gradesPath),
    readFile(creditsPath)
  ]
).then(readData => {
  const summaryData = summary(readData);
  return writeFile(summaryData, resultPath);
}).then(writeData => {
  console.log(writeData);
}).catch((error) => {
  console.log(error);
});

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, { encoding: 'utf-8' },
      (error, data) => error ? reject(error) : resolve(data))
  });
}

function writeFile(data, path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), { encoding: 'utf-8' },
      (error) => error ? reject(error) : resolve(`Data saved to ${path}`))
  });
}

function summary(data) {
  const studentsData = prepareData(data[0]);
  const gradesData = prepareData(data[1]);
  const creditsData = prepareData(data[2]);

  const students = buildStudentsMap(studentsData);
  const grades = buildGradesMap(gradesData);
  const credits = buildCreditsMap(creditsData);

  let summary = [];

  for (const facultyNumber in students) {
    const studentName = students[facultyNumber];
    const studentGrades = calculateGrades(grades[facultyNumber], credits);

    let studentEntry = {};

    studentEntry.name = studentName;
    studentEntry = { ...studentEntry, ...studentGrades };

    summary.push(studentEntry);
  }
  return summary;
}

function prepareData(data) {
  const newLineRegex = new RegExp(/\r?\n/);
  return data.split(newLineRegex).filter(line => !line.startsWith('#'));
}

function buildStudentsMap(studentsData) {
  let students = {};

  studentsData.map(student => {
    const name = student.substring(0, student.lastIndexOf(' '));
    const facultyNumber = student.substring(student.lastIndexOf(' ') + 1, student.length);
    students[facultyNumber] = name;
  });

  return students;
}

function buildGradesMap(gradesData) {
  let grades = {};

  gradesData = gradesData.map(grade => grade.replace('xxx', '0.0'));

  gradesData.map(grade => {
    const facultyNumber = grade.substring(0, grade.indexOf(' '));
    const gradeList = grade.substring(grade.indexOf(' ') + 1, grade.length)
      .split(' ')
      .map(grade => parseFloat(grade));

    grades[facultyNumber] = gradeList;
  });

  return grades;
}

function buildCreditsMap(creditsData) {
  let credits = {};

  const subjectsList = creditsData[0].split(' ');
  const creditsList = creditsData[1].split(' ');

  subjectsList.map((subject, index) => {
    const credit = parseFloat(creditsList[index]);
    credits[index] = { name: subject, credits: credit };
  });

  return credits;
}

function calculateGrades(grades, credits) {
  let studentGrades = {};

  grades.forEach((grade, index) => {
    const subject = credits[index].name;
    const credit = credits[index].credits;

    studentGrades[subject] = ((grade / 6) * credit).toFixed(2);
  });

  return studentGrades;
}