import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslationObject } from "@ngx-translate/core";
import { Observable } from "rxjs";

export class customTranslateLoader implements TranslateLoader{
    constructor(private http:HttpClient){}
    getTranslation(lang: string): Observable<any> {
        console.log(lang);
        return this.http.get(`/assets/i18n/${lang}.json`);
        
    }
}
export function HttpLoaderFactory(http:HttpClient):TranslateLoader{
    return new customTranslateLoader(http);
}