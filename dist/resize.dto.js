"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeDto = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-magic-numbers */
const class_validator_1 = require("class-validator");
require("reflect-metadata");
const decorators_1 = require("./decorators");
const is_url_1 = require("./validator/is-url");
class ResizeDto {
    constructor(args) {
        this.quality = 80;
        this.progressive = false;
        this.crop = false;
        this.trim = false;
        Object.assign(this, args);
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['heif', 'jpeg', 'jpg', 'png', 'raw', 'tiff', 'webp']),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResizeDto.prototype, "format", void 0);
__decorate([
    (0, decorators_1.Transform)(Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], ResizeDto.prototype, "height", void 0);
__decorate([
    (0, decorators_1.Transform)(Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], ResizeDto.prototype, "width", void 0);
__decorate([
    (0, decorators_1.Transform)(Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ResizeDto.prototype, "quality", void 0);
__decorate([
    (0, decorators_1.Transform)((value) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ResizeDto.prototype, "progressive", void 0);
__decorate([
    (0, decorators_1.Transform)((value) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ResizeDto.prototype, "crop", void 0);
__decorate([
    (0, decorators_1.Transform)((value) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ResizeDto.prototype, "trim", void 0);
__decorate([
    (0, class_validator_1.IsIn)([
        'north',
        'northeast',
        'southeast',
        'south',
        'southwest',
        'west',
        'northwest',
        'east',
        'center',
        'centre',
    ]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ResizeDto.prototype, "gravity", void 0);
__decorate([
    (0, is_url_1.IsUrl)({ message: 'Invalid image url' }),
    __metadata("design:type", String)
], ResizeDto.prototype, "url", void 0);
exports.ResizeDto = ResizeDto;
//# sourceMappingURL=resize.dto.js.map