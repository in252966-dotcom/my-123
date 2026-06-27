/* ===== Chat Widget JavaScript ===== */
(function () {
  var panel = document.getElementById('chatPanel');
  var toggle = document.getElementById('chatToggle');
  var closeBtn = document.getElementById('chatClose');
  var body = document.getElementById('chatBody');
  var chipsWrap = document.getElementById('chatChips');
  var input = document.getElementById('chatInput');
  var sendBtn = document.getElementById('chatSend');
  var badge = document.getElementById('chatBadge');
  var opened = false;

  var REPLIES = [
    { 
      keys: ['стои', 'цена', 'цен', 'прайс', 'сколько', 'длител', 'сесси', 'время', 'длится', 'по времени'],
      answer: 'Стоимость консультации — 3 500 ₽ при разовой встрече. При покупке абонемента на 5 сессий — 3 000 ₽ за сессию. Длительность встречи — 60 минут. Первая консультация — со скидкой 50%, 1 750 ₽.' 
    },
    { 
      keys: ['перв', 'пробн', 'знаком', 'познаком', 'начать', 'как проход', 'начина', 'что дела', 'расскаж'],
      answer: 'Первая встреча длится 60 минут. Мы познакомимся, обсудим ваш запрос, я задам несколько вопросов для сбора анамнеза. Вы расскажете, что вас привело. В конце я предложу примерный план работы и подходящую методику. Никаких обязательств — вы принимаете решение спокойно.' 
    },
    { 
      keys: ['тревог', 'тревож', 'паник', 'страх', 'фоби', 'боюс', 'волнени', 'стресс'],
      answer: 'Да, работа с тревожными расстройствами — одно из моих основных направлений. Панические атаки, генерализованная тревога, социальные страхи, ОКР — с этим можно и нужно работать. Очень хорошо зарекомендовала себя КПТ, часто в сочетании с телесными практиками. Приходите — помогу.' 
    },
    { 
      keys: ['онлайн', 'очно', 'скайп', 'zoom', 'телемост', 'видео', 'дистанц', 'по интернету', 'удален', 'встреч'],
      answer: 'Я работаю и очно, и онлайн (Zoom / Telegram). Онлайн-консультации ничем не уступают очным по эффективности — исследования это подтверждают. Удобно, если вы в другом городе или цените время на дорогу. Для онлайн-встреч нужно тихое место, наушники и стабильный интернет.' 
    },
    { 
      keys: ['методик', 'метод', 'подход', 'какой метод', 'как вы работа', 'выбир', 'какую терапи', 'интегратив'],
      answer: 'Я работаю интегративно — сочетаю КПТ, гештальт-терапию, элементы психоанализа и арт-терапии в зависимости от запроса. На первой встрече мы определяем, что подходит именно вам. КПТ — при конкретных симптомах (тревога, паника), гештальт — для работы с отношениями и чувствами, арт-терапия — с детьми и при психосоматике.' 
    },
    { 
      keys: ['детск', 'подрост', 'школ', 'ребен', 'сын', 'доч', 'ребён'],
      answer: 'Да, работаю с детьми от 5 лет и подростками. Использую арт-терапию, игровые методы, песочную терапию, КПТ для подростков. Основные запросы: адаптация в школе, буллинг, агрессия, замкнутость, компьютерная зависимость, трудности в общении. Первая встреча — с родителями для сбора запроса.' 
    },
    { 
      keys: ['депресси', 'депрессия', 'плох', 'груст', 'тоск', 'апати', 'безразлич', 'ничего не хоч', 'усталос', 'выгора', 'выгорел'],
      answer: 'Депрессия и выгорание — моя частая специализация. Мы не просто «поговорим» — я даю конкретные техники для выхода из этого состояния. Важно понимать: депрессия не лечится силой воли, это заболевание, которое требует квалифицированной помощи. При тяжёлых состояниях рекомендую параллельно обратиться к психиатру.' 
    },
    { 
      keys: ['самооценк', 'неуверен', 'комплекс', 'самозване', 'перфекци', 'себя', 'люб', 'принима'],
      answer: 'Работа с самооценкой — одна из самых благодарных тем. Мы исследуем, откуда взялась неуверенность, какие установки мешают, и постепенно строим здоровое отношение к себе. Это не быстрый процесс, но результат ощущается уже через несколько встреч — вы начинаете иначе чувствовать себя в жизни.' 
    },
    { 
      keys: ['запис', 'записаться', 'запиш', 'хочу запис', 'можно запис', 'приё', 'на когда', 'свободн', 'запись', 'хочу'],
      answer: 'Записаться можно прямо здесь — заполните форму «Начните менять жизнь» внизу страницы, я свяжусь в теч��ние нескольких часов. Или напишите в Telegram @S89001420392 — так быстрее. Первая консультация — со скидкой 50%.' 
    },
    { 
      keys: ['отзыв', 'рейтинг', 'хорош', 'качеств', 'компетент', 'опыт', 'образован', 'работал'],
      answer: 'Отзывы клиентов вы можете почитать прямо здесь, в разделе «Отзывы» выше. Я регулярно прохожу супервизию и повышаю квалификацию. Каждый случай для меня уникален — я не работаю по шаблону, а ищу индивидуальный подход. Приходите на первую встречу — и составьте собственное впечатление.' 
    }
  ];

  var FALLBACK = 'Спасибо за вопрос! Чтобы я мог точнее ответить, расскажите немного подробнее — что вас беспокоит? Или напишите в Telegram @S89001420392 — там я отвечаю быстрее.';

  function addMsg(text, who) {
    var el = document.createElement('div');
    el.className = 'chat-msg ' + who;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function addTyping() {
    var t = document.createElement('div');
    t.className = 'chat-typing';
    t.id = 'typingIndicator';
    t.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(t);
    body.scrollTop = body.scrollHeight;
  }

  function removeTyping() {
    var t = document.getElementById('typingIndicator');
    if (t) t.remove();
  }

  function botReply(text) {
    addTyping();
    var delay = 700 + Math.random() * 700;
    setTimeout(function () {
      removeTyping();
      var lower = text.toLowerCase();
      var hit = null;
      for (var i = 0; i < REPLIES.length; i++) {
        var k = REPLIES[i].keys;
        for (var j = 0; j < k.length; j++) {
          if (lower.indexOf(k[j]) !== -1) { 
            hit = REPLIES[i].answer; 
            break; 
          }
        }
        if (hit) break;
      }
      addMsg(hit || FALLBACK, 'bot');
    }, delay);
  }

  function sendUser(text) {
    if (!text.trim()) return;
    addMsg(text.trim(), 'user');
    botReply(text);
  }

  function openPanel() {
    panel.classList.add('open');
    opened = true;
    if (badge) badge.style.display = 'none';
    if (body.children.length === 0) {
      addMsg('Здравствуйте! Я психолог. Расскажу о направлениях работы, методиках и помогу записаться на консультацию. Что вас привело? Задавайте любой вопрос 👋', 'bot');
    }
    setTimeout(function() { 
      input.focus(); 
    }, 100);
  }

  function closePanel() { 
    panel.classList.remove('open'); 
    opened = false;
  }

  toggle.addEventListener('click', function() { 
    opened ? closePanel() : openPanel(); 
  });

  closeBtn.addEventListener('click', closePanel);

  sendBtn.addEventListener('click', function() { 
    sendUser(input.value); 
    input.value = ''; 
  });

  input.addEventListener('keydown', function(e) { 
    if (e.key === 'Enter') { 
      e.preventDefault(); 
      sendUser(input.value); 
      input.value = ''; 
    } 
  });

  chipsWrap.addEventListener('click', function(e) {
    var chip = e.target.closest('.chat-chip');
    if (!chip) return;
    var q = chip.getAttribute('data-q');
    sendUser(q);
    chip.style.display = 'none';
  });
})();