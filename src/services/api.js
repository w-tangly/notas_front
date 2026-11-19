const BASE_URL = 'https://notas-back-ut9s.onrender.com/api/notes';
const HEALTH_URL = 'https://notas-back-ut9s.onrender.com/health';

/**
 * Service handler for backend API operations
 */
export const api = {
  /**
   * Fetch all notes from the backend
   */
  async getNotes() {
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar notas: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error (getNotes):', error);
      throw error;
    }
  },

  /**
   * Create a new note
   * @param {Object} note - { titulo: string, texto: string }
   */
  async createNote({ titulo, texto }) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, texto })
      });
      if (!response.ok) {
        throw new Error(`Erro ao criar nota: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error (createNote):', error);
      throw error;
    }
  },

  /**
   * Update an existing note by ID
   * @param {string} id - Note ID
   * @param {Object} note - { titulo: string, texto: string }
   */
  async updateNote(id, { titulo, texto }) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, texto })
      });
      if (!response.ok) {
        throw new Error(`Erro ao atualizar nota: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error (updateNote):', error);
      throw error;
    }
  },

  /**
   * Delete a note by ID
   * @param {string} id - Note ID
   */
  async deleteNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Erro ao remover nota: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error (deleteNote):', error);
      throw error;
    }
  },

  /**
   * Health check to test API connectivity
   */
  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const response = await fetch(HEALTH_URL, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }
};
