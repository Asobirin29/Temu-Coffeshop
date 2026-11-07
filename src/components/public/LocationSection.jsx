import React from 'react';
import { DEFAULT_INFO } from '../../data/defaultSeedData';

const stripPrefix = (s, prefix) => (s || '').replace(prefix, '').trim();

export default function LocationSection({ siteInfo }) {
  const info = { ...DEFAULT_INFO, ...(siteInfo || {}) };

  const hours = [
    ['Senin — Kamis', '07:00 — 22:00'],
    ['Jumat', '07:00 — 23:00'],
    ['Sabtu — Minggu', '08:00 — 23:00']
  ];

  return (
    <section id="lokasi" className="section-pad" style={{ borderBottom: 'var(--dp-border-rule) solid var(--dp-color-ink)', scrollMarginTop: '64px' }}>
      <div className="section-head">
        <div>
          <span className="eyebrow is-accent"><span className="sq" />02 — Lokasi</span>
          <h2 className="section-title">Mampir &amp; mulai ngobrol.</h2>
        </div>
        {info.locationLead && <p>{info.locationLead}</p>}
      </div>

      <div className="visit">
        <div className="visit__col visit__col--addr">
          <span className="facts__label">Alamat</span>
          <div className="visit__addr">{info.address}</div>
          <div className="visit__muted">{info.addressDetail || info.locationArea}</div>
          {info.addressBenchmark && (
            <div className="visit__muted" style={{ fontSize: '14px' }}>
              <strong style={{ color: 'var(--dp-color-ink)' }}>Patokan:</strong>{' '}
              {stripPrefix(info.addressBenchmark, /^PATOKAN:\s*/i)}
            </div>
          )}
        </div>

        <div className="visit__col visit__col--hours">
          <span className="facts__label">Jam buka</span>
          <div>
            {hours.map(([day, time]) => (
              <div key={day} className="hours-row">
                <span>{day}</span>
                <strong>{time}</strong>
              </div>
            ))}
          </div>
          {info.lastOrderNote && (
            <div className="visit__muted" style={{ fontSize: '13px' }}>
              {stripPrefix(info.lastOrderNote, /\s*PROTOKOL\s*$/i)}
            </div>
          )}
        </div>

        <div className="visit__col visit__col--act">
          <div className="visit__muted" style={{ fontSize: '14px' }}>
            Datang langsung tanpa reservasi. Untuk grup 8+ orang, hubungi kami dulu.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href={info.googleMapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-swiss btn-accent btn-lg"
              style={{ width: '100%' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>near_me</span>
              Buka Maps
            </a>
            <a
              href={info.whatsappUrl || 'https://wa.me/6281234567890'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-swiss btn-lg"
              style={{ width: '100%' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
