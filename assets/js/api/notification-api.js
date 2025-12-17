/**
 * Notification System API Functions
 * Communicates with Flask backend
 */

import { pythonURI } from './config.js';

/**
 * Create a new message in the inbox
 * @param {string} title - Message title
 * @param {string} content - Message content
 * @param {Array<{url: string, label: string}>} links - Optional links
 * @returns {Promise<{message_id: number, title: string}>}
 */
export async function createMessage(title, content, links = []) {
  try {
    const response = await fetch(`${pythonURI}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        title,
        content,
        links: links.map(l => ({ url: l.url, label: l.label || '' }))
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create message: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Message created:', data);
    return data;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}

/**
 * Update an existing message
 * @param {number} messageId - ID of the message to update
 * @param {string} title - Updated title
 * @param {string} content - Updated content
 * @param {Array<{url: string, label: string}>} links - Updated links
 * @returns {Promise<{message: string}>}
 */
export async function updateMessage(messageId, title, content, links = []) {
  try {
    const response = await fetch(`${pythonURI}/api/messages/${messageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        title,
        content,
        links: links.map(l => ({ url: l.url, label: l.label || '' }))
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update message: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Message updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating message:', error);
    throw error;
  }
}

/**
 * Delete a message
 * @param {number} messageId - ID of the message to delete
 * @returns {Promise<{message: string}>}
 */
export async function deleteMessage(messageId) {
  try {
    const response = await fetch(`${pythonURI}/api/messages/${messageId}`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`Failed to delete message: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Message deleted:', data);
    return data;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

/**
 * Get all notifications for a user
 * @param {number} userId - ID of the user
 * @returns {Promise<Array<{notification_id: number, message_id: number, title: string, content: string, links: Array, is_read: boolean, is_dismissed: boolean, read_at: string, dismissed_at: string}>>}
 */
export async function getUserNotifications(userId) {
  try {
    const response = await fetch(`${pythonURI}/api/notifications/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Notifications fetched:', data);
    // API returns array directly
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

/**
 * Mark a notification as read
 * @param {number} notificationId - ID of the notification to mark as read
 * @returns {Promise<{message: string}>}
 */
export async function markNotificationAsRead(notificationId) {
  try {
    const response = await fetch(`${pythonURI}/api/notifications/${notificationId}/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Notification marked as read:', data);
    return data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

/**
 * Mark a notification as dismissed
 * @param {number} notificationId - ID of the notification to mark as dismissed
 * @returns {Promise<{message: string}>}
 */
export async function markNotificationAsDismissed(notificationId) {
  try {
    const response = await fetch(`${pythonURI}/api/notifications/${notificationId}/dismiss`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to mark notification as dismissed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Notification marked as dismissed:', data);
    return data;
  } catch (error) {
    console.error('Error marking notification as dismissed:', error);
    throw error;
  }
}

/**
 * Get a report of all user states for a specific message (Admin only)
 * @param {number} messageId - ID of the message
 * @returns {Promise<Array<{user_id: number, is_read: boolean, is_dismissed: boolean, read_at: string, dismissed_at: string}>>}
 */
export async function getMessageReport(messageId) {
  try {
    const response = await fetch(`${pythonURI}/api/notifications?message_id=${encodeURIComponent(messageId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch message report: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Message report fetched:', data);
    // API returns array directly
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching message report:', error);
    throw error;
  }
}
