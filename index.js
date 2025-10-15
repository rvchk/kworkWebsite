document.addEventListener("DOMContentLoaded", function () {
  const timerElements = document.querySelectorAll('.countdown-timer');
  const initialTime = "04:05:05"; // HH:MM:SS

  // Функция для преобразования строки HH:MM:SS в общее количество секунд
  function parseTime(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  // Форматирование в HH:MM:SS
  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0')
    ].join(':');
  }

  // Инициализируем таймер
  let timeLeft = parseTime(initialTime);

  function updateTimer() {
    if (timeLeft <= 0) {
      timerElements.forEach(el => el.textContent = "00:00:00");
      clearInterval(timerInterval);
      return;
    }

    const formattedTime = formatTime(timeLeft);
    timerElements.forEach(el => el.textContent = formattedTime);
    timeLeft--;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
});

class DayNightSwitcher {
  constructor() {
    this.switch = document.querySelector('.switch');
    this.daySide = document.querySelector('.day-side');
    this.nightSide = document.querySelector('.night-side');
    this.sunHalf = document.querySelector('.sun-half');
    this.moonHalf = document.querySelector('.moon-half');
    this.dayText = document.querySelector('.day-text');
    this.nightText = document.querySelector('.night-text');
    
    this.images = {
      day: 'assets/images/backgrounds/day.webp',
      night: 'assets/images/backgrounds/night.webp',
      grayBack: 'assets/images/backgrounds/gray-back.svg',
      sunHalf: 'assets/images/content/sun-half.webp',
      moonHalf: 'assets/images/content/moon-half.webp',
      grayHalf: 'assets/images/content/gray-half.webp'
    };
    
    this.init();
  }
  
  init() {
    // Устанавливаем начальное состояние (дневной режим, т.к. switch имеет класс 'on')
    this.setDayMode();
    
    // Добавляем обработчик события
    this.switch.addEventListener('click', () => {
      this.toggleMode();
    });
    
    // Предзагружаем изображения
    this.preloadImages();
  }
  
  preloadImages() {
    Object.values(this.images).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  toggleMode() {
    this.switch.classList.toggle('on');
    
    if (this.switch.classList.contains('on')) {
      this.setDayMode();
    } else {
      this.setNightMode();
    }
  }
  
  setDayMode() {
    // Фоны
    this.daySide.style.backgroundImage = `url('${this.images.day}')`;
    
    this.nightSide.style.backgroundImage = `url('')`;
    
    // Солнце и луна
    this.sunHalf.style.backgroundImage = `url('${this.images.sunHalf}')`;
    this.moonHalf.style.backgroundImage = `url('${this.images.grayHalf}')`;
    
    // Текст
    this.dayText.style.opacity = '1';
    this.dayText.style.color = '#E8EAED';
    
    this.nightText.style.opacity = '0.5';
    this.nightText.style.color = '#888';
  }
  
  setNightMode() {
    // Фоны
    this.daySide.style.backgroundImage = `url('${this.images.grayBack}')`;
    this.daySide.style.filter = 'blur(8px)';
    
    this.nightSide.style.backgroundImage = `url('${this.images.night}')`;
    this.nightSide.style.filter = 'blur(0)';
    
    // Солнце и луна
    this.sunHalf.style.backgroundImage = `url('')`;
    this.moonHalf.style.backgroundImage = `url('${this.images.moonHalf}')`;
    
    // Текст
    this.dayText.style.opacity = '0.5';
    this.dayText.style.color = '#888';
    
    this.nightText.style.opacity = '1';
    this.nightText.style.color = '#E8EAED';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DayNightSwitcher();
});

document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star-item');
  const lines = document.querySelectorAll('.line');
  const advantagesSection = document.querySelector('.advantages');
  
  const starOrder = [
    '.star-1',
    '.star-2', 
    '.star-3',
    '.star-4',
    '.star-5',
    '.star-6',
    '.star-7'
  ];
  
