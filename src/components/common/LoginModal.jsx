import React, { useState } from 'react';
import { verifyAdminPin, setAdminSession } from '../../services/storageService';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyAdminPin(pin.trim())) {
      setAdminSession(true);
      setError('');
      setPin('');
      onSuccess();
      onClose();
    } else {
      setError('PIN SALAH. SILAKAN COBA LAGI (DEFAULT: 1984)');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '0px' }}
      >
        {/* Header Bar */}
        <div 
          className="swiss-border-b" 
          style={{ 
            padding: '16px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundColor: 'var(--dp-color-ink)',
            color: 'var(--dp-color-ground)'
          }}
        >
          <div className="text-label" style={{ color: 'var(--dp-color-ground)' }}>
            [ OTORISASI ADMIN KEDAI ]
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{ 
              background: 'transparent', 
              color: '#ffffff', 
              border: 'none', 
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 700
            }}
          >
            [X]
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '28px 24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="admin-pin-input" 
              className="text-label" 
              style={{ display: 'block', marginBottom: '8px' }}
            >
              MASUKKAN KODE PIN ADMIN
            </label>
            <input
              id="admin-pin-input"
              type="password"
              placeholder="••••"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              autoFocus
              maxLength={10}
              style={{ 
                letterSpacing: '0.3em', 
                fontSize: '22px', 
                textAlign: 'center',
                backgroundColor: 'var(--dp-color-surface)'
              }}
            />
            <div className="text-metadata" style={{ marginTop: '8px', color: '#666666' }}>
              * Default PIN prototype: <strong style={{ color: 'var(--dp-color-accent)' }}>1984</strong>
            </div>
          </div>

          {error && (
            <div 
              className="swiss-border-all text-metadata" 
              style={{ 
                padding: '10px 14px', 
                backgroundColor: 'var(--dp-color-accent-soft)', 
                borderColor: 'var(--dp-color-accent)',
                color: 'var(--dp-color-accent)', 
                marginBottom: '20px',
                fontWeight: 700 
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-swiss" 
              style={{ flex: 1 }}
            >
              BATAL
            </button>
            <button 
              type="submit" 
              className="btn-swiss btn-accent" 
              style={{ flex: 2 }}
            >
              MASUK KE WORKSPACE ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

