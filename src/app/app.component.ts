import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html", //vue
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  //classe: tout ce qui va permettre de faire fonctionner la vue correctement

  auth: AuthService | undefined;


  constructor(private router: Router, private authService : AuthService) {}

  ngOnInit() {
    this.auth = this.authService;
  }

  goToHomepage() {
    this.router.navigate(['/pokemons'])
  }

  goToAuthenticationPage() {
    this.router.navigate(['/login'])
  }
}
