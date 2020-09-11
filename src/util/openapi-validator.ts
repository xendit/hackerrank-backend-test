import { OpenApiValidator as ExpressValidator } from 'express-openapi-validator';
import { OpenApiSpecLoader } from 'express-openapi-validator/dist/framework/openapi.spec.loader';
import { createResponseAjv } from 'express-openapi-validator/dist/framework/ajv';
import { Ajv, ErrorObject } from 'ajv';
import { Application, Router } from 'express';
import { ValidationError as ExpressValidationError } from 'express-openapi-validator/dist/framework/types';

// reexporting for abstraction purpose, in case we switch to another package in the future
export type ValidationError = ExpressValidationError;

export interface ValidationResult {
    isValid: boolean;
    errors: Array<ErrorObject>;
}

interface Options {
    apiSpec: string;
    validateRequests: boolean;
    validateResponses: boolean;
    unknownFormats: Array<string>;
}

class OpenApiValidator {
    private openApiValidator: ExpressValidator;

    private manualValidator: Ajv;

    private opts: Options;

    constructor(
        opts: Options = {
            apiSpec: './docs/openapi.yaml',
            validateRequests: true,
            validateResponses: true,
            unknownFormats: ['uuid']
        }
    ) {
        this.opts = opts;
        this.openApiValidator = new ExpressValidator(opts);
    }

    public async build() {
        const spec = await new OpenApiSpecLoader({ apiDoc: this.opts.apiSpec }).load();
        this.manualValidator = createResponseAjv(spec.apiDoc, {
            nullable: true,
            removeAdditional: false,
            useDefaults: true,
            unknownFormats: this.opts.unknownFormats
        });
        return this;
    }

    public async install(app: Application | Router) {
        await this.openApiValidator.install(app);
    }

    /**
     * Validate data using schema
     * schemas have been loaded during construction
     * @param  {String} schemaName name of the schema under #/components/schemas
     * @param  {Any} data to be validated
     * @return {ValidationResult} validation result
     * @throws {Error}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public validate(schemaName: string, data: any): ValidationResult {
        if (!this.manualValidator) {
            throw new Error('OpenApiValidator needs to be build() first for manual validation');
        }

        const v = this.manualValidator.getSchema(`#/components/schemas/${schemaName}`);
        if (!v) {
            throw new Error(`no schema with name "${schemaName}"`);
        }
        const isValid = v(data) as boolean;

        return {
            isValid,
            errors: v.errors
        };
    }
}

export { OpenApiValidator };
