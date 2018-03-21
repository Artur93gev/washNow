import { Observable } from 'rxjs/Rx';

export default class CRUD {

    constructor(
        private connection: any,
        private name: string,
    ) {}

    public create(data: any): Observable<any> {
        return this.connection.serverAPI({
            method: 'Post',
            url: `${this.name}`,
            data,
        });
    }

    public getItem(id: string): Observable<any> {
        return this.connection.serverAPI({
            method: 'Get',
            url: `${this.name}/${id}`,
        });
    }

    public getList(): Observable<any> {
        return this.connection.serverAPI({
            method: 'Get',
            url: `${this.name}`,
        });
    }

    public updateItem(id: string, data: any): Observable<any> {
        return this.connection.serverAPI({
            method: 'Put',
            url: `${this.name}/${id}`,
            data,
        });
    }

    public deleteItem(id: string): Observable<any> {
        return this.connection.serverAPI({
            method: 'Delete',
            url: `${this.name}/${id}`,
        });
    }
}
