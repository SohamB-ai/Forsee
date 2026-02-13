export interface SystemRequest {
    id: string;
    systemName: string;
    details: string;
    submittedBy: string;
    timestamp: string;
    status: 'pending' | 'approved' | 'rejected';
}

const STORAGE_KEY = 'forsee_system_requests';

export function getRequests(): SystemRequest[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function addRequest(req: Omit<SystemRequest, 'id' | 'timestamp' | 'status'>): SystemRequest {
    const requests = getRequests();
    const newRequest: SystemRequest = {
        ...req,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        status: 'pending',
    };
    requests.unshift(newRequest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return newRequest;
}

export function updateRequestStatus(id: string, status: 'approved' | 'rejected'): void {
    const requests = getRequests();
    const idx = requests.findIndex(r => r.id === id);
    if (idx !== -1) {
        requests[idx].status = status;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    }
}
