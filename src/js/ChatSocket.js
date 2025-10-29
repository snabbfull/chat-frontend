export default class ChatSocket {
  constructor(wsUrl, ui, userManager) {
    this.wsUrl = wsUrl;
    this.ui = ui;
    this.userManager = userManager;
    this.ws = null;
  }

  connect() {
    this.ws = new WebSocket(this.wsUrl);

    this.ws.addEventListener('open', () => console.log('✅ WebSocket открыт'));
    this.ws.addEventListener('close', () => console.log('❌ WebSocket закрыт'));
    this.ws.addEventListener('error', (e) => console.error('⚠️ WebSocket ошибка', e));

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);

      // Список пользователей
      if (Array.isArray(data)) {
        this.ui.renderUsers(data);
        return;
      }

      // Сообщение
      if (data.type === 'send') {
        this.ui.renderMessage(data);
      }
    });

    window.addEventListener('beforeunload', () => this.sendExit());
  }

  sendMessage(text) {
    if (!this.userManager.currentUser) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const payload = {
      type: 'send',
      message: text,
      user: this.userManager.currentUser,
      time,
    };

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }

  sendExit() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN && this.userManager.currentUser) {
      const payload = { type: 'exit', user: this.userManager.currentUser };
      this.ws.send(JSON.stringify(payload));
    }
  }
}
