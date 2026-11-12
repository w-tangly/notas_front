import React, { useState } from 'react';
import { PlusCircle, Loader2, Sparkles } from 'lucide-react';

export function NoteForm({ onAddNote, isSubmitting }) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim() || isSubmitting) return;

    onAddNote({
      titulo: titulo.trim(),
      texto: texto.trim()
    });

    setTitulo('');
    setTexto('');
  };

  const handleKeyDown = (e) => {
    // Ctrl + Enter or Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const isValid = titulo.trim().length > 0 && texto.trim().length > 0;

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-title-input"
        placeholder="Título da nota ou tarefa..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        maxLength={100}
        disabled={isSubmitting}
      />
      <textarea
        className="form-textarea"
        placeholder="Escreva os detalhes aqui... (Pressione Ctrl + Enter para salvar rápido)"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isSubmitting}
      />

      <div className="form-footer">
        <div className="char-counter">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          {texto.length} caracteres
        </div>

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
              <PlusCircle size={18} /> Adicionar Nota
            </>
          )}
        </button>
      </div>
    </form>
  );
}
