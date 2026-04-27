import { apiReference } from '@scalar/nestjs-api-reference';
import { ApiReferenceConfigurationWithSource } from '@scalar/types';
type NestJSReferenceConfiguration = ApiReferenceConfigurationWithSource & { withFastify?: boolean };

export const createApiReference = (option: Partial<NestJSReferenceConfiguration>) => {
  return apiReference(option);
};
