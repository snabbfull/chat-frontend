export default class ChatUI {
  constructor() {
    // Модалка
    this.modal = document.getElementById('nicknameModal');
    this.nicknameInput = document.getElementById('nicknameInput');
    this.nicknameBtn = document.getElementById('nicknameBtn');
    this.nicknameError = document.getElementById('nicknameError');

    // Чат
    this.chatContainer = document.querySelector('.chat-container');
    this.chat = document.querySelector('.chat');
    this.usersList = document.querySelector('.users');
    this.chatInput = document.querySelector('.message-text-input');
    this.chatSend = document.querySelector('.message-text-send');

    this.currentUser = null;
  }

  initModal(callback) {
    this.nicknameBtn.addEventListener('click', () => {
      const name = this.nicknameInput.value.trim();
      if (!name) {
        this.showError('Введите никнейм');
        return;
      }
      callback(name);
    });
  }

  showError(msg) {
    this.nicknameError.textContent = msg;
  }

  showChat(currentUser) {
    this.currentUser = currentUser;
    this.modal.style.display = 'none';
    this.chatContainer.style.display = 'flex';
  }

  onSend(callback) {
    this.chatSend.addEventListener('click', () => {
      const text = this.chatInput.value.trim();
      if (!text) return;
      callback(text);
      this.chatInput.value = '';
    });
  }

  renderUsers(users) {
    this.usersList.innerHTML = '';
    users.forEach((u) => {
      const li = document.createElement('li');
      li.textContent = u.name === this.currentUser.name ? `${u.name} (You)` : u.name;
      this.usersList.appendChild(li);
    });
  }

  renderMessage({ user, message, time }) {
    const msgEl = document.createElement('div');
    msgEl.classList.add('message');

    const isOwn = user.name === this.currentUser.name;
    msgEl.classList.add(isOwn ? 'own' : 'other');

    msgEl.innerHTML = `
      <div class="meta">
        ${isOwn ? 'You' : user.name} 
        <span class="time">${time}</span>
      </div>
      <div class="text">${message}</div>
    `;

    this.chat.appendChild(msgEl);
    this.chat.scrollTop = this.chat.scrollHeight;
  }
}
