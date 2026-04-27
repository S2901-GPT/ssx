import React, { useState } from "react";
import {
  Brain,
  EyeOff,
  Masks,
  Network,
  Layers,
  AlertCircle,
  Dna,
  Zap,
  Sparkles,
  ShieldAlert,
  Activity,
  ScanLine,
  ChevronRight,
} from "lucide-react";
import "./index.css";

const deepData = {
  overview: {
    title: "التوحد الناطق",
    subtitle: "تشريح العالم الداخلي والاضطرابات المصاحبة عبر لوحة تفاعلية عالية الكثافة البصرية.",
    badge: "تحليل عصبي ـ نفسي متقدم",
  },
  innerWorld: [
    {
      trait: "الانغلاق الذهني / الشلل التنفيذي",
      en: "Executive Dysfunction",
      internal: "شعور بالاختناق والشلل التام للإرادة. الدماغ يعلم تماماً ما يجب فعله، يصرخ من الداخل للبدء بالمهمة، لكن الجسد لا يستجيب. كأن هناك جداراً زجاجياً يفصل بين النية والفعل.",
      external: "يُرى على أنه كسل مفرط، لامبالاة، تهاون، غياب للمسؤولية، وعناد مقصود لتأجيل المهام.",
      neuro: "خلل في قشرة الفص الجبهي يؤدي إلى تعطل القدرة على المبادرة والانتقال بين المهام.",
    },
    {
      trait: "التمويه والإخفاء الاجتماعي",
      en: "Masking",
      internal: "تمثيل مسرحي مستمر ومرهق ذهنياً. حساب دقيق لكل حركة عين، نبرة صوت، وابتسامة. شعور بفقدان الهوية الأصلية، وينتهي غالباً بإنهاك عصبي.",
      external: "يُرى على أنه شخص اجتماعي وطبيعي جداً، وقد يُتهم بالتصنع عند الانهيار لاحقاً.",
      neuro: "استهلاك مرتفع للذاكرة العاملة لمحاكاة السلوك النمطي بدلاً من التفاعل العفوي.",
    },
    {
      trait: "الحمل الحسي الزائد",
      en: "Sensory Overload",
      internal: "الأصوات العادية تبدو كإبر في الدماغ، الأضواء تسبب ألماً جسدياً، والروائح تخنق. العالم يتحول إلى هجوم عصبي مستمر.",
      external: "يُساء فهمه كشخص درامي، مبالغ في ردود فعله، أو يتصرف بعدوانية وطفولية فجأة.",
      neuro: "فشل في فلترة المحفزات؛ اللوزة الدماغية تطلق إنذار خطر استجابة لمحفزات آمنة.",
    },
    {
      trait: "التأخر في معالجة العواطف",
      en: "Alexithymia",
      internal: "فراغ أو تشوش عاطفي في اللحظة نفسها. يحتاج لساعات أو أيام لفهم ما شعر به، ثم قد ينفجر بالبكاء في توقيت غير مفهوم للآخرين.",
      external: "يُرى كشخص بارد، بلا مشاعر، روبوتي، قاسٍ، أو فاقد للتعاطف.",
      neuro: "بطء في الاتصال بين الجهاز الحوفي والقشرة الدماغية المسؤولة عن تسمية المشاعر.",
    },
    {
      trait: "غصة الكلمات والتفكير الحرفي",
      en: "Word Retrieval & Literal Thinking",
      internal: "الأفكار موجودة كصور ومفاهيم مكتملة، لكن الوصول إلى الكلمات يتعطل تحت الضغط. التفكير الحرفي يصبح ملاذاً لتقليل فوضى المعاني.",
      external: "يُعتقد أنه بطيء الفهم، يتجاهل المتحدث، أو يتعمد إفساد النكات.",
      neuro: "تأخر في الاستدعاء المعجمي وضعف في معالجة اللغة المجازية تحت الضغط.",
    },
  ],
  comorbidities: {
    neurodevelopmental: {
      title: "الاضطرابات النمائية العصبية والمعرفية",
      count: 16,
      items: [
        ["اضطراب نقص الانتباه وفرط النشاط", "ADHD", "تشتت، اندفاعية، واختلال أعمق في الوظائف التنفيذية."],
        ["اضطراب المعالجة الحسية", "SPD", "صعوبة في تنظيم واستقبال المعلومات من الحواس."],
        ["عسر القراءة", "Dyslexia", "صعوبات في القراءة وفك تشفير الكلمات."],
        ["عسر الكتابة", "Dysgraphia", "تشوه في خط اليد وصعوبة تحويل الأفكار لكتابة."],
        ["عسر الحساب", "Dyscalculia", "صعوبات في فهم الأرقام والكميات والعمليات الحسابية."],
        ["اضطراب التآزر النمائي", "Dyspraxia", "خلل في التخطيط الحركي والتوازن والمهارات الدقيقة."],
        ["اضطراب المعالجة السمعية", "APD", "يسمع الصوت لكن الدماغ يفشل في فهمه وسط الضوضاء."],
        ["متلازمة إيرلين", "Irlen Syndrome", "إجهاد بصري وحساسية للأضواء وأنماط النصوص."],
        ["اضطراب التشنجات اللاإرادية", "Tic Disorder", "حركات أو أصوات سريعة ولا إرادية."],
        ["متلازمة توريت", "Tourette Syndrome", "عرّات حركية وصوتية لا إرادية."],
        ["فرط القراءة", "Hyperlexia", "قراءة مبكرة مع صعوبة في فهم المعنى العميق."],
        ["صعوبات التعلم غير اللفظية", "NVLD", "قوة لغوية مع ضعف مكاني وبصري واجتماعي."],
        ["اضطراب اللغة التعبيرية", "Expressive Language Disorder", "صعوبة في التعبير الشفهي المعقد."],
        ["اضطراب اللغة الاستقبالية", "Receptive Language Disorder", "صعوبة في فهم الجمل والتعليمات المعقدة."],
        ["التنميط الحركي النمائي", "Stereotypic Movement", "حركات متكررة للتنظيم العصبي."],
        ["الحس المرافق", "Synesthesia", "تداخل الحواس مثل رؤية الحروف بألوان."],
      ],
    },
    psychological: {
      title: "الاضطرابات النفسية والسلوكية",
      count: 11,
      items: [
        ["القلق العام والاجتماعي", "GAD / SAD", "خوف مستمر من التفاعل الاجتماعي والأخطاء البراغماتية."],
        ["الاكتئاب السريري", "MDD", "ينتج غالباً عن العزلة والاحتراق والرفض المتكرر."],
        ["الوسواس القهري", "OCD", "أفكار اقتحامية وطقوس قهرية لخفض التوتر."],
        ["التجنب المرضي للطلبات", "PDA", "مقاومة الطلبات بسبب قلق شديد من فقدان السيطرة."],
        ["انزعاج الرفض الحساس", "RSD", "ألم عاطفي شديد عند النقد أو الرفض."],
        ["اضطراب ما بعد الصدمة المعقد", "C-PTSD", "قد ينتج عن التنمر والصدمات الحسية والتمويه القسري."],
        ["اضطراب تجنب/تقييد الطعام", "ARFID", "رفض الطعام لأسباب حسية لا تتعلق بالوزن."],
        ["الصمت الاختياري/الظرفي", "Selective Mutism", "انهيار القدرة على الكلام في مواقف محددة."],
        ["اضطراب الهوية الجندرية", "Gender Dysphoria", "تداخل أعلى مع طيف التوحد مقارنة بعامة السكان."],
        ["اضطراب ثنائي القطب", "Bipolar Disorder", "تقلبات مزاجية حادة بين الهوس والاكتئاب."],
        ["طيف الفصام والذهان", "Schizophrenia Spectrum", "تداخل تشخيصي معقد يحتاج تقييم متخصص."],
      ],
    },
    medical: {
      title: "الاضطرابات العصبية والطبية الجسدية",
      count: 9,
      items: [
        ["متلازمة إهلرز-دانلوس", "EDS", "فرط مرونة، ألم مزمن، وإرهاق جسدي."],
        ["تسارع القلب الوضعي", "POTS", "دوار وخفقان وإغماء عند الوقوف."],
        ["الصرع والاضطرابات التشنجية", "Epilepsy", "نوبات أو اضطرابات تشنجية قد تظهر في الطفولة أو المراهقة."],
        ["اضطرابات النوم المزمنة", "Sleep Disorders", "أرق، اضطراب دورة النوم، أو انقطاع النفس."],
        ["الاضطرابات المعدية المعوية", "GI Disorders", "قولون عصبي، إمساك، وتشنجات هضمية."],
        ["خلل الوظائف المستقلة", "Dysautonomia", "اضطراب تنظيم الحرارة والهضم ومعدل القلب."],
        ["الصداع النصفي", "Migraines", "قد يرتبط بالحمل الحسي الزائد."],
        ["الاعتلال العصبي المحيطي", "Peripheral Neuropathy", "وخز أو خدر في الأطراف."],
        ["اضطرابات مناعية/تحسسية", "Immune / Allergy", "حساسية وربو والتهابات متكررة لدى بعض الحالات."],
      ],
    },
  },
};

