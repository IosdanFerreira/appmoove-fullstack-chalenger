import { ValidationError } from '@nestjs/common';

export function flattenValidationErrors(
  errors: ValidationError[],
): { property: string; message: string }[] {
  const result = [];

  for (const error of errors) {
    if (error.constraints) {
      for (const key of Object.keys(error.constraints)) {
        result.push({
          property: error.property,
          message: error.constraints[key],
        });
      }
    }

    if (error.children && error.children.length > 0) {
      const childrenErrors = flattenValidationErrors(error.children).map(
        (childError) => ({
          property: `${error.property}.${childError.property}`,
          message: childError.message,
        }),
      );
      result.push(...childrenErrors);
    }
  }

  return result;
}
