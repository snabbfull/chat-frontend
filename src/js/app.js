/* eslint-disable import/extensions */
import ChatUI from './ChatUI.js';
import ChatSocket from './ChatSocket.js';
import UserManager from './UserManager.js';

const API_URL = 'http://localhost:3000';
const WS_URL = 'ws://localhost:3000/ws';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new ChatUI();
  const userManager = new UserManager(API_URL, ui);
  const socket = new ChatSocket(WS_URL, ui, userManager);

  // Модальное окно для регистрации
  ui.initModal(async (name) => {
    const result = await userManager.register(name);
    if (result.success) {
      ui.showChat(result.user);
      socket.connect();
    } else {
      ui.showError(result.error);
    }
  });

  // Отправка сообщений
  ui.onSend((msg) => socket.sendMessage(msg));
});
