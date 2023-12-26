// Создать сообщение об успешной отправке
const createSuccessMessage = (text, icon, edit) => {
  text.textContent = edit ? 'Товар успешно изменен' : 'Товар успешно добавлен';
  icon.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
    </svg>
  `);
  icon.style.color = 'var(--purple-text, #6e6893)';
  icon.style.borderColor = 'var(--purple-text, #6e6893)';
};

// Создать сообщение об ошибке
const createErrorMessage = (text, icon, status) => {
  text.textContent = `Ошибка ${status}`;
  icon.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
    </svg>
  `);
  icon.style.color = 'var(--alert-red, #d80101)';
  icon.style.borderColor = 'var(--alert-red, #d80101)';
};

// Создать сообщение "Что-то пошло не так"
const createWrongMessage = (text, icon) => {
  text.textContent = 'Что-то пошло не так';
  icon.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `);
  icon.style.color = 'var(--alert-red, #d80101)';
  icon.style.borderColor = 'var(--alert-red, #d80101)';
};

// Выбрать тип сообщения
const setMessageType = (text, icon, status, edit) => {
  switch (true) {
    case status >= 500:
      return createWrongMessage(text, icon);
    case status >= 400:
      return createErrorMessage(text, icon, status);
    default:
      return createSuccessMessage(text, icon, edit);
  }
};

// Управление окном сообщения
const messageModalControl = (overlay, closeBtn, closeFunc) => {
  overlay.addEventListener('click', ({target}) => {
    if (target === overlay) closeFunc();
  });

  closeBtn.addEventListener('click', () => closeFunc());
};

// Отобразить сообщение
const showFormMessage = (edit, overlay, status, closeFunc) => {
  const messageOverlay = document.createElement('div');
  messageOverlay.classList.add('message-overlay', 'message-overlay_visible');

  const formMessage = document.createElement('div');
  formMessage.classList.add('form-message', 'form-message_active');

  const formMessageClose = document.createElement('button');
  formMessageClose.type = 'button';
  formMessageClose.classList.add('form-message__close');
  formMessageClose.insertAdjacentHTML('beforeend', `
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
      <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `);

  const formMessageIcon = document.createElement('div');
  formMessageIcon.classList.add('form-message__icon');

  const formMessageText = document.createElement('p');
  formMessageText.classList.add('form-message__text');

  setMessageType(formMessageText, formMessageIcon, status, edit);

  formMessage.append(formMessageClose, formMessageIcon, formMessageText);
  messageOverlay.append(formMessage);

  messageModalControl(messageOverlay, formMessageClose, closeFunc);

  overlay.append(messageOverlay);
};

export default showFormMessage;
