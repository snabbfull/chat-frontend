export default class UserManager {
  constructor(apiUrl, ui) {
    this.apiUrl = apiUrl;
    this.ui = ui;
    this.currentUser = null;
  }

  async register(name) {
    try {
      const res = await fetch(`${this.apiUrl}/new-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (data.status === 'ok') {
        this.currentUser = data.user;
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Никнейм занят' };
    } catch (err) {
      return { success: false, error: 'Ошибка подключения' };
    }
  }
}