function StatCard({ icon, label, value }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
      <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/30 blur-2xl" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-1 text-3xl font-black text-white">{value}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-indigo-200">{icon}</div>
      </div>
    </div>
  );
}

function InnerCard({ item, index }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-indigo-500 via-fuchsia-500 to-rose-500" />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative overflow-hidden bg-slate-950 p-7 text-white">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-600/20 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-200">
                <Masks className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-[0.25em]">الداخل</span>
              </div>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-300">محور {index + 1}</span>
            </div>
            <h3 className="text-2xl font-black leading-tight">{item.trait}</h3>
            <p className="mt-1 text-sm font-bold text-indigo-300">{item.en}</p>
            <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-base leading-8 text-slate-200">{item.internal}</p>
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-rose-50 via-white to-indigo-50 p-7">
          <div className="mb-5 flex items-center gap-2 text-rose-700">
            <EyeOff className="h-5 w-5" />
            <span className="text-xs font-black uppercase tracking-[0.25em]">الخارج</span>
          </div>
          <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
            <p className="mb-2 text-sm font-black text-rose-700">كيف يُساء فهمه</p>
            <p className="text-base font-semibold leading-8 text-slate-700">{item.external}</p>
          </div>
          <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/80 p-5">
            <div className="mb-2 flex items-center gap-2 text-indigo-800">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-[0.18em]">التفسير العصبي</span>
            </div>
            <p className="text-sm leading-7 text-slate-700">{item.neuro}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisorderGrid({ category, tone }) {
  const config = {
    indigo: { bar: "from-indigo-600 to-blue-600", label: "text-indigo-700 bg-indigo-50 border-indigo-100" },
    rose: { bar: "from-rose-600 to-fuchsia-600", label: "text-rose-700 bg-rose-50 border-rose-100" },
    emerald: { bar: "from-emerald-600 to-teal-600", label: "text-emerald-700 bg-emerald-50 border-emerald-100" },
  }[tone];

  return (
    <section className="mb-10">
      <div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-end">
        <div>
          <p className={`mb-2 text-sm font-black ${config.label.split(" ")[0]}`}>ملف تصنيفي</p>
          <h2 className="text-2xl font-black text-slate-900">{category.title}</h2>
        </div>
        <div className={`w-fit rounded-full border px-4 py-2 text-sm font-black ${config.label}`}>{category.count} حالة</div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {category.items.map(([name, en, desc], idx) => (
          <article key={idx} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${config.bar}`} />
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black leading-7 text-slate-900 group-hover:text-indigo-700">{name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{en}</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-2 text-slate-500"><ChevronRight className="h-4 w-4" /></div>
            </div>
            <p className="text-sm leading-7 text-slate-600">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("inner");
  const total = deepData.comorbidities.neurodevelopmental.count + deepData.comorbidities.psychological.count + deepData.comorbidities.medical.count;

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,#312e81,transparent_35%),radial-gradient(circle_at_bottom_left,#881337,transparent_30%),#020617] text-slate-900">
      <section className="relative px-4 py-8 md:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl md:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-500/10 px-4 py-2 text-xs font-black text-rose-200"><AlertCircle className="h-4 w-4" />{deepData.overview.badge}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-500/10 px-4 py-2 text-xs font-black text-indigo-200"><Sparkles className="h-4 w-4" />شاشة تفاعلية متقدمة</span>
                </div>
                <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                  {deepData.overview.title}
                  <span className="block bg-gradient-to-l from-indigo-200 via-white to-rose-200 bg-clip-text text-transparent">العالم الداخلي والاضطرابات المصاحبة</span>
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-300">{deepData.overview.subtitle}</p>
              </div>
              <div className="relative hidden justify-center lg:flex">
                <div className="absolute h-64 w-64 rounded-full bg-white/5 blur-xl" />
                <Brain className="relative h-56 w-56 text-white/20" />
                <ScanLine className="absolute bottom-8 right-16 h-10 w-10 text-indigo-300" />
                <Activity className="absolute left-16 top-6 h-10 w-10 text-rose-300" />
              </div>
            </div>
            <div className="relative z-10 mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <StatCard icon={<Layers className="h-6 w-6" />} label="محاور العالم الداخلي" value={deepData.innerWorld.length} />
              <StatCard icon={<Network className="h-6 w-6" />} label="اضطرابات مصاحبة" value={`${total}+`} />
              <StatCard icon={<ShieldAlert className="h-6 w-6" />} label="تصنيفات رئيسية" value="3" />
            </div>
          </header>

          <nav className="sticky top-3 z-30 mx-auto mt-6 flex max-w-3xl gap-2 rounded-3xl border border-white/10 bg-slate-950/70 p-2 shadow-2xl backdrop-blur-xl">
            <button onClick={() => setActiveTab("inner")} className={`flex-1 rounded-2xl px-4 py-4 text-sm font-black transition-all ${activeTab === "inner" ? "bg-white text-slate-950 shadow-xl" : "text-slate-300 hover:bg-white/10"}`}>العالم الداخلي</button>
            <button onClick={() => setActiveTab("comorbidities")} className={`flex-1 rounded-2xl px-4 py-4 text-sm font-black transition-all ${activeTab === "comorbidities" ? "bg-white text-slate-950 shadow-xl" : "text-slate-300 hover:bg-white/10"}`}>الاضطرابات المصاحبة</button>
          </nav>

          <section className="mt-6 rounded-[2.5rem] border border-white/10 bg-slate-50 p-4 shadow-2xl md:p-8">
            {activeTab === "inner" && (
              <div>
                <div className="mb-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="mb-2 text-sm font-black text-indigo-700">نظرية جبل الجليد</p>
                  <h2 className="text-2xl font-black text-slate-900 md:text-3xl">الداخل المعقد مقابل الخارج المُساء فهمه</h2>
                  <p className="mt-3 max-w-4xl leading-8 text-slate-600">هذه الشاشة تعرض الفرق بين التجربة العصبية الداخلية وبين التفسير الاجتماعي الخارجي للسلوك.</p>
                </div>
                <div className="space-y-6">{deepData.innerWorld.map((item, index) => <InnerCard key={index} item={item} index={index} />)}</div>
              </div>
            )}
            {activeTab === "comorbidities" && (
              <div>
                <div className="mb-8 rounded-3xl border border-indigo-100 bg-gradient-to-l from-indigo-50 via-white to-rose-50 p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-2 text-indigo-800"><Dna className="h-5 w-5" /><span className="text-sm font-black uppercase tracking-[0.2em]">Comorbidity Map</span></div>
                  <h2 className="text-2xl font-black text-slate-900 md:text-3xl">خريطة الاعتلالات المشتركة</h2>
                  <p className="mt-3 max-w-4xl leading-8 text-slate-600">تصنيف بصري للاضطرابات النمائية، النفسية، والطبية التي قد تتداخل مع طيف التوحد.</p>
                </div>
                <DisorderGrid category={deepData.comorbidities.neurodevelopmental} tone="indigo" />
                <DisorderGrid category={deepData.comorbidities.psychological} tone="rose" />
                <DisorderGrid category={deepData.comorbidities.medical} tone="emerald" />
              </div>
            )}
          </section>
          <footer className="py-6 text-center text-xs text-slate-400">شاشة معلوماتية وليست أداة تشخيص طبي.</footer>
        </div>
      </section>
    </main>
  );
}
