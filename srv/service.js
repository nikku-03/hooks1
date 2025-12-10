// service.js
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { Students } = this.entities;

  //  Before CREATE or UPDATE → handle validation & defaults
  this.before(['CREATE', 'UPDATE'], 'Students', (req) => {
    const { Name, Course, Score } = req.data;

    // Condition 1: Reject if Score < 
    if (Score < 60) {
      req.error(400, 'Record rejected: Score must be 60 or above.');
    }

    // Condition 3: Assign default values if Name or Course is blank
    if (!Name || Name.trim() === '') {
      req.data.Name = 'Nikita';
    }

    if (!Course || Course.trim() === '') {
      req.data.Course = 'Physics';
    }
  })

  //  Before DELETE → prevent deletion if Score >= 90
  this.before('DELETE', 'Students', async (req) => {
    const studentID = req.data.StudentID;

    // Fetch current score from DB
    const student = await SELECT.one.from(Students).where({ StudentID: studentID });

    if (student && student.Score >= 90) {
      req.error(400, 'Cannot delete: Student has a score of 90 or higher.');
    }
  })
})










// const db = require('@sap/cds')

// const{ Students } = this.entities

// module.exports = CDATASection.service.impl(function(){
//     const{STUDENTS} = this.entities


// this.before(['CREATE','UPDATE'], Students, req =>{
//     if(req.data.Score <= 60){
//         req.error(400, 'Reject the record')
//     }


//     if(!Name || Name.trim() == ''){


//     }
// })






// })