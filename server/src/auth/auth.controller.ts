import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Response,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { CookieService } from "src/cookie/cookie.service";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { ApiDoc } from "src/common/decorators/api-doc.decorator";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly cookieService: CookieService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiDoc("Login user", 200, "User successfully logged in")
  async login(@Request() req, @Response() res) {
    const token = await this.authService.login(req.user);
    this.cookieService.setUserCookie(res, token);
    return res.send({ message: "Logged in successfully" });
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  @ApiDoc("Initiate Google login", 302, "Redirects to Google authentication")
  googleAuth() {
    return { message: "Redirect to Google..." };
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  @ApiDoc("Handle Google callback", 200, "User successfully authenticated")
  async googleAuthCallback(@Request() req, @Response() res) {
    const token = await this.authService.login(req.user);
    this.cookieService.setUserCookie(res, token);
    return res.send({ message: "Logged in successfully" });
  }
}
