document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }

  if (description === '' || severity === '' || assignedTo === '') {
    alert('Empty field..');
  }
  else {
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  fetchIssues();
  document.getElementById('issueInputForm').reset();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    const dynamicDescId = id + i + description.slice(0, description.length);
    const dynamicSevId = id + i + severity.slice(0, severity.length);
    const dynamicAssignId = id + i + assignedTo.slice(0, assignedTo.length);
    issuesList.innerHTML += `<div class="well my-4 p-4 bg-issue">
                              <h6>Issue ID: ${id} </h6>
                              <p class="mt-3"><span class="label label-info bg-warning p-1 rounded"> ${status} </span></p>
                              <h3 id=${dynamicDescId}> ${description} </h3>
                              <p id=${dynamicSevId}><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p id=${dynamicAssignId}><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;
    if (status === 'Closed') {
      document.getElementById(`${dynamicDescId}`).style.textDecoration = 'line-through';
      document.getElementById(`${dynamicSevId}`).style.textDecoration = 'line-through';
      document.getElementById(`${dynamicAssignId}`).style.textDecoration = 'line-through';
    }

  }
}

if (localStorage.getItem('issues')) {
  fetchIssues();
}