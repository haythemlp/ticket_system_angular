export class Server {
    id: number;
    name: string;
    url: string;
    company: string;
    ceo: string;
    ip: string;
    git_token: string;
    ssh_host: string;
    ssh_user: string;
    ssh_pass: string;
    url_host: string;
    db_host: string;
    db_user: string;
    db_pass: string;
    status: boolean;
    start: Date;
    deadline: Date;

    constructor() {
        this.id = null;
        this.name = null;
        this.url = null;
        this.company = null;
        this.ceo = null;
        this.ip = null;
        this.git_token = null;
        this.ssh_host = null;
        this.ssh_user = null;
        this.ssh_pass = null;
        this.url_host = null;
        this.db_host = null;
        this.db_user = null;
        this.db_pass = null;
        this.status = null;
        this.start = null;
        this.deadline = null;

    }
}
