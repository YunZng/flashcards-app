import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpResponseFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;

        let errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                errorResponse['message'] = exceptionResponse;
            } else {
                errorResponse = { ...errorResponse, ...exceptionResponse };
                if (process.env.NODE_ENV !== 'development') {
                    delete errorResponse['error'];
                }
            }
        } else {
            errorResponse['message'] = 'Internal Server Error';
            if (process.env.NODE_ENV === 'development') {
                errorResponse['error'] = exception.toString();
            }
        }

        response.status(status).json(errorResponse);
    }
}
