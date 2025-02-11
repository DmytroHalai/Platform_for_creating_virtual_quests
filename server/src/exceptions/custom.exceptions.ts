import { ForbiddenException, NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super("User not found");
  }
}

export class QuestNotFoundException extends NotFoundException {
  constructor() {
    super("Quest not found");
  }
}

export class UserOwnerException extends ForbiddenException {
  constructor() {
    super("You can only delete your own account");
  }
}

export class TokenException extends NotFoundException {
  constructor() {
    super("Invalid or expired token");
  }
}
