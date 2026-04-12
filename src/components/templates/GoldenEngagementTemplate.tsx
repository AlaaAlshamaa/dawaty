"use client";

import RSVPForm from "@/components/RSVPForm";
import Countdown from "@/components/shared/Countdown";
import type { Invite } from "@/types";
import { useState } from "react";

function fmtDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ar", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

function fmtTime(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ar", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export default function MaisonEngagementTemplate({
  invite,
}: {
  invite: Invite;
}) {
  const cover =
    invite.cover_image_url ||
    "/templates/maison/images/maison-hero-01.jpg";

  const gallery =
    invite.gallery_image_urls?.length
      ? invite.gallery_image_urls
      : [
          "/templates/maison/images/maison-doree-01.jpg",
          "/templates/maison/images/maison-doree-02.jpg",
          "/templates/maison/images/maison-doree-03.jpg",
        ];

  const [openRSVP, setOpenRSVP] = useState(false);

  return (
    <div dir="rtl">
        {/* HERO */}
<section className="hero hero-no-image" id="home">
          <div className="hero-content hero-fade-in">
          <p className="text-label hero-tagline">
            يسرّنا دعوتكم لحضور {invite.title || "حفل خطوبة"}
          </p>

          <h1 className="heading-display hero-title golden-title ">
            {invite.host_names || "أهلاً وسهلاً بكم"}
          </h1>

           <p className="text-body hero-description">
      نكتب معًا أول سطور العمر… وننتظر حضوركم ليكتمل فرحنا
    </p>

          <div className="hero-actions">
            <a href="#rsvp" className="btn-primary">
              تأكيد الحضور
            </a>
          </div>
        </div>
      </section>

<section className="collections" id="gallery">
  <div className="container">
    <h2 className="heading-display section-title golden-title">
      دعوة زفاف
    </h2>

    {/* أول 4 صور (التصميم الفني) */}
    {gallery.length >= 4 && (
      <div className="gallery-featured">
        <div className="g-item g-1">
          <img src={gallery[2]} />
        </div>

        <div className="g-item g-2">
          <img src={gallery[1]} />
        </div>

        <div className="g-item g-3">
          <img src={gallery[0]} />
        </div>

        <div className="g-item g-4">
          <img src={gallery[3]} />
        </div>
      </div>
    )}

    {/* باقي الصور */}
    {gallery.length > 4 && (
      <div className="gallery-grid">
        {gallery.slice(4).map((img, i) => (
          <div className="grid-item" key={i}>
            <img src={img} />
          </div>
        ))}
      </div>
    )}
  </div>
</section>
    

      {/* DETAILS */}
      <section className="featured-piece" id="details">
        <div className="container">
          <div className="featured-content">
            <h2 className="heading-display featured-title">
              تفاصيل المناسبة
            </h2>

            <div className="featured-details">
              <div className="detail-row">
                <span className="detail-label">📅 التاريخ</span>
                <span className="detail-value">
                  {invite.event_at ? fmtDate(invite.event_at) : "—"}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">⏰ الوقت</span>
                <span className="detail-value">
                  {invite.event_at ? fmtTime(invite.event_at) : "—"}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">📍 المكان</span>
                <span className="detail-value">
                  {invite.location_name || "—"}
                </span>
              </div>

              {invite.notes && (
                <div className="detail-row">
                  <span className="detail-label">📝 ملاحظات</span>
                  <span className="detail-value">
                    {invite.notes}
                  </span>
                </div>
              )}
            </div>

          {invite.maps_url && (
  <div className="location-map-wrap" id="location">
    <iframe
      src={invite.maps_url}
      width="100%"
      height="380"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="خريطة الموقع"
    />
  </div>
)}
          </div>
        </div>
      </section>

      {invite.event_at && <Countdown dateISO={invite.event_at} />}



      {/* RSVP */}
      <section className="contact" id="rsvp">
  <div className="container">
    <h2 className="heading-display contact-title golden-title">
      تأكيد الحضور
    </h2>

    <p style={{ textAlign: "center", marginBottom: 20 }}>
      يرجى النقر على الظرف
    </p>

    {/* صورة الظرف */}
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        onClick={() => setOpenRSVP(true)}
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        <img
          src="/templates/golden/images/envelope-gold.png"
          alt="ظرف"
          style={{ width: 220, borderRadius: 16 }}
        />
      </button>
    </div>

    {/* المودال */}
    {openRSVP && (
      <div className="modal-overlay" onClick={() => setOpenRSVP(false)}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setOpenRSVP(false)}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: 24,
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <RSVPForm inviteId={invite.id} />
        </div>
      </div>
    )}
  </div>

 {/* footer */}
  <footer className="site-footer-golden">
  <div className="container">
    <div className="footer-brand">
      <div className="footer-logo heading-display golden-title">
        Dawaty
      </div>
      <p className="footer-tagline">
         لحظتك تبدأ بدعوة
      </p>
    </div>

    <nav className="footer-links">
      <a href="#home">الرئيسية</a>
      <a href="#location">الموقع</a>
      <a href="#details">التفاصيل</a>
      <a href="#rsvp">تأكيد الحضور</a>
    </nav>

    <div className="footer-social">
      <a href="https://wa.me/963XXXXXXXXX" target="_blank" rel="noreferrer">
        واتساب
      </a>
      <a href="https://instagram.com/yourpage" target="_blank" rel="noreferrer">
        إنستغرام
      </a>
    </div>

    <div className="footer-copy">
      © 2026 Dawaty. All Rights Reserved.
    </div>
  </div>
</footer>
</section>

    </div>
  );
}