  const lineOrder = [
    '.line-1',
    '.line-2',
    '.line-3', 
    '.line-4',
    '.line-5',
    '.line-6',
    '.line-7'  
  ];
  
  let currentStarIndex = 0;
  let currentLineIndex = 0;
  let isAnimating = false;
  
  function lightUpStar(starSelector) {
    const star = document.querySelector(starSelector);
    if (star && !star.classList.contains('lit')) {
      const starIcon = star.querySelector('.star-icon');
      
      starIcon.src = 'assets/images/icons/yellow-star.webp';
      star.classList.add('lit');
      
      setTimeout(() => {
        const starText = star.querySelector('.star-text');
        starText.style.opacity = '1';
        starText.style.transform = 'translateY(0)';
      }, 200);
    }
  }
  
  function showLine(lineSelector) {
    const line = document.querySelector(lineSelector);
    if (line && !line.classList.contains('visible')) {
      line.classList.add('visible');
    }
  }
  
  function resetAnimation() {
    stars.forEach(star => {
      star.classList.remove('lit');
      const starIcon = star.querySelector('.star-icon');
      starIcon.src = 'assets/images/icons/star.svg';
      const starText = star.querySelector('.star-text');
      starText.style.opacity = '0';
      starText.style.transform = 'translateY(10px)';
    });
    
    lines.forEach(line => {
      line.classList.remove('visible');
    });
    
    currentStarIndex = 0;
    currentLineIndex = 0;
    isAnimating = false;
  }
  
  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    updateConstellationLines();

    starOrder.forEach((starSelector, index) => {
      setTimeout(() => {
        lightUpStar(starSelector);
        
        if (index < starOrder.length) {
          const lineIndex = index;
          const lineSelector = `.line-${lineIndex + 1}`;
          showLine(lineSelector);
        }
      }, index * 800);
    });
    
    setTimeout(() => {
      isAnimating = false;
    }, starOrder.length * 800 + 1000);
  }
  
  // Intersection Observer для отслеживания видимости секции
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          startAnimation();
        }, 300);
      } else {
        resetAnimation();
      }
    });
  }, {
    threshold: 0.2
  });
  
  if (advantagesSection) {
    observer.observe(advantagesSection);
  }
  
  stars.forEach(star => {
    star.addEventListener('click', function() {
      if (!this.classList.contains('lit')) {
        lightUpStar('.' + this.classList[1]); // Используем класс star-X
      }
    });
  });

  // Обновляем линии при загрузке
  updateConstellationLines();
});

function updateConstellationLines() {
  const container = document.querySelector('.advantages-constellation');
  const svg = document.querySelector('.constellation-lines');

  if (!container || !svg) return;

  const containerRect = container.getBoundingClientRect();

  // Настраиваем viewBox SVG под размер контейнера
  svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);

  // Сопоставление линий с парами звёзд
  const lineConnections = [
    { from: 'star-1', to: 'star-2' }, // line-1
    { from: 'star-2', to: 'star-3' }, // line-2
    { from: 'star-3', to: 'star-4' }, // line-3
    { from: 'star-4', to: 'star-5' }, // line-4
    { from: 'star-5', to: 'star-6' }, // line-5
    { from: 'star-6', to: 'star-7' }, // line-6
    { from: 'star-7', to: 'star-4' }  // line-7 (закрывает ковш)
  ];

  lineConnections.forEach((conn, index) => {
    const fromStar = document.getElementById(conn.from);
    const toStar = document.getElementById(conn.to);

    if (!fromStar || !toStar) return;

    // Находим иконки звезд внутри элементов
    const fromIcon = fromStar.querySelector('.star-icon');
    const toIcon = toStar.querySelector('.star-icon');

    if (!fromIcon || !toIcon) return;

    const fromRect = fromIcon.getBoundingClientRect();
    const toRect = toIcon.getBoundingClientRect();

    // Центр иконки звезды относительно контейнера
    const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
    const toX = toRect.left + toRect.width / 2 - containerRect.left;
    const toY = toRect.top + toRect.height / 2 - containerRect.top;

    // Устанавливаем реальные пиксельные координаты в SVG
    const line = document.querySelector(`.line-${index + 1}`);
    if (line) {
      line.setAttribute('d', `M ${fromX} ${fromY} L ${toX} ${toY}`);
    }
  });
}

