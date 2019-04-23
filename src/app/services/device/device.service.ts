import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    APIEndPoint: string;

    constructor(
        private http: HttpClient,
        private userApi: UserService) {
        this.APIEndPoint = environment.apiendpoint;
    }

    getLatestData() {
        const uri = `${this.APIEndPoint}/data/devices`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders });
    }

    getAllData() {
        const consulta = {
            "selector": {},
            "sort": [
                {
                    "hour": "asc"
                }
            ]
        }
        const uri = `${this.APIEndPoint}/data/query`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.post(uri, consulta, { headers: httpHeaders });

    }

    getHistoryData(id: string): any {
        const uri = `${this.APIEndPoint}/data/history/` + id;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'text/plain',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders });
    }

    getByDevice(device) {
        const uri = `${this.APIEndPoint}/data?device=${device}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }

    getByNodo(nodo) {
        const uri = `${this.APIEndPoint}/data?node=${nodo}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }

    getByID(id) {
        const uri = `${this.APIEndPoint}/${id}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }

    getByPlace(place) {
        const uri = `${this.APIEndPoint}/${place}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }


    getDataAdvancedSearch(
        id: String,
        temp: string,
        lowTemp: String,
        greatTemp: String,
        device: String,
        node: String) {
        const uri = `${this.APIEndPoint}/data?Key=${id}&temperature=${temp}&lowerTemperature=${lowTemp}&greaterTemperature=${greatTemp}&device=${device}&node=${node}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }


    compareData(dato, localData): boolean {
        for (var i = 0; i < localData.length; i++) {
            if (JSON.stringify(dato) === JSON.stringify(localData[i])) return false;
        }
        return true;
    }

}