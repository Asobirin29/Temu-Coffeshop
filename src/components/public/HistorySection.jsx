import React, { useState, useRef } from 'react';

const formatDate = (d) => (d || '').replace(/\s*\/\/\s*/g, ' — ');

function StoryCard({ story }) {
  const images = (story.images && story.images.length > 0)
    ? story.images.filter(Boolean)
    : (story.image_url ? [story.image_url] : []);
  const [idx, setIdx] = useState(0);
  const touchX = useRef(null);
  const total = images.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <article className="story">
      {total > 0 && (
        <div
          className="story__media"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null || total < 2) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
            touchX.current = null;
          }}
        >
          <img
            src={images[idx]}
            alt={`${story.title} — foto ${idx + 1}`}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          {total > 1 && (
            <div className="story__nav">
              <button type="button" onClick={prev} aria-label="Foto sebelumnya">←</button>
              <span>{idx + 1}/{total}</span>
              <button type="button" onClick={next} aria-label="Foto selanjutnya">→</button>
            </div>
          )}
        </div>
      )}
      <div className="story__body">
        {story.story_date && <span className="story__year">{formatDate(story.story_date)}</span>}
        <h3 className="story__title">{story.title}</h3>
        {story.caption && <p className="story__text">{story.caption}</p>}
      </div>
    </article>
  );
}

export default function HistorySection({ historyStories }) {
  const stories = (historyStories || [])
    .filter((s) => s.is_published)
    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  if (stories.length === 0) return null;

  return (
    <section id="historis" className="section-pad" style={{ borderBottom: 'var(--dp-border-rule) solid var(--dp-color-ink)', scrollMarginTop: '64px' }}>
      <div className="section-head">
        <div>
          <span className="eyebrow is-accent"><span className="sq" />01 — Cerita kami</span>
          <h2 className="section-title">Dari kebun ke ruang temu.</h2>
        </div>
        <p>
          Sejak 2021 kami bekerja langsung dengan petani dan membangun ruang untuk
          ngobrol tanpa distraksi. Ini perjalanan singkatnya.
        </p>
      </div>

      <div className="stories">
        {stories.map((story) => <StoryCard key={story.id} story={story} />)}
      </div>
    </section>
  );
}
