/* Prince Paw — User chat widget with AI assistant
   Human admin messages take priority; AI fills in when admin is away.
   Reads/writes pp:chat in localStorage.
*/
(function () {
  const CHAT_KEY = 'pp:chat';

  const loadChat = () => { try { return JSON.parse(localStorage.getItem(CHAT_KEY) || '[]'); } catch { return []; } };
  const saveChat = (msgs) => localStorage.setItem(CHAT_KEY, JSON.stringify(msgs));
  const unreadFromAdmin = () => loadChat().filter(m => m.from === 'admin' && !m.readByUser).length;

  const updateChatBadge = () => {
    const n = unreadFromAdmin();
    document.querySelectorAll('.pp-chat-notif').forEach(el => {
      el.textContent = n > 9 ? '9+' : n;
      el.style.display = n ? 'flex' : 'none';
    });
  };

  const formatTime = (iso) => {
    try { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch { return ''; }
  };

  const escHtml = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  /* ── AI RESPONSE ENGINE ── */
  const AI_RULES = [
    {
      match: /shipping|deliver|how long|postage|送货|运费|包邮/i,
      en: "We offer free shipping on orders over MYR 60 within Malaysia! Standard delivery takes 3–6 business days. Express options may be available at checkout. 📦",
      cn: "订单满 MYR 60 即可享受马来西亚境内免运费！标准配送约 3–6 个工作日，结账时可选快递。📦"
    },
    {
      match: /return|refund|exchange|guarantee|退|换|保证/i,
      en: "We have a 60-day Happy Skin Guarantee! If your pet's coat doesn't improve, we'll give you a full refund — no questions asked. 🐾",
      cn: "我们提供 60 天「肤感无忧」保证！如果您的宠物毛发没有改善，我们将全额退款，无需任何理由。🐾"
    },
    {
      match: /ingredient|formula|safe|chemical|vet|成分|配方|安全|兽医/i,
      en: "All Prince Paw formulas are vet-reviewed, free from parabens, sulfates, and artificial fragrances. Made in small batches in Shanghai & Brooklyn. 🧪",
      cn: "所有御宠护肤产品均经过兽医审核，不含对羟基苯甲酸酯、硫酸盐和人工香精，在上海和布鲁克林小批量精造。🧪"
    },
    {
      match: /dog|puppy|canine|犬|狗|幼犬/i,
      en: "We have a wonderful range made just for dogs! Our Oat & Aloe Shampoo and Paw Balm are bestsellers for pups. Visit our Shop to explore 🐕",
      cn: "我们有专为狗狗打造的系列产品！燕麦芦荟洗毛液和爪垫护理膏是热卖款。欢迎逛逛商城 🐕"
    },
    {
      match: /cat|kitten|feline|猫|猫咪|幼猫/i,
      en: "Our cat-specific range is ultra-gentle, pH-balanced for feline skin. The Chamomile Coat Mist is a fan favourite! 🐈",
      cn: "我们的猫咪专属系列超温和，pH 值专为猫咪皮肤调配。洋甘菊毛发喷雾是粉丝最爱！🐈"
    },
    {
      match: /itch|scratch|dry|flaky|skin|coat|rash|irritat|瘙痒|抓|干燥|皮肤|毛发|皮疹/i,
      en: "Itchy or dry skin is usually a sign of moisture imbalance. Our Oat & Aloe Shampoo soothes irritation, and the Omega Coat Oil helps restore hydration from within. I'd also recommend trying our free Skin Quiz for a personalised routine! ✨",
      cn: "皮肤瘙痒或干燥通常是水分失衡的信号。我们的燕麦芦荟洗毛液可舒缓刺激，欧米伽毛发精油有助于从内部恢复水分。也建议您试试我们的免费护肤测试，获取个性化方案！✨"
    },
    {
      match: /quiz|routine|recommend|suggest|测试|推荐|建议/i,
      en: "Take our free 5-step Skin Quiz and we'll recommend the perfect routine for your pet! It only takes 2 minutes 😊 → quiz.html",
      cn: "试试我们免费的 5 步护肤测试，我们将为您的宠物推荐最适合的护肤方案！只需 2 分钟 😊 → quiz.html"
    },
    {
      match: /price|cost|discount|voucher|promo|code|价格|折扣|优惠|券/i,
      en: "First-time shoppers can use code WELCOME10 for 10% off! We also run seasonal promos — follow us on Instagram & 小红书 to stay updated 🎉",
      cn: "首次购物可使用优惠码 WELCOME10 享 9 折优惠！我们也会不定期推出季节性活动，关注我们的 Instagram 和小红书及时获取资讯 🎉"
    },
    {
      match: /order|track|parcel|status|where.*my|订单|快递|包裹|物流/i,
      en: "You can track your order anytime on the Orders page 📦 → orders.html. You'll also receive updates as your parcel moves. If there's an issue, tap 'Send Message' and a human agent will follow up!",
      cn: "您可以随时在订单页面追踪包裹 📦 → orders.html。包裹移动时您也会收到更新。如有问题，点击「发送消息」，我们的客服会跟进！"
    },
    {
      match: /hello|hi|hey|hola|你好|嗨|您好/i,
      en: "Hi there! 👋 I'm Paw, Prince Paw's AI assistant. I can help with product questions, shipping, skin advice, and more. What can I help you with today?",
      cn: "您好！👋 我是御宠护肤的 AI 助手 Paw。我可以帮助您解答产品问题、配送、护肤建议等。今天有什么可以帮到您？"
    },
    {
      match: /thank|thanks|謝|谢谢|感谢/i,
      en: "You're so welcome! 🐾 Feel free to ask anything else. We're always happy to help your pet look and feel their royal best!",
      cn: "不客气！🐾 有任何问题随时问我。希望您的宠物能享受到最好的护理！"
    },
    {
      match: /human|agent|person|real|staff|人工|客服|真人/i,
      en: "Of course! I'll flag your conversation for our team. A human agent will reply as soon as possible — usually within a few hours. You can also leave a message using the form below 🙌",
      cn: "当然！我会将您的对话标记给我们的团队。人工客服会尽快回复您，通常在几小时内。您也可以在下方留言 🙌"
    },
  ];

  const FALLBACK = {
    en: "Thanks for your message! 🐾 Our team will get back to you shortly. In the meantime, feel free to explore our Skin Quiz for personalised product recommendations!",
    cn: "感谢您的留言！🐾 我们的团队会尽快回复您。在此期间，欢迎试试护肤测试，获取个性化产品推荐！"
  };

  const QUICK_REPLIES = [
    { en: "Shipping info",    cn: "配送信息",   q: "What are your shipping options?" },
    { en: "Return policy",    cn: "退货政策",   q: "What is your return policy?" },
    { en: "For my dog 🐕",   cn: "狗狗产品",   q: "What products do you have for dogs?" },
    { en: "For my cat 🐈",   cn: "猫咪产品",   q: "What products do you have for cats?" },
    { en: "Skin Quiz",        cn: "护肤测试",   q: "Tell me about the Skin Quiz" },
    { en: "Track my order",   cn: "追踪订单",   q: "How do I track my order?" },
  ];

  function getAIReply(text) {
    const lang = localStorage.getItem('pp:lang') || 'en';
    for (const rule of AI_RULES) {
      if (rule.match.test(text)) return lang === 'cn' ? rule.cn : rule.en;
    }
    return lang === 'cn' ? FALLBACK.cn : FALLBACK.en;
  }

  /* ── RENDER ── */
  const renderMessages = (body) => {
    const msgs = loadChat();
    const lang = localStorage.getItem('pp:lang') || 'en';

    if (!msgs.length) {
      body.innerHTML = `
        <div style="text-align:center;padding:28px 16px 12px;color:var(--fg-3,#888);">
          <div style="font-size:2rem;margin-bottom:6px;">🐾</div>
          <div style="font-size:.83rem;line-height:1.5;">
            ${lang === 'cn'
              ? '您好！我是 Paw，您的 AI 护肤助手。<br>有关产品、配送或护肤建议，随时问我！'
              : 'Hi! I\'m Paw, your AI skincare assistant.<br>Ask me about products, shipping, or skin tips!'}
          </div>
        </div>
        <div class="pp-chat-chips" id="pp-chat-chips"></div>`;
      renderChips(body.querySelector('#pp-chat-chips'), lang);
      return;
    }

    body.innerHTML = msgs.map(m => {
      const isAdmin = m.from === 'admin' || m.from === 'ai';
      const who = m.from === 'ai' ? (lang==='cn'?'Paw AI 助手':'Paw AI') : 'Prince Paw Support';
      return `
        <div class="pp-chat-msg ${isAdmin ? 'pp-chat-msg--admin' : 'pp-chat-msg--user'}">
          ${isAdmin ? `<div class="pp-chat-msg__who">${escHtml(who)}</div>` : ''}
          <div class="pp-chat-msg__bubble">${escHtml(m.text)}</div>
          <div class="pp-chat-msg__time">${formatTime(m.time)}</div>
        </div>`;
    }).join('');

    body.scrollTop = body.scrollHeight;

    // Mark admin messages as read
    let changed = false;
    const updated = msgs.map(m => {
      if ((m.from === 'admin' || m.from === 'ai') && !m.readByUser) { changed = true; return { ...m, readByUser: true }; }
      return m;
    });
    if (changed) saveChat(updated);
    updateChatBadge();
  };

  function renderChips(container, lang) {
    if (!container) return;
    container.innerHTML = QUICK_REPLIES.map(r =>
      `<button class="pp-chat-chip">${lang==='cn' ? r.cn : r.en}</button>`
    ).join('');
    container.querySelectorAll('.pp-chat-chip').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        sendUserMessage(QUICK_REPLIES[i].q, container.closest('#pp-chat-body'));
      });
    });
  }

  function sendUserMessage(text, body) {
    if (!text.trim()) return;
    const msgs = loadChat();
    msgs.push({ from: 'user', text: text.trim(), time: new Date().toISOString(), readByAdmin: false });
    saveChat(msgs);
    if (body) renderMessages(body);

    // Show typing indicator then AI reply
    showTyping(body, () => {
      const reply = getAIReply(text);
      // Only auto-reply if no real admin message came in while typing
      const latest = loadChat();
      const hasNewAdmin = latest.some(m => m.from === 'admin' && !m.readByUser);
      if (!hasNewAdmin) {
        latest.push({ from: 'ai', text: reply, time: new Date().toISOString(), readByUser: true });
        saveChat(latest);
      }
      if (body) renderMessages(body);
    });
  }

  function showTyping(body, cb) {
    if (!body) { setTimeout(cb, 1400); return; }
    const dot = document.createElement('div');
    dot.className = 'pp-chat-msg pp-chat-msg--admin pp-typing-wrap';
    dot.innerHTML = `
      <div class="pp-chat-msg__who">Paw AI</div>
      <div class="pp-chat-msg__bubble pp-typing">
        <span></span><span></span><span></span>
      </div>`;
    body.appendChild(dot);
    body.scrollTop = body.scrollHeight;
    const delay = 1000 + Math.random() * 800;
    setTimeout(() => { dot.remove(); cb(); }, delay);
  }

  /* ── WIDGET INJECTION ── */
  const injectWidget = () => {
    if (document.getElementById('pp-chat-widget')) return;
    const lang = localStorage.getItem('pp:lang') || 'en';

    const el = document.createElement('div');
    el.id = 'pp-chat-widget';
    el.innerHTML = `
      <style>
        #pp-chat-widget * { box-sizing: border-box; }

        .pp-chat-btn {
          position: fixed; bottom: 24px; right: 24px;
          width: 54px; height: 54px; border-radius: 50%;
          background: var(--cocoa-500, #3d2314); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,.28); z-index: 800;
          transition: transform .2s, box-shadow .2s;
        }
        .pp-chat-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(0,0,0,.36); }
        .pp-chat-btn svg  { width: 24px; height: 24px; color: white; }
        .pp-chat-notif {
          position: absolute; top: -3px; right: -3px;
          background: #e53935; color: white; font-size: 10px; font-weight: 700;
          min-width: 18px; height: 18px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white; padding: 0 3px;
        }

        .pp-chat-panel {
          position: fixed; bottom: 88px; right: 24px;
          width: 340px; max-height: 520px; border-radius: 18px;
          background: white; box-shadow: 0 16px 56px rgba(0,0,0,.22);
          z-index: 800; display: flex; flex-direction: column; overflow: hidden;
          opacity: 0; pointer-events: none;
          transform: translateY(20px) scale(.95);
          transition: opacity .24s ease, transform .24s cubic-bezier(.34,1.56,.64,1);
        }
        .pp-chat-panel.is-open { opacity: 1; pointer-events: auto; transform: none; }

        .pp-chat-head {
          background: linear-gradient(135deg, #3d2314 0%, #6b3a22 100%);
          padding: 14px 16px; display: flex; align-items: center; gap: 11px;
        }
        .pp-chat-head__avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,.18); display: flex; align-items: center;
          justify-content: center; font-size: 18px; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,.3);
        }
        .pp-chat-head__name { font-size: .9rem; font-weight: 700; color: white; }
        .pp-chat-head__sub  { font-size: .72rem; color: rgba(255,255,255,.7); margin-top: 1px; display: flex; align-items: center; gap: 5px; }
        .pp-chat-head__dot  { width: 7px; height: 7px; border-radius: 50%; background: #69f0ae; flex-shrink: 0; animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
        .pp-chat-head__close {
          margin-left: auto; background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,.7); padding: 6px; border-radius: 8px; display: flex;
        }
        .pp-chat-head__close:hover { color: white; background: rgba(255,255,255,.12); }
        .pp-chat-head__close svg { width: 16px; height: 16px; }

        #pp-chat-body {
          flex: 1; overflow-y: auto; padding: 14px 12px;
          display: flex; flex-direction: column; gap: 10px;
          background: #f8f5f2; max-height: 340px;
          scroll-behavior: smooth;
        }
        .pp-chat-msg { display: flex; flex-direction: column; max-width: 84%; }
        .pp-chat-msg--admin { align-self: flex-start; }
        .pp-chat-msg--user  { align-self: flex-end; align-items: flex-end; }
        .pp-chat-msg__who { font-size: .65rem; font-weight: 700; color: var(--fg-3,#888); margin-bottom: 3px; }
        .pp-chat-msg__bubble {
          padding: 9px 14px; border-radius: 16px;
          font-size: .83rem; line-height: 1.5; word-break: break-word;
        }
        .pp-chat-msg--admin .pp-chat-msg__bubble {
          background: white; color: #2c1a0e;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,.09);
        }
        .pp-chat-msg--user .pp-chat-msg__bubble {
          background: var(--cocoa-500, #3d2314); color: white;
          border-bottom-right-radius: 4px;
        }
        .pp-chat-msg__time { font-size: .62rem; color: var(--fg-4,#aaa); margin-top: 3px; }

        /* Typing indicator */
        .pp-typing { display: flex; align-items: center; gap: 4px; padding: 11px 16px; }
        .pp-typing span {
          width: 7px; height: 7px; border-radius: 50%; background: #bbb;
          animation: typing-bounce .9s infinite;
        }
        .pp-typing span:nth-child(2) { animation-delay: .18s; }
        .pp-typing span:nth-child(3) { animation-delay: .36s; }
        @keyframes typing-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

        /* Quick reply chips */
        .pp-chat-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 0 4px; }
        .pp-chat-chip {
          padding: 6px 12px; border-radius: 999px;
          border: 1.5px solid #d4b896; background: white;
          font-size: .75rem; font-weight: 700; color: #6b3a22;
          cursor: pointer; transition: all .15s; font-family: inherit;
          white-space: nowrap;
        }
        .pp-chat-chip:hover { background: #6b3a22; color: white; border-color: #6b3a22; }

        .pp-chat-foot {
          border-top: 1px solid #ede7df; padding: 10px 12px;
          display: flex; gap: 8px; background: white;
        }
        .pp-chat-foot input {
          flex: 1; border: 1.5px solid #ddd; border-radius: 999px;
          padding: 8px 15px; font-family: inherit; font-size: .83rem;
          color: #2c1a0e; outline: none; background: #faf8f6;
          transition: border-color .15s;
        }
        .pp-chat-foot input:focus { border-color: var(--cocoa-400, #6b3a22); }
        .pp-chat-foot button {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--cocoa-500, #3d2314); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: opacity .15s, transform .15s;
        }
        .pp-chat-foot button:hover { opacity: .82; transform: scale(1.08); }
        .pp-chat-foot button svg { width: 15px; height: 15px; color: white; }

        .pp-chat-powered {
          text-align: center; font-size: .63rem; color: var(--fg-4,#bbb);
          padding: 5px 0 7px; background: white; letter-spacing: .02em;
        }

        @media (max-width: 400px) {
          .pp-chat-panel { right: 10px; left: 10px; width: auto; }
        }
      </style>

      <button class="pp-chat-btn" id="pp-chat-toggle" aria-label="Chat with us">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span class="pp-chat-notif" style="display:none;"></span>
      </button>

      <div class="pp-chat-panel" id="pp-chat-panel" role="dialog" aria-label="Chat">
        <div class="pp-chat-head">
          <div class="pp-chat-head__avatar">🐾</div>
          <div>
            <div class="pp-chat-head__name">Prince Paw Support</div>
            <div class="pp-chat-head__sub">
              <span class="pp-chat-head__dot"></span>
              <span data-en>AI assistant · Always online</span>
              <span data-cn>AI 助手 · 全天在线</span>
            </div>
          </div>
          <button class="pp-chat-head__close" id="pp-chat-close" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div id="pp-chat-body"></div>
        <div class="pp-chat-foot">
          <input type="text" id="pp-chat-input" placeholder="${lang==='cn'?'输入消息…':'Type a message…'}" autocomplete="off" maxlength="400">
          <button id="pp-chat-send" aria-label="Send">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
        <div class="pp-chat-powered">Powered by Paw AI · Human agents available</div>
      </div>
    `;

    document.body.appendChild(el);

    let panelOpen = false;
    const body = document.getElementById('pp-chat-body');

    const openPanel = () => {
      panelOpen = true;
      document.getElementById('pp-chat-panel').classList.add('is-open');
      renderMessages(body);
      setTimeout(() => document.getElementById('pp-chat-input')?.focus(), 100);
    };

    const closePanel = () => {
      panelOpen = false;
      document.getElementById('pp-chat-panel').classList.remove('is-open');
    };

    document.getElementById('pp-chat-toggle').addEventListener('click', () => {
      panelOpen ? closePanel() : openPanel();
    });
    document.getElementById('pp-chat-close').addEventListener('click', closePanel);

    const doSend = () => {
      const input = document.getElementById('pp-chat-input');
      const text  = input.value.trim();
      if (!text) return;
      input.value = '';
      sendUserMessage(text, body);
    };

    document.getElementById('pp-chat-send').addEventListener('click', doSend);
    document.getElementById('pp-chat-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') doSend();
    });

    updateChatBadge();

    // Poll every 4 seconds for new admin messages
    setInterval(() => {
      updateChatBadge();
      if (panelOpen) renderMessages(body);
    }, 4000);

    // Apply lang attribute for bilingual spans
    const applyLang = () => {
      const l = localStorage.getItem('pp:lang') || 'en';
      el.querySelectorAll('[data-en]').forEach(s => s.style.display = l === 'cn' ? 'none' : '');
      el.querySelectorAll('[data-cn]').forEach(s => s.style.display = l === 'cn' ? '' : 'none');
    };
    applyLang();
    window.addEventListener('pp:langchange', applyLang);
  };

  // When injected dynamically by chrome.js, DOMContentLoaded has already fired
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
  } else {
    injectWidget();
  }

  window.PPChat = { loadChat, saveChat, updateChatBadge };
})();