// Обновляем линии при изменении размера окна
window.addEventListener('resize', updateConstellationLines);

// let recaptchaVerified = false;

function openModal() {
  document.body.style.overflow = 'hidden';
  document.getElementById('feedbackModal').style.display = 'flex';
  document.getElementById('feedbackForm').style.display = 'block';
  document.getElementById('successScreen').style.display = 'none';

  resetForm();
}

function closeModal() {
  document.body.style.overflow = '';
  document.getElementById('feedbackModal').style.display = 'none';
}

function resetForm() {
  document.getElementById('feedbackForm').reset();
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  document.getElementById('submitBtn').disabled = true;
}

// Улучшенное форматирование телефона
document.getElementById('phone').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  
  // Обработка разных форматов ввода
  if (value.startsWith('8')) {
    value = '7' + value.slice(1);
  } else if (!value.startsWith('7')) {
    value = '7' + value;
  }
  
  // Ограничиваем длину (11 цифр включая 7)
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  
  // Форматирование
  let formatted = '';
  if (value.length > 0) {
    formatted = '+7 ';
    if (value.length > 1) {
      formatted += '(' + value.slice(1, 4);
    }
    if (value.length >= 4) {
      formatted += ') ' + value.slice(4, 7);
    }
    if (value.length >= 7) {
      formatted += '-' + value.slice(7, 9);
    }
    if (value.length >= 9) {
      formatted += '-' + value.slice(9, 11);
    }
  }
  
  e.target.value = formatted;
  validateField('phone', 'phoneError');
  checkFormValidity();
});

// Улучшенная валидация
function validateField(fieldId, errorId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  const group = input.closest('.form-group');

  if (!input || !error || !group) return false;

  if (fieldId === 'phone') {
    // Проверяем, что введено 11 цифр (включая 7)
    const cleanValue = input.value.replace(/\D/g, '');
    const isValid = cleanValue.length === 11 && cleanValue.startsWith('7');
    
    if (!isValid) {
      group.classList.add('error');
      error.style.display = 'block';
      error.textContent = 'Введите корректный номер телефона';
      return false;
    } else {
      group.classList.remove('error');
      error.style.display = 'none';
      return true;
    }
  } else if (fieldId === 'name') {
    const value = input.value.trim();
    const isValid = value.length >= 2;
    
    if (!isValid) {
      group.classList.add('error');
      error.style.display = 'block';
      error.textContent = 'Имя должно содержать минимум 2 символа';
      return false;
    } else {
      group.classList.remove('error');
      error.style.display = 'none';
      return true;
    }
  }
  
  return false;
}

function checkFormValidity() {
  const nameValid = validateField('name', 'nameError');
  const phoneValid = validateField('phone', 'phoneError');

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = !(nameValid && phoneValid);
  }
}

// Слушатели событий
document.getElementById('name').addEventListener('input', function() {
  validateField('name', 'nameError');
  checkFormValidity();
});

document.getElementById('phone').addEventListener('blur', function() {
  validateField('phone', 'phoneError');
});

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nameValid = validateField('name', 'nameError');
  const phoneValid = validateField('phone', 'phoneError');

  if (!nameValid || !phoneValid) {
    // Показываем ошибки, если они есть
    if (!nameValid) validateField('name', 'nameError');
    if (!phoneValid) validateField('phone', 'phoneError');
    return;
  }

  // Если все валидно, показываем успешный экран
  document.getElementById('feedbackForm').style.display = 'none';
  document.getElementById('successScreen').style.display = 'flex';

  const header = document.querySelector('.modal-title');
  if (header) {
    header.style.fontSize = '0px';
  }
  
  // Не сбрасываем форму сразу, чтобы пользователь видел успех
  // resetForm(); // убрали отсюда
});

