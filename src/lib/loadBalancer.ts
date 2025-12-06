/**
 * A simple load balancer module for learning purposes.
 * A simple round-robin load balancer implementation.
 * Given a list of server URLs, it distributes requests evenly across them.
 */
export class LoadBalancer {
    constructor(private servers: string[]) {}
    private currentIndex = 0;

    public getNextServer(): string {
        const server = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return server;
    }
}