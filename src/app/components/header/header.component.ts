import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService:AuthService, private languageService:LanguageService){}            /*Dependency Injection*/
  /*can control navigation items (Login/Logout,createBin etc.) based on the user’s authentication state*/
  dropdownOpen=false;
  toggleDropdown(){
    this.dropdownOpen=!this.dropdownOpen;
    console.log('Dropdown toggled:', this.dropdownOpen);
  }
  selectLanguage(languageCode: string) {
    this.languageService.setLanguage(languageCode);
    this.dropdownOpen=false;
    //overlay.hide();
  }

  getCurrentLanguageName(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const languages = this.languageService.getAvailableLanguage();
    const language = languages.find(lang => lang.code === currentLang);
    return language ? language.name : 'English';
  }
}
