import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: "https://picsum.photos/800/600?random=1",
    description: "User avatar",
  })
  avatar?: string;

  @ApiProperty({
    example: "I really love playing footbal and I'm good at it",
    description: "User description",
  })
  description?: string;

  @ApiProperty({ example: "12-12-1996", description: "User dateOfBirth" })
  dateOfBirth?: string;
}
