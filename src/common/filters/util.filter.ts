
export class FilterUtil {
  static getErrorObject(status: number, path: string, method: string, message: string, gigitErrorCode: string) : any {

    const errResponse = {
      status: status,
      timestamp: new Date().toLocaleTimeString(),
      path: path,
      method: method,
      message: message,
      gigitErrorCode: gigitErrorCode
    }

    return errResponse;
  }
}