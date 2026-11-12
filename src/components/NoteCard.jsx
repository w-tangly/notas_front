import React, { useState } from 'react';
import { Pin, Edit3, Trash2, Copy, Check, Calendar } from 'lucide-react';

export function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  isPinned
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    const fullText = `${note.titulo}\n\n${note.texto}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Hoje';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return 'Recentemente';
    }
  };

  return (
    <div className={`note-card ${isPinned ? 'pinned' : ''}`}>
      <div>
        <div className="note-card-header">
          <h3 className="note-title">{note.titulo}</h3>
          <button
            className={`pin-btn ${isPinned ? 'active' : ''}`}
            onClick={() => onTogglePin(note.id)}
            title={isPinned ? 'Desafixar nota' : 'Fixar nota no topo'}
          >
            <Pin size={16} style={{ transform: isPinned ? 'rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        <p className="note-body">{note.texto}</p>
      </div>

      <div className="note-card-footer">
        <div className="note-date">
          <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
          {formatDate(note.criadoEm)}
        </div>

        <div className="note-actions">
          <button
            className="btn-action"
            onClick={handleCopy}
            title="Copiar conteúdo"
          >
            {copied ? <Check size={16} style={{ color: 'var(--success)' }} /> : <Copy size={16} />}
          </button>
          <button
            className="btn-action edit"
            onClick={() => onEdit(note)}
            title="Editar nota"
          >
            <Edit3 size={16} />
          </button>
          <button
            className="btn-action delete"
            onClick={() => onDelete(note.id)}
            title="Excluir nota"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
