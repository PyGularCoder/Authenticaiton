'use strict';

const { AccessTokens, TokenType } = require('../models');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const tokenRecord = await AccessTokens.findOne({
      where: { token },
      include: { model: TokenType, as: 'tokenType' },
    });

    if (!tokenRecord || tokenRecord.tokenType.type !== 'PAT') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (new Date() > tokenRecord.expiresAt) {
      return res.status(401).json({ message: 'Token expired' });
    }

    req.user = { id: tokenRecord.userId }; // Attach user info to request
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;