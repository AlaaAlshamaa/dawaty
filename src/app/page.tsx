export default function HomePage() {
  const demos = [
  {
    title: "حفل زفاف",
    subtitle: "تصميم أنيق وفخم  يليق بإطلالتكِ الملكية",
    href: "/test",
    image: "/templates/golden/images/wedding.jpg",
  },
 {
    title: " مولد نبوي   ",
    subtitle: "دعوة لسماع مولد خير الورى هي أجمل الدعوات ",
    href: "",
    image: "/templates/golden/images/mawled.jpg",
  },
  {
    title: "حفل تخرج",
    subtitle: "لحظة نجاحك تستحق احتفالاً مميزاً",
    href: "",
    image: "/templates/golden/images/graduation.jpg",
  },
  {
    title: "استقبال مولود",
    subtitle: "فرحة صغيرة تستحق دعوة مليئة بالحبِ والدفء",
    href: "",
    image: "/templates/golden/images/baby.jpg",
  },
  {
    title: "مناسبة خاصة",
    subtitle: "مناسبتكِ احتفالكِ ودعوتكِ .. بطابعكٍ الخاص",
    href: "",
    image: "/templates/golden/images/party.jpg",
  },
 
];

  return (
    <main className="home-page font-tajawal" dir="rtl">
      {/* Hero */}
      <section className="home-hero" id="home">
        <div className="container">
          <div className="home-hero-inner">
            <p className="home-kicker">دعوات رقمية فاخرة</p>

            <h1 className=" home-title ">
              Dawaty
            </h1>

            <p className="home-tagline">لحظتك تبدأ بدعوة</p>

            <p className="home-description">
              منصة لإنشاء دعوات رقمية أنيقة للمناسبات الخاصة، مع تصميم فاخر،
              مشاركة سهلة، وتأكيد حضور مباشر.
          
            </p>
       <p>
        <br></br>
               لتكون الدعوة بنفس جمال المناسبة
            </p>
        
          </div>
        </div>
      </section>

      {/* About */}
    

      {/* Demos */}
      <section className="home-section" id="demos">
        <div className="container">
          <div className="home-section-head">
            <h2 className=" section-title ">
              استعرض تصاميمنا
            </h2>
            <p className="home-section-sub">
              اختاري النمط الذي يناسب مناسبتك
            </p>
          </div>

          <div className="demo-grid">
            {demos.map((demo) => (
              <a
                key={demo.title}
                href={demo.href}
                className={`demo-card ${demo.href === "#" ? "is-disabled" : ""}`}
              >
                <div className="demo-image">
  <img src={demo.image} alt={demo.title} />
</div>
                <h3 className="demo-title">{demo.title}</h3>
                <p className="demo-subtitle">{demo.subtitle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-section" id="features">
        <div className="container">
          <div className="home-section-head">
            <h2 className=" section-title ">
              لماذا Dawaty؟
            </h2>
          </div>

          <div className="soft-feature-list">
  <div className="soft-feature">
    <span>01</span>
    <div>
      <h3>تصميم راقٍ</h3>
      <p>واجهة أنيقة تعكس جمال المناسبة.</p>
    </div>
  </div>

  <div className="soft-feature">
    <span>02</span>
    <div>
      <h3>مشاركة سهلة</h3>
      <p>أرسلي الدعوة عبر الرابط أو واتساب.</p>
    </div>
  </div>

  <div className="soft-feature">
    <span>03</span>
    <div>
      <h3>تأكيد حضور</h3>
      <p>نموذج RSVP بسيط ومنظم.</p>
    </div>
  </div>

  <div className="soft-feature">
    <span>04</span>
    <div>
      <h3>تجربة متكاملة</h3>
      <p>كل شيء في صفحة واحدة أنيقة.</p>
    </div>
  </div>
</div>
        </div>
      </section>


      {/* Footer */}
      <footer className="home-footer">
  <div className="container home-footer-inner">
    <div>
      <h3 className="home-footer-logo">Dawaty</h3>
      <p className="home-footer-tagline">لحظتك تبدأ بدعوة</p>
    </div>

    <nav className="home-footer-links">
      <a href="#home">الرئيسية</a>
      <a href="#demos">النماذج</a>
      <a href="#features">المميزات</a>
      <a href="#about">عن Dawaty</a>
    </nav>

    <p className="home-footer-copy">
      © 2026 Dawaty. All rights reserved.
    </p>
  </div>
</footer>
    </main>
  );
}