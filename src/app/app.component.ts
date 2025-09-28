import { Component } from '@angular/core';
import { Route, RouterOutlet,Router} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebaseConfig';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,TranslateModule,HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  //title = 'codebin';
  constructor(){
    initializeApp(firebaseConfig);

  }
}


