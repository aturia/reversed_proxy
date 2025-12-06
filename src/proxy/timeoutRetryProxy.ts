import { Request, Response } from 'express';
import http from 'http';
import { MAX_RETRY, PROXY_TIMEOUT } from '../config/proxyConfig';

export const timeoutRetryProxy = (req: Request, res: Response) => {
    let attempts = 0;

    const forwardRequest = () => {
        console.log(`[CustomProxy] ${req.method} ${req.baseUrl}`);

        const headers = { ...req.headers }
        headers.host = req.hostname;
        headers['x-forwarded-for'] = req.ip;

        // ******************************
        // DEBUG Xem header trước khi gửi đi
        console.log("--- Headers Gửi đi (Proxy Side) ---");
        console.log(`Client IP (req.ip): ${req.ip}`);
        console.log(`X-Forwarded-For value: ${headers['x-forwarded-for']}`);
        console.log("-----------------------------------");
        // ******************************

        const replacePath = req.originalUrl.replace('/api/timeout-retry/users', '/timeout-retry/users');
        const url = `localHost:3001${replacePath}`;
        const options = {
            method: req.method,
            headers: req.headers
        };

        console.log(`[RetryProxy] Attempt ${attempts + 1} → ${url}`);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT);

        const proxyReq = http.request(url, options, (proxyRes) => {
            clearTimeout(timeout);

            console.log(`[CustomProxy] Response from Upstream: ${proxyRes.statusCode} ${url}`);
            // Set header từ upstream -> client
            res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);

            // Stream data từ upstream -> client
            proxyRes.pipe(res, { end: true });
        });

        // Stream body từ client -> upstream
        req.pipe(proxyReq, { end: true });

        proxyReq.on('error', (err) => {
            if (attempts < MAX_RETRY - 1) {
                attempts++;
                console.log("[RetryProxy] Retry due to error:", err.message);
                return forwardRequest();
            }

            console.error('Proxy request error:', err);
            res.status(500).json({ error: 'Proxy failed' });
        });
    }

    forwardRequest();
}