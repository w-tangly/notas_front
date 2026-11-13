import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { NoteModal } from './components/NoteModal';
import { ToastContainer } from './components/Toast';
import { api } from './services/api';
import { StickyNote, Loader2, Pin } from 'lucide-react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('notaria_pinned');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('notaria_theme') || 'dark';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('notaria_theme', theme);
  }, [theme]);

  // Sync pinned IDs to localStorage
  useEffect(() => {
    localStorage.setItem('notaria_pinned', JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  // Fetch notes from API
  const loadNotes = useCallback(async (showToastNotice = false) => {
    try {
      setIsRefreshing(true);
      const data = await api.getNotes();
      setNotes(data);
      setIsConnected(true);
      if (showToastNotice) {
        addToast('Notas atualizadas com sucesso!', 'success');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setIsConnected(false);
      addToast('Não foi possível conectar à API no Render. Tentando novamente...', 'error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [addToast]);

  // Initial load
  useEffect(() => {
    loadNotes();
    // Periodic health ping
    const interval = setInterval(async () => {
      const healthy = await api.checkHealth();
      setIsConnected(healthy);
    }, 15000);
    return () => clearInterval(interval);
  }, [loadNotes]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Add new note
  const handleAddNote = async (newNoteData) => {
    setIsSubmitting(true);
    try {
      const createdNote = await api.createNote(newNoteData);
      setNotes((prev) => [createdNote, ...prev]);
      addToast('Nota criada com sucesso!', 'success');
    } catch {
      addToast('Erro ao criar a nota. Verifique a conexão com o backend.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update existing note
  const handleUpdateNote = async (id, updatedData) => {
    setIsSubmitting(true);
    try {
      const updatedNote = await api.updateNote(id, updatedData);
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updatedNote } : n))
      );
      setEditingNote(null);
      addToast('Nota atualizada com sucesso!', 'success');
    } catch {
      addToast('Erro ao atualizar a nota.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      await api.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setPinnedIds((prev) => prev.filter((pId) => pId !== id));
      addToast('Nota removida!', 'info');
    } catch {
      addToast('Erro ao excluir a nota.', 'error');
    }
  };

  // Toggle Pin
  const handleTogglePin = (id) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) {
        addToast('Nota desafixada', 'info');
        return prev.filter((pId) => pId !== id);
      } else {
        addToast('Nota fixada no topo!', 'success');
        return [...prev, id];
      }
    });
  };

  // Filter notes by search
  const filteredNotes = useMemo(() => {
    if (!searchTerm.trim()) return notes;
    const term = searchTerm.toLowerCase();
    return notes.filter(
      (n) =>
        (n.titulo && n.titulo.toLowerCase().includes(term)) ||
        (n.texto && n.texto.toLowerCase().includes(term))
    );
  }, [notes, searchTerm]);

  // Separate pinned and regular notes
  const pinnedNotes = useMemo(() => {
    return filteredNotes.filter((n) => pinnedIds.includes(n.id));
  }, [filteredNotes, pinnedIds]);

  const otherNotes = useMemo(() => {
    return filteredNotes.filter((n) => !pinnedIds.includes(n.id));
  }, [filteredNotes, pinnedIds]);

  return (
    <div className="app-container">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        toggleTheme={toggleTheme}
        isConnected={isConnected}
        isRefreshing={isRefreshing}
        onRefresh={() => loadNotes(true)}
      />

      <main>
        <NoteForm onAddNote={handleAddNote} isSubmitting={isSubmitting} />

        <div className="section-header">
          <h2 className="section-title">
            Suas Notas & Tarefas
            <span className="note-count-pill">{filteredNotes.length}</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="empty-state">
            <Loader2 size={48} className="spin empty-icon" />
            <h3 className="empty-title">Carregando notas...</h3>
            <p className="empty-subtitle">Conectando ao backend no Render (pode levar alguns segundos se a instância estiver despertando).</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <StickyNote size={32} />
            </div>
            <h3 className="empty-title">
              {searchTerm ? 'Nenhuma nota encontrada' : 'Nenhuma nota cadastrada'}
            </h3>
            <p className="empty-subtitle">
              {searchTerm
                ? `Não encontramos resultados para "${searchTerm}". Tente pesquisar outros termos.`
                : 'Crie sua primeira nota no formulário acima para começar!'}
            </p>
          </div>
        ) : (
          <>
            {/* Pinned Notes Section */}
            {pinnedNotes.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Pin size={16} style={{ color: '#a855f7' }} /> FIXADAS ({pinnedNotes.length})
                </h3>
                <div className="notes-grid">
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={setEditingNote}
                      onDelete={handleDeleteNote}
                      onTogglePin={handleTogglePin}
                      isPinned={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Notes Section */}
            {otherNotes.length > 0 && (
              <div>
                {pinnedNotes.length > 0 && (
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      color: 'var(--text-muted)',
                      marginBottom: '1rem'
                    }}
                  >
                    OUTRAS NOTAS ({otherNotes.length})
                  </h3>
                )}
                <div className="notes-grid">
                  {otherNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={setEditingNote}
                      onDelete={handleDeleteNote}
                      onTogglePin={handleTogglePin}
                      isPinned={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <NoteModal
        note={editingNote}
        isOpen={Boolean(editingNote)}
        onClose={() => setEditingNote(null)}
        onSave={handleUpdateNote}
        isSubmitting={isSubmitting}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
