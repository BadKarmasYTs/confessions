const confessionsKey = 'confessions';

function loadConfessions() {
  const confessions = JSON.parse(localStorage.getItem(confessionsKey)) || [];
  const confessionsList = document.getElementById('confessionsList');
  confessionsList.innerHTML = ''; // Clear existing confessions

  confessions.forEach((confession, index) => {
    const confessionDiv = document.createElement('div');
    confessionDiv.classList.add('confession');
    confessionDiv.innerHTML = `
      <p>${confession.text}</p>
      <div class="reaction-container">
        <span class="upvote" onclick="vote(${index}, 'upvote')">👍 ${confession.upvotes}</span>
        <span class="downvote" onclick="vote(${index}, 'downvote')">👎 ${confession.downvotes}</span>
        <span class="heart" onclick="reactToConfession(${index}, 'heart')">❤️</span>
        <span class="star" onclick="reactToConfession(${index}, 'star')">⭐</span>
      </div>
    `;
    confessionsList.appendChild(confessionDiv);
  });
}

function postConfession() {
  const confessionInput = document.getElementById('confessionInput');
  const confessionText = confessionInput.value.trim();
  
  if (confessionText) {
    const confessions = JSON.parse(localStorage.getItem(confessionsKey)) || [];
    const newConfession = { text: confessionText, upvotes: 0, downvotes: 0, heartReacted: false, starReacted: false };
    confessions.push(newConfession);
    localStorage.setItem(confessionsKey, JSON.stringify(confessions));
    confessionInput.value = '';
    loadConfessions();
  }
}

function vote(index, type) {
  const confessions = JSON.parse(localStorage.getItem(confessionsKey)) || [];
  
  if (type === 'upvote') {
    confessions[index].upvotes++;
    confetti(); // Trigger confetti explosion on upvote
  } else if (type === 'downvote') {
    confessions[index].downvotes++;
  }
  
  localStorage.setItem(confessionsKey, JSON.stringify(confessions));
  loadConfessions();
}

function reactToConfession(index, reaction) {
  const confessions = JSON.parse(localStorage.getItem(confessionsKey)) || [];
  if (reaction === 'heart') {
    confessions[index].heartReacted = true;
  } else if (reaction === 'star') {
    confessions[index].starReacted = true;
  }
  localStorage.setItem(confessionsKey, JSON.stringify(confessions));
  loadConfessions();
}

function addEmoji(emoji) {
  const confessionInput = document.getElementById('confessionInput');
  confessionInput.value += emoji; // Add emoji to the confession text
}

// Initialize the app by loading existing confessions
loadConfessions();
