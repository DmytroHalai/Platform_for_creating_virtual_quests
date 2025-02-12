import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Response,
  Query,
  UploadedFile,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CookieService } from "src/cookie/cookie.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { IUser } from "src/constants/types/user/user";
import { FileSizeValidationPipe } from "src/common/pipes/file-size-validation.pipe";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { UploadFile } from "src/common/decorators/file-upload.decorator";
import { ApiTags } from "@nestjs/swagger";
import { ApiDoc } from "src/common/decorators/api-doc.decorator";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cookieService: CookieService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post("/registration")
  @ApiDoc("Register a new user", 201, "User registered successfully")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post("confirm")
  @ApiDoc("Confirm user email", 200, "Email confirmed successfully")
  async confirmEmail(@Query("token") token: string, @Response() res) {
    const confirmEmail = await this.usersService.confirmEmail(token);
    this.cookieService.setUserCookie(res, token);
    return res.send(confirmEmail);
  }

  @Get("count")
  @ApiDoc("Get total active users", 200, "Returns active user count")
  async countAllActiveUsers() {
    return await this.usersService.countAllActiveUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiDoc("Get user profile", 200, "User profile returned", true)
  async findProfile(@GetUser() id: IUser) {
    return await this.usersService.findProfile(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("edit")
  @ApiDoc("Update user profile", 200, "User profile updated successfully", true)
  async update(@GetUser() id: IUser, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("upload/avatar")
  @UploadFile("file")
  @ApiDoc("Upload user avatar", 201, "Avatar uploaded successfully", true)
  async uploadFile(
    @GetUser() id: IUser,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    @Query("type") type: string,
  ) {
    const filePath = await this.fileUploadService.saveFile(file, type);
    return await this.usersService.update(+id, { avatar: filePath });
  }

  @Get("rating")
  @ApiDoc("Get users ranking", 200, "Returns user rating list")
  async selectRating() {
    return await this.usersService.selectRating();
  }

  @Get(":username")
  @ApiDoc("Find user by username", 200, "User found successfully")
  async findByName(@Param("username") username: string) {
    return await this.usersService.findByName(username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/remove/:user_id")
  @ApiDoc("Delete a user", 200, "User deleted successfully", true)
  async remove(@GetUser() id: IUser, @Param("user_id") user_id: string) {
    return await this.usersService.remove(+id, +user_id);
  }
}
