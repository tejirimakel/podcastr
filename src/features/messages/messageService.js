import axios from 'axios'

const API_URL = '/api/messages/'

// Create new message
const createMessage = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, messageData, config)

  return response.data
}

// Get user messages
const getMessages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user message
const deleteMessage = async (messageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + messageId, config)

  return response.data
}

const messageService = {
  createMessage,
  getMessages,
  deleteMessage,
}

export default messageService
