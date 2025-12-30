import { createMMKV } from 'react-native-mmkv';

// Initialize MMKV storage
export const storage = createMMKV({
  id: 'fetal-movement-storage',
});

// Storage keys
const SESSIONS_KEY = 'fetal_movement_sessions';

// Session interface
export interface Session {
  id: string;
  date: string;          
  day: string;         
  time: number;           
  kicks: number;          
  timestamp: number;      
}

/**
 * Save a new session
 */
export const saveSession = (session: Session): void => {
  const sessions = getSessions();
  sessions.push(session);
  
  // Sort by timestamp (newest first)
  sessions.sort((a, b) => b.timestamp - a.timestamp);
  
  storage.set(SESSIONS_KEY, JSON.stringify(sessions));
};

/**
 * Get all sessions
 */
export const getSessions = (): Session[] => {
  const data = storage.getString(SESSIONS_KEY);
  
  if (!data) {
    return [];
  }
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing sessions:', error);
    return [];
  }
};



/**
 * Get total session count
 */
export const getSessionCount = (): number => {
  return getSessions().length;
};

/**
 * Create a new session object
 */
export const createSession = (timeInSeconds: number, kicks: number = 10): Session => {
  const now = new Date();
  const timestamp = now.getTime();
  
  // Get day name
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[now.getDay()];
  
  // Format date
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  
  return {
    id: timestamp.toString(),
    date,
    day,
    time: timeInSeconds,  
    kicks,
    timestamp,
  };
};
