function buildGeneratedScreen(promptText){
  const p=(promptText||'').toLowerCase();
  let niche='تطبيق خدمات';
  let action='ابدأ الآن';
  let cards=['الخدمة الأولى','الخدمة الثانية','الخدمة الثالثة'];
  if(/متجر|بيع|منتج|عطور|ملابس|shop|store/.test(p)){niche='متجر ذكي';action='تسوّق الآن';cards=['منتج مميز','عروض اليوم','الأكثر مبيعًا'];}
  if(/مطعم|اكل|طعام|food|menu/.test(p)){niche='مطعم سريع';action='اطلب الآن';cards=['وجبات مميزة','عروض الغداء','الأقرب إليك'];}
  if(/حجز|موعد|عيادة|صالون|booking/.test(p)){niche='نظام حجوزات';action='احجز موعدك';cards=['المواعيد المتاحة','الخدمات','مراجعات العملاء'];}
  if(/عقار|عقارات|فيلا|منزل|real/.test(p)){niche='منصة عقارات';action='استعرض العقارات';cards=['فلل فاخرة','شقق للإيجار','عروض جديدة'];}
  const e=s=>String(s).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  return `<div class="el" data-type="hero"><button class="x">×</button><div class="hero"><h2>${e(niche)}</h2><p>${e(promptText||'واجهة جوال حديثة')}</p></div></div>`+
  `<div class="el" data-type="input"><button class="x">×</button><input placeholder="ابحث هنا"></div>`+
  cards.map(c=>`<div class="el" data-type="card"><button class="x">×</button><div class="card"><b>${e(c)}</b><p>قسم جاهز قابل للتعديل داخل منشئ الشاشة.</p></div></div>`).join('')+
  `<div class="el" data-type="button"><button class="x">×</button><div class="btn">${e(action)}</div></div>`+
  `<div class="el" data-type="nav"><button class="x">×</button><div class="nav"><span>الرئيسية</span><span>بحث</span><span>حسابي</span></div></div>`;
}