// Закрытие модалки по клику вне окна
document.getElementById('feedbackModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Сброс формы при закрытии модалки
document.getElementById('feedbackModal').addEventListener('click', function(e) {
  if (e.target === this) {
    resetForm();
    closeModal();
  }
});

// Бургер-меню
// Бургер-меню
const burgerBtn = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.querySelector('.close-mobile-menu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

burgerBtn.addEventListener('click', function() {
  mobileMenu.classList.add('open');
  mobileMenuOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Отключаем прокрутку
});

closeMobileMenu.addEventListener('click', function() {
  mobileMenu.classList.remove('open');
  mobileMenuOverlay.style.display = 'none';
  document.body.style.overflow = ''; // Включаем прокрутку
});

mobileMenuOverlay.addEventListener('click', function() {
  mobileMenu.classList.remove('open');
  mobileMenuOverlay.style.display = 'none';
  document.body.style.overflow = ''; // Разрешаем прокрутку
});

// Закрытие по клику вне меню или на оверлей
document.addEventListener('click', function(e) {
  if (
    !mobileMenu.contains(e.target) &&
    e.target !== burgerBtn &&
    e.target !== mobileMenuOverlay
  ) {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = ''; // Включаем прокрутку
  }
});

// Также закрываем при клике по ссылкам внутри меню
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = ''; // Включаем прокрутку
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 1; // начальный активный слайд (индекс 1)

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev', 'next');

      if (index === currentIndex) {
        slide.classList.remove('hidden');
        slide.classList.add('active');
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.remove('hidden');
        slide.classList.add('prev');
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.remove('hidden');
        
        slide.classList.add('next');
      } else {
        slide.classList.add('hidden');
      }
    });
  }

  // Инвертируем кнопки: prev — вперёд, next — назад
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  });

  // Инициализация
  updateSlides();
});

function initPrincipleAnimation() {
  const principleSection = document.querySelector('.principle');
  const principleVisual = document.querySelector('.principle-visual');
  
  if (!principleSection || !principleVisual) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          principleVisual.classList.add('visible');
        }, 300);
      } else {
        principleVisual.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  
  observer.observe(principleSection);
}

// Вызываем при загрузке
document.addEventListener('DOMContentLoaded', function() {
  initPrincipleAnimation();
});

