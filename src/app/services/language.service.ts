import { Injectable, PLATFORM_ID ,Inject} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
export interface Language{
  code:string;
  name:string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly  STORAGE_KEY='selectedLanguage';
  private readonly FALLBACK_LANG='en';
  private availableLanguages:Language[]=[
    {code:'en',name:'English'},
    {code:'ko',name:'Korean'},
    {code:'sl',name:'Slovenia'},
    {code:'ja',name:'Japanese'}
  ];
  private currentLanguageSubject=new BehaviorSubject<string>(this.FALLBACK_LANG);
  currentLanguage$=this.currentLanguageSubject.asObservable();

  constructor(
    private translateService:TranslateService,
    @Inject(PLATFORM_ID) private plateformId:Object
  ) { }
  private initializeLanguage():void{
    this.translateService.addLangs(this.availableLanguages.map(lang=>lang.code));
    this.translateService.setDefaultLang(this.FALLBACK_LANG);
    const savedLang=this.getSavedLanguage();
    const browserLang=this.getBrowserLanguage();
    const InitialLang=savedLang ||browserLang||this.FALLBACK_LANG;
    this.setLanguage(InitialLang);
  }

  private getSavedLanguage():string | null{
    if(isPlatformBrowser(this.plateformId)){
      return localStorage.getItem(this.STORAGE_KEY);
    }
    return null;

  }
  private getBrowserLanguage():string|null{
    if(isPlatformBrowser(this.plateformId)){
      const browserLang=navigator.language.split('-')[0];
      return this.isLanguageAvailable(browserLang)? browserLang : null;
    }
    return null;
  }
  private isLanguageAvailable(langCode:string):boolean{
    return this.availableLanguages.some(lang=>lang.code===langCode);
  }
  setLanguage(langCode:string):boolean{
    if(!this.isLanguageAvailable(langCode)){
      console.warn('Language ${langCode} is not available.Using fallback language.');
      langCode=this.FALLBACK_LANG;
    }
    this.translateService.use(langCode);
    this.currentLanguageSubject.next(langCode);
    if(isPlatformBrowser(this.plateformId)){
      localStorage.setItem(this.STORAGE_KEY,langCode);
    }
    return true;
  }

  getCurrentLanguage():string{
    return this.currentLanguageSubject.value;
  }
  getAvailableLanguage():Language[]{
    return [...this.availableLanguages];
  }
  getTextWithParams(key:string,params?:object):Observable<string>{
    return this.translateService.get(key,params);
  }

}
