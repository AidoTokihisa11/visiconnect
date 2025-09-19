const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Récupérer l'état de santé du serveur
  async getHealth() {
    return this.request('/health');
  }

  // Récupérer toutes les salles actives
  async getRooms() {
    return this.request('/rooms');
  }

  // Récupérer les détails d'une salle spécifique
  async getRoom(roomId) {
    return this.request(`/rooms/${roomId}`);
  }

  // Récupérer les statistiques en temps réel
  async getStats() {
    const health = await this.getHealth();
    const rooms = await this.getRooms();
    
    return {
      totalRooms: health.rooms,
      totalUsers: health.users,
      activeRooms: rooms.length,
      totalParticipants: rooms.reduce((sum, room) => sum + room.participants, 0),
      recordingRooms: rooms.filter(room => room.isRecording).length,
      timestamp: health.timestamp
    };
  }

  // Récupérer les salles récentes
  async getRecentRooms(limit = 10) {
    const rooms = await this.getRooms();
    return rooms
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  // Récupérer l'activité récente
  async getRecentActivity() {
    const rooms = await this.getRooms();
    const activities = [];

    rooms.forEach(room => {
      activities.push({
        id: `room-${room.id}`,
        type: 'room_created',
        message: `Salle "${room.name}" créée`,
        timestamp: room.createdAt,
        participants: room.participants
      });

      if (room.isRecording) {
        activities.push({
          id: `recording-${room.id}`,
          type: 'recording_started',
          message: `Enregistrement démarré dans "${room.name}"`,
          timestamp: new Date(),
          participants: room.participants
        });
      }
    });

    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20);
  }
}

const apiService = new ApiService();
export default apiService;
