import { HttpException } from "@nestjs/common";

export class PollingException extends HttpException {
  constructor(public readonly gigitErrorCode: string, response: string | object, status: number) {
    super(response, status);
  }
}