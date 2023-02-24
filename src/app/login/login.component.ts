import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss",],
})
export class LoginComponent {
  message: string = "Logged out. (username: pikachu/ password: pikachu)";
  name: string = "";
  password: string = "";
  auth: AuthService | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth = this.authService;
    if (this.auth.isLoggedIn) {
      this.message = "Already logged-in.";
    }
  }

  setMessage() {
    if (this.auth?.isLoggedIn) {
      this.message = "Logged in !";
    } else {
      this.message = "Invalid username or password !";
    }
  }

  login() {
    this.message = "Connection attempt in progress...";
    try {
      this.auth
        ?.login(this.name, this.password)
        .subscribe((isLoggedIn: boolean) => {
          this.setMessage();
          if (isLoggedIn) {
            this.router.navigate(["/pokemons"]);
          } else {
            this.password = "";
            this.router.navigate(["/login"]);
          }
        });
    } catch (error) {
      console.error(error);
      this.message = "Authentication Failed";
    }
  }

  logout() {
    try {
      this.auth?.logout();
      this.message = "Logged out, see you soon !";
    } catch (error) {
      console.log(error);
      this.message = "Already logged out.";
    }
  }
}
