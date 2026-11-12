import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';

export function NoteModal({
  note,
  isOpen,
  onClose,
  onSave,
  isSubmitting
}) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  useEffect(() => {
    if (note) {
      setTitulo(note.titulo || '');
      setTexto(note.texto || '');
    }
  }, [note]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !note) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim() || isSubmitting) return;

    onSave(note.id, {
      titulo: titulo.trim(),
      texto: texto.trim()
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isValid = titulo.trim().length > 0 && texto.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Editar Nota</h2>
          <button className="modal-close" onClick={onClose} title="Fechar modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
                fontWeight: 600
              }}
            >
              Título
            </label>
            <input
              type="text"
              className="search-input"
              style={{ paddingLeft: '1rem' }}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título da nota..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
                fontWeight: 600
              }}
            >
              Conteúdo
            </label>
            <textarea
              className="form-textarea"
              style={{
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                minHeight: '120px'
              }}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escreva os detalhes..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-icon"
              style={{ width: 'auto', padding: '0 1.25rem', height: '42px' }}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="spin" /> Salvando...
                </>
              ) : (
                <>
                  <Save size={18} /> Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
