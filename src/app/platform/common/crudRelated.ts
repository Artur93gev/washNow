import { Observable } from 'rxjs/Rx';

export default class CRUDRelated {

    constructor(
        protected connection: any,
        private parentName: string,
        private name: string,
    ) {}

    public create(parentId: string, data: any): Observable<any> {
        return this.connection.serverAPI({
            method: 'Post',
            url: `${this.parentName}/${parentId}/${this.name}`,
            data,
        });
    }

    public getItem(parentId: string, id: string): Observable<any> {
        return this.connection.serverAPI({
            method: 'Get',
            url: `${this.parentName}/${parentId}/${this.name}/${id}`,
        });
    }

    public getList(parentId: string): Observable<any> {
        return this.connection.serverAPI({
            method: 'Get',
            url: `${this.parentName}/${parentId}/${this.name}`,
        });
    }

    public updateItem(parentId: string, id: string, data: any): Observable<any> {
        return this.connection.serverAPI({
            method: 'Put',
            url: `${this.parentName}/${parentId}/${this.name}/${id}`,
            data,
        });
    }

    public deleteItem(parentId: string, id: string): Observable<any> {
        return this.connection.serverAPI({
            method: 'Delete',
            url: `${this.parentName}/${parentId}/${this.name}/${id}`,
        });
    }
}
