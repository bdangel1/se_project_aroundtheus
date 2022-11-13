export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, userAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._avatarEl = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }
  setUserInfo(name, job, avatar) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
    this._avatarEl.style.background = avatar;
  }
}