function initSimpleMobileAnimation() {
  if (window.innerWidth > 560) return;
  
  const elements = document.querySelectorAll('.principle-content .visual-item, .principle-content .principle-text');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                  answer.style.display = 'none';
                    otherItem.classList.remove('open-question');
                }
            });
            
            const isOpening = !item.classList.contains('open-question');
            item.classList.toggle('open-question');
            
            if (isOpening && answer) {
                answer.style.display = 'block';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  
  // === Форма в модальном окне ===
  const modalForm = document.getElementById('feedbackForm');
  const modalNameInput = document.getElementById('name');
  const modalPhoneInput = document.getElementById('phone');
  const modalSubmitBtn = document.getElementById('submitBtn');
  const modalNameError = document.getElementById('nameError');
  const modalPhoneError = document.getElementById('phoneError');

  // === Форма в контактах ===
  const contactForm = document.getElementById('contactForm'); // Добавляем форму
  const contactNameInput = document.getElementById('contact-name');
  const contactPhoneInput = document.getElementById('contact-phone');
  const contactMailInput = document.getElementById('contact-mail');
  const contactMessageInput = document.getElementById('contact-message');
  const contactSubmitBtn = document.querySelector('#contactSubmitBtn'); // Исправляем селектор
  const contactNameError = document.getElementById('contact-nameError');
  const contactPhoneError = document.getElementById('contact-phoneError');
  const contactMailError = document.getElementById('contact-mailError');
  const contactTextError = document.getElementById('contact-textError');
  const returnBackButton = document.querySelector("#returnBack")
  const successScreen = document.querySelector("#contactSuccessScreen")
  successScreen.style.display = 'none';

  // === Инициализация состояния кнопки контактной формы ===
  if (contactSubmitBtn) {
    contactSubmitBtn.disabled = true;
  }

  contactSubmitBtn.addEventListener("click", function(e) {
      successScreen.style.display = 'block';
      document.querySelector("#forms").style.display = "none"
      contactMailInput.value = ""
      contactNameInput.value = ""
      contactPhoneInput.value = ""
      contactMessageInput.value = ""
      validateContactForm()
    })

  returnBackButton.addEventListener("click", function(e) {
      successScreen.style.display = 'none';
      document.querySelector("#forms").style.display = "block"
  })

  // === Форматирование и валидация для модальной формы ===
  if (modalForm) {
    modalPhoneInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      if (value.startsWith('8')) value = '7' + value.slice(1);
      if (!value.startsWith('7')) value = '7' + value;
      value = value.substring(0, 11);

      let formatted = '+';
      if (value) formatted += value.charAt(0);
      if (value.length > 1) formatted += ' ' + value.substring(1, 4);
      if (value.length > 4) formatted += ' ' + value.substring(4, 7);
      if (value.length > 7) formatted += ' ' + value.substring(7, 9);
      if (value.length > 9) formatted += ' ' + value.substring(9, 11);

      this.value = formatted;
      validateModalForm();
    });

    modalNameInput.addEventListener('input', validateModalForm);

    function validateModalForm() {
      const nameValue = modalNameInput.value.trim();
      const phoneValue = modalPhoneInput.value.replace(/\D/g, '');

      let isValid = true;

      if (nameValue === '') {
        showError(modalNameInput, modalNameError);
        isValid = false;
      } else {
        hideError(modalNameInput, modalNameError);
      }

      if (phoneValue.length !== 11) {
        showError(modalPhoneInput, modalPhoneError);
        isValid = false;
      } else {
        hideError(modalPhoneInput, modalPhoneError);
      }

      modalSubmitBtn.disabled = !isValid;
    }

    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.querySelector('.successScreen').style.display = 'block';
      document.querySelector('.modal-header').style.height = "0px";
    });
  }

  // === Форматирование и валидация для формы в контактах ===
  if (contactPhoneInput) {
    contactPhoneInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      if (value.startsWith('8')) value = '7' + value.slice(1);
      if (!value.startsWith('7')) value = '7' + value;
      value = value.substring(0, 11);

      let formatted = '+';
      if (value) formatted += value.charAt(0);
      if (value.length > 1) formatted += ' ' + value.substring(1, 4);
      if (value.length > 4) formatted += ' ' + value.substring(4, 7);
      if (value.length > 7) formatted += ' ' + value.substring(7, 9);
      if (value.length > 9) formatted += ' ' + value.substring(9, 11);

      this.value = formatted;
      validateContactForm();
    });
  }

  // Добавляем обработчики событий для всех полей контактной формы
  if (contactNameInput) contactNameInput.addEventListener('input', validateContactForm);
  if (contactPhoneInput) contactPhoneInput.addEventListener('input', validateContactForm);
  if (contactMailInput) contactMailInput.addEventListener('input', validateContactForm);
  if (contactMessageInput) contactMessageInput.addEventListener('input', validateContactForm);

  // Добавляем обработчик отправки для контактной формы
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Проверяем валидность перед отправкой
      if (validateContactForm()) {
        // Здесь код для отправки формы
        console.log('Контактная форма отправлена');
        // Можно добавить показ успешного сообщения или редирект
      }
    });
  }

  function validateContactForm() {
    const nameValue = contactNameInput?.value.trim() || '';
    const phoneValue = contactPhoneInput?.value.replace(/\D/g, '') || '';
    const mailValue = contactMailInput?.value.trim() || '';
    const messageValue = contactMessageInput?.value.trim() || '';

    let isValid = true;

    // Валидация имени
    if (nameValue === '') {
      showError(contactNameInput, contactNameError);
      isValid = false;
    } else {
      hideError(contactNameInput, contactNameError);
    }

    // Валидация телефона
    if (phoneValue.length !== 11) {
      showError(contactPhoneInput, contactPhoneError);
      isValid = false;
    } else {
      hideError(contactPhoneInput, contactPhoneError);
    }

    // Валидация email
    if (mailValue === '') {
      showError(contactMailInput, contactMailError);
      isValid = false;
    } else if (!isValidEmail(mailValue)) {
      showError(contactMailInput, contactMailError);
      contactMailError.textContent = 'Введите корректный email адрес';
      isValid = false;
    } else {
      hideError(contactMailInput, contactMailError);
    }

    // Валидация сообщения
    if (messageValue === '') {
      showError(contactMessageInput, contactTextError);
      isValid = false;
    } else {
      hideError(contactMessageInput, contactTextError);
    }

    // Обновляем состояние кнопки
    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = !isValid;
    }

    return isValid;
  }

  // Функция для проверки email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // === Общие функции ===
  function showError(input, errorElement) {
    if (input) input.classList.add('error');
    if (errorElement) errorElement.style.display = 'block';
  }

  function hideError(input, errorElement) {
    if (input) input.classList.remove('error');
    if (errorElement) errorElement.style.display = 'none';
  }

  // Инициализируем валидацию при загрузке
  validateContactForm();
});

