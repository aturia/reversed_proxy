import { Request, Response } from 'express';
import http from 'http';
import { userServiceServers } from '../config/upstream';
import { LoadBalancer } from '../lib/loadBalancer';

const loadBalancer = new LoadBalancer(userServiceServers)

export const customReversedProxy = (req: Request, res: Response) => { 
    console.log(`[CustomProxy] ${req.method} ${req.baseUrl}`);
    
    const headers = {...req.headers}
    headers.host = req.hostname;
    headers['x-forwarded-for'] = req.ip;

    // ******************************
    // DEBUG Xem header trước khi gửi đi
    console.log("--- Headers Gửi đi (Proxy Side) ---");
    console.log(`Client IP (req.ip): ${req.ip}`);
    console.log(`X-Forwarded-For value: ${headers['x-forwarded-for']}`);
    console.log("-----------------------------------");
    // ******************************

    const targetServer = loadBalancer.getNextServer();
    const replacePath = req.originalUrl.replace('/api/users', '/users');
    const url = `${targetServer}${replacePath}`;
    const options = {
        method: req.method,
        headers: req.headers
    };

    const proxyReq = http.request(url, options, (proxyRes) => {
        console.log(`[CustomProxy] Response from Upstream: ${proxyRes.statusCode} ${url}`);
        // Set header từ upstream -> client
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);

        // Stream data từ upstream -> client
        proxyRes.pipe(res, { end: true });
    });

    // Stream body từ client -> upstream
    req.pipe(proxyReq, { end: true });

    proxyReq.on('error', (err) => {
        console.error('Proxy request error:', err);
        res.status(500).json({ error: 'Proxy failed' });
    });
}