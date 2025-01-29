import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from './error-messages';

export class ErrorHandler {
  static throwError(errorCode: keyof typeof ErrorMessages) {
    const errorMessage = ErrorMessages[errorCode];

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: errorMessage.message,
        errorCode: errorMessage.errorCode,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
