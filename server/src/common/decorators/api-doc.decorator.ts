import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

/**
 * Custom decorator to simplify Swagger documentation in controllers.
 *
 * @param summary - Description of the endpoint
 * @param status - HTTP status code (default: 200)
 * @param description - API response description
 * @param auth - Whether the endpoint requires authentication (default: false)
 */

export function ApiDoc(
  summary: string,
  status = 200,
  description = "Success",
  auth = false
) {
  const decorators = [
    ApiOperation({ summary }),
    ApiResponse({ status, description }),
  ];

  if (auth) {
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}
