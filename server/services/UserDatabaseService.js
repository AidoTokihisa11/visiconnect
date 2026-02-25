const { Pool } = require('pg');

// Configuration de la base de données
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

class UserDatabaseService {
  
  // Créer ou mettre à jour un utilisateur après connexion
  static async createOrUpdateUser(userData) {
    const client = await pool.connect();
    try {
      const { email, displayName, firstName, lastName, avatarUrl } = userData;
      
      const query = `
        INSERT INTO users (email, display_name, first_name, last_name, avatar_url, last_login)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        ON CONFLICT (email) 
        DO UPDATE SET 
          display_name = COALESCE(EXCLUDED.display_name, users.display_name),
          first_name = COALESCE(EXCLUDED.first_name, users.first_name),
          last_name = COALESCE(EXCLUDED.last_name, users.last_name),
          avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
          last_login = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *`;
      
      const values = [email, displayName, firstName, lastName, avatarUrl];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Récupérer un utilisateur par email
  static async getUserByEmail(email) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  // Récupérer un utilisateur par ID
  static async getUserById(userId) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await client.query(query, [userId]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  // Mettre à jour le profil utilisateur
  static async updateUserProfile(userId, updates) {
    const client = await pool.connect();
    try {
      const allowedFields = [
        'display_name', 'first_name', 'last_name', 'phone', 'company', 
        'job_title', 'bio', 'location', 'website', 'timezone', 'language'
      ];
      
      const updateFields = [];
      const values = [];
      let paramCount = 1;

      Object.keys(updates).forEach(key => {
        if (allowedFields.includes(key) && updates[key] !== undefined) {
          updateFields.push(`${key} = $${paramCount}`);
          values.push(updates[key]);
          paramCount++;
        }
      });

      if (updateFields.length === 0) {
        throw new Error('Aucun champ valide à mettre à jour');
      }

      updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(userId);

      const query = `
        UPDATE users 
        SET ${updateFields.join(', ')} 
        WHERE id = $${paramCount}
        RETURNING *`;

      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Mettre à jour les paramètres de notification
  static async updateNotificationSettings(userId, settings) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE users 
        SET 
          email_notifications = $2,
          push_notifications = $3,
          desktop_notifications = $4,
          marketing_emails = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`;
      
      const values = [
        userId,
        settings.email_notifications,
        settings.push_notifications,
        settings.desktop_notifications,
        settings.marketing_emails
      ];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Mettre à jour les paramètres de confidentialité
  static async updatePrivacySettings(userId, settings) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE users 
        SET 
          profile_visibility = $2,
          show_online_status = $3,
          allow_contact_by_email = $4,
          allow_contact_by_phone = $5,
          data_processing_consent = $6,
          analytics_consent = $7,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`;
      
      const values = [
        userId,
        settings.profile_visibility,
        settings.show_online_status,
        settings.allow_contact_by_email,
        settings.allow_contact_by_phone,
        settings.data_processing_consent,
        settings.analytics_consent
      ];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Activer/désactiver l'authentification à deux facteurs
  static async updateTwoFactorAuth(userId, enabled) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE users 
        SET 
          two_factor_enabled = $2,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`;
      
      const result = await client.query(query, [userId, enabled]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Mettre à jour les statistiques utilisateur
  static async updateUserStats(userId, stats) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE users 
        SET 
          total_meetings = $2,
          total_participants = $3,
          total_minutes = $4,
          meetings_this_month = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`;
      
      const values = [
        userId,
        stats.total_meetings,
        stats.total_participants,
        stats.total_minutes,
        stats.meetings_this_month
      ];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Supprimer un utilisateur
  static async deleteUser(userId) {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM users WHERE id = $1 RETURNING email';
      const result = await client.query(query, [userId]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Obtenir les statistiques d'activité récente
  static async getUserActivityStats(userId) {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as meetings_last_week,
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as meetings_last_month,
          COALESCE(SUM(duration_actual_minutes), 0) as total_duration_minutes
        FROM meetings 
        WHERE host_id = $1`;
      
      const result = await client.query(query, [userId]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = UserDatabaseService;