// Добавьте эту функцию в конец вашего JS файла
function sendContactsForm() {
  const contactForm = document.getElementById('contactForm');
  const contactNameInput = document.getElementById('contact-name');
  const contactPhoneInput = document.getElementById('contact-phone');
  const contactMailInput = document.getElementById('contact-mail');
  const contactMessageInput = document.getElementById('contact-message');

  if (!contactForm || !validateContactForm()) {
    return false;
  }

  // Здесь код для отправки данных формы
  const formData = {
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    email: contactMailInput.value,
    message: contactMessageInput.value
  };

  console.log('Данные формы для отправки:', formData);
  
  // Пример отправки с помощью fetch
  /*
  fetch('/send-contact-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Успех:', data);
    // Показать сообщение об успехе
    showSuccessMessage();
  })
  .catch((error) => {
    console.error('Ошибка:', error);
    // Показать сообщение об ошибке
  });
  */

  // Временно просто показываем успех
  showSuccessMessage();
  return false; // Предотвращаем стандартную отправку формы
}

function showSuccessMessage() {
  // Создаем или находим элемент для сообщения об успехе
  let successMessage = document.querySelector('.contact-success-message');
  
  if (!successMessage) {
    successMessage = document.createElement('div');
    successMessage.className = 'contact-success-message';
    successMessage.style.cssText = `
      background: #4CAF50;
      color: white;
      padding: 15px;
      margin: 15px 0;
      border-radius: 5px;
      text-align: center;
    `;
    successMessage.textContent = 'Сообщение успешно отправлено!';
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.parentNode.insertBefore(successMessage, contactForm);
    }
  }
  
  successMessage.style.display = 'block';
  
  // Скрываем сообщение через 5 секунд
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
  
  // Очищаем форму
  document.getElementById('contactForm').reset();
  validateContactForm(); // Обновляем состояние кнопки
}

document.addEventListener('DOMContentLoaded', function() {
  
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      document.querySelector('.successScreen').style.display = 'flex';
    });
  }

});