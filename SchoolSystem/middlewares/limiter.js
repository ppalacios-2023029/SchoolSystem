import rateLimit from "express-rate-limit"

export const limiter = rateLimit(
    {
        windowMs: 15 * 60 * 1000,
        max: 150,
        message: 'Espera 15 minutos para intentar de nuevo'
    }
)