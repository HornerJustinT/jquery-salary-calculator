$(readyNow); // Shorthand for $(document).ready(readyNow);

function readyNow() {
  $('#submitInfo').on('click', submitFunction);
  $('#workerTable').on('click', 'tr', remove)
}
let monthlyCosts = 0; // global variables
let workerArray = [];

function submitFunction() {
  let worker = getWorker();// gets worker
  $('#tableBody').prepend(`<tr><td>0</td><td>${worker.firstName}</td><td>${worker.lastName}</td><td>${worker.id}</td><td>${worker.jobTitle}</td><td>${worker.annualSalary}</td></tr>`)//appends new worker
  workerArray=makeArray();// makes array out of workers in the dom
  setindex(); // clears the dom and adds the workers to correct the index
  appendCosts();// checks the monthly price by += the workers on the dom annual salary also appens
  warningCheck(monthlyCosts);
  clearInputFields();
}

function setindex(){
  $('#tableBody').empty();
  for(let i=1; i<workerArray.length;i++){
    $('#tableBody').append(`<tr><td>${i-1}</td><td>${workerArray[i].firstName.innerText}</td><td>${workerArray[i].lastName.innerText}</td><td>${workerArray[i].id.innerText}</td><td>${workerArray[i].jobTitle.innerText}</td><td>${workerArray[i].annualSalary.innerText}</td><td><button>Delete Me</Button></td></tr>`)
  }
}
function appendCosts() {
  monthlyCosts = 0;
  for (i = 1; i < $('#workerTable')[0].rows.length; i++) {
    monthlyCosts += (parseInt($('#workerTable')[0].rows[i].cells[5].innerText)) / 12;
  }
  $('#monthlyCost').empty();
  $('#monthlyCost').append(`<h1>${monthlyCosts}</h1>`)
}

function getWorker() {
  let worker = new person($('#firstName').val(), $('#lastName').val(), $('#id').val(), $('#jobTitle').val(), $('#annualSalary').val());
  return worker;
}

function warningCheck(monthlyCosts) {
  if (monthlyCosts > 20000) {
    $('#monthlyCost').addClass('alert-danger'); // relook 
  } else {
    $('#monthlyCost').removeClass('alert-danger');
  }
}

function makeArray() {
  workerArray = []
  for (let i = 0; i < $('#workerTable')[0].rows.length; i++) {
    workerArray.push({
      firstName: $('#workerTable')[0].rows[i].cells[1],
      lastName: $('#workerTable')[0].rows[i].cells[2],
      id: $('#workerTable')[0].rows[i].cells[3],
      jobTitle: $('#workerTable')[0].rows[i].cells[4],
      annualSalary: $('#workerTable')[0].rows[i].cells[5]
    });
  }
  return workerArray;
}

function clearInputFields() {
  $('#firstName').val('');
  $('#lastName').val('');
  $('#id').val('');
  $('#jobTitle').val('');
  $('#annualSalary').val('');
}
class person {
  constructor(firstName, lastName, id, jobTitle, annualSalary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.jobTitle = jobTitle;
    this.annualSalary = annualSalary;
  }
}

function remove() {
  this.remove();// removes cell
  makeArray(); // makes an array based on the dom workers
  setindex() // emptys the dom and then appends it with index based on position in array
  appendCosts(); // clears and appends the cost 
  warningCheck(); // checks to see if above 20
}



// Once the employee is deleted, update the total spend on salaries account for this employee's removal. 
// This will require that the logic knows which element was removed. You will need to use `.text()` as a
//  getter or look into jQuery's `.data()` function. This is tricky! 