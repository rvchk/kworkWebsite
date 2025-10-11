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
      day: './assets/images/backgrounds/day.png',
      night: './assets/images/backgrounds/night.png',
      grayBack: './assets/images/backgrounds/gray-back.svg',
      sunHalf: './assets/images/content/sun-half.png',
      moonHalf: './assets/images/content/moon-half.png',
      grayHalf: './assets/images/content/gray-half.png'
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new DayNightSwitcher();
});

// Анимация звезд при скролле
document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star-item');
  const lines = document.querySelectorAll('.line');
  const advantagesSection = document.querySelector('.advantages');
  
  // Порядок зажигания звезд
  const starOrder = [
    '.star-1',
    '.star-2', 
    '.star-3',
    '.star-4',
    '.star-5',
    '.star-6',
    '.star-7'
  ];
  
  // Порядок появления линий
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
  
  // Функция для зажигания звезды
  function lightUpStar(starSelector) {
    const star = document.querySelector(starSelector);
    if (star && !star.classList.contains('lit')) {
      const starIcon = star.querySelector('.star-icon');
      
      // Меняем иконку на желтую звезду
      starIcon.src = 'assets/images/icons/yellow-star.png';
      star.classList.add('lit');
      
      // Анимация появления текста
      setTimeout(() => {
        const starText = star.querySelector('.star-text');
        starText.style.opacity = '1';
        starText.style.transform = 'translateY(0)';
      }, 200);
    }
  }
  
  // Функция для показа линии
  function showLine(lineSelector) {
    const line = document.querySelector(lineSelector);
    if (line && !line.classList.contains('visible')) {
      line.classList.add('visible');
    }
  }
  
  // Функция для сброса анимации
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
  
  // Функция для запуска анимации
  // Функция для запуска анимации
  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Обновляем линии перед анимацией
    updateConstellationLines();

    // Зажигаем звезды по порядку
    starOrder.forEach((starSelector, index) => {
      setTimeout(() => {
        lightUpStar(starSelector);
        
        // Показываем линию сразу после зажигания текущей звезды (если есть следующая)
        if (index < starOrder.length) { // если не последняя звезда
          const lineIndex = index; // line-1 после star-1, line-2 после star-2 и т.д.
          const lineSelector = `.line-${lineIndex + 1}`;
          showLine(lineSelector);
        }
      }, index * 800); // Задержка между звездами
    });
    
    // Сбрасываем флаг анимации через некоторое время
    setTimeout(() => {
      isAnimating = false;
    }, starOrder.length * 800 + 1000);
  }
  
  // Intersection Observer для отслеживания видимости секции
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Секция видна, запускаем анимацию
        setTimeout(() => {
          startAnimation();
        }, 300);
      } else {
        // Секция не видна, сбрасываем анимацию
        resetAnimation();
      }
    });
  }, {
    threshold: 0.3 // Секция должна быть видна на 30%
  });
  
  // Наблюдаем за секцией преимуществ
  if (advantagesSection) {
    observer.observe(advantagesSection);
  }
  
  // Дополнительная анимация при клике на звезду
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
  document.body.style.overflow = 'hidden'; // отключить прокрутку
  document.getElementById('feedbackModal').style.display = 'flex';
  document.getElementById('feedbackForm').style.display = 'block';
  document.getElementById('successScreen').style.display = 'none';
  const header = document.querySelector('.modal-header');
  if (header) {
    header.style.display = '';
  }
  resetForm();
}

function closeModal() {
  document.body.style.overflow = ''; // включить прокрутку
  document.getElementById('feedbackModal').style.display = 'none';
}

function resetForm() {
  document.getElementById('feedbackForm').reset();
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  recaptchaVerified = false;
  document.getElementById('submitBtn').disabled = true;

  // Показываем заголовок снова
}

// function onRecaptchaSuccess(response) {
//   recaptchaVerified = true;
//   checkFormValidity();
// }

function validateField(fieldId, errorId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  const group = input.closest('.form-group');

  if (fieldId === 'phone') {
    // Проверяем, что введено 11 цифр (без +7)
    const cleanValue = input.value.replace(/\D/g, '');
    const isValid = cleanValue.length === 11 && cleanValue.startsWith('7');
    if (!isValid) {
      group.classList.add('error');
      error.style.display = 'block';
      return false;
    } else {
      group.classList.remove('error');
      error.style.display = 'none';
      return true;
    }
  } else {
    const value = input.value.trim();
    if (!value) {
      group.classList.add('error');
      error.style.display = 'block';
      return false;
    } else {
      group.classList.remove('error');
      error.style.display = 'none';
      return true;
    }
  }
}

document.getElementById('phone').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.startsWith('8')) value = '7' + value.slice(1);
  if (value.startsWith('7')) value = value.slice(1);
  if (value.length > 10) value = value.slice(0, 10);

  let formatted = '+7 (';
  if (value.length > 0) formatted += value.substring(0, 4);
  if (value.length >= 5) formatted += ') ' + value.substring(4, 6);
  if (value.length >= 7) formatted += '-' + value.substring(6, 8);
  if (value.length >= 9) formatted += '-' + value.substring(8, 10);

  e.target.value = formatted;
  checkFormValidity();
});

function checkFormValidity() {
  const nameValid = validateField('name', 'nameError');
  const phoneValid = validateField('phone', 'phoneError');

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = !(nameValid && phoneValid);
}

document.getElementById('feedbackForm').addEventListener('input', checkFormValidity);

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Убираем проверку ReCaptcha, если она не используется
  // if (!recaptchaVerified) {
  //   alert('Пожалуйста, подтвердите, что вы не робот.');
  //   return;
  // }

  // Проверим, что все поля заполнены корректно
  const nameValid = validateField('name', 'nameError');
  const phoneValid = validateField('phone', 'phoneError');

  if (!nameValid || !phoneValid) {
    return;
  }

  document.getElementById('feedbackForm').style.display = 'none';
  document.getElementById('successScreen').style.display = 'flex';

  // Скрываем заголовок
  const header = document.querySelector('.modal-header');
  if (header) {
    header.style.display = 'none';
  }
  // Очищаем форму и сбрасываем состояние
  resetForm();
});

// Закрытие модалки по клику вне окна
document.getElementById('feedbackModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
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
        slide.classList.add('active');
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('prev');
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.add('next');
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