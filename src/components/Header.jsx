import React from 'react';
import { Notebook, Search, Sun, Moon, RefreshCw, X, Wifi, WifiOff } from 'lucide-react';

export function Header({
  searchTerm,
  setSearchTerm,
  theme,
  toggleTheme,
  isConnected,
  isRefreshing,
  onRefresh
}) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon-wrapper">
          <Notebook size={24} />
        </div>
        <div>
          <h1 className="brand-title">Notaria</h1>
          <p className="brand-subtitle">Bloco de Notas & Tarefas Inteligente</p>
        </div>
      </div>

      <div className="header-controls">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar por título ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="search-icon" size={18} />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer'
              }}
              title="Limpar pesquisa"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className={`status-badge ${isConnected ? 'connected' : 'connecting'}`}>
          <span className="status-dot"></span>
          {isConnected ? (
            <>
              <Wifi size={14} /> Backend On-line
            </>
          ) : (
            <>
              <WifiOff size={14} /> Render (Iniciando...)
            </>
          )}
        </div>

        <button
          className="btn-icon"
          onClick={onRefresh}
          title="Atualizar lista de notas"
          disabled={isRefreshing}
        >
          <RefreshCw size={18} className={isRefreshing ? 'spin' : ''} />
        </button>

        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
