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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transformer = void 0;
const keyv_1 = __importDefault(require("keyv"));
const sharp_1 = __importDefault(require("sharp"));
const tsyringe_1 = require("tsyringe");
const cached_image_1 = require("./cached-image");
const logger_1 = require("./logger");
const object_hash_service_1 = require("./object-hash.service");
const DEFAULT_CROP_MAX_SIZE = 2000;
let Transformer = class Transformer {
    constructor(objectHasher, cache, cachedOriginalImage) {
        this.objectHasher = objectHasher;
        this.cache = cache;
        this.cachedOriginalImage = cachedOriginalImage;
        this.log = (0, logger_1.getLogger)('transformer');
        this.cropMaxSize = DEFAULT_CROP_MAX_SIZE;
    }
    getCropDimensions(maxSize, width, height) {
        height = height || width;
        if (width <= maxSize && height <= maxSize) {
            return [width, height];
        }
        const aspectRatio = width / height;
        if (width > height) {
            return [maxSize, Math.round(maxSize / aspectRatio)];
        }
        return [maxSize * aspectRatio, maxSize].map((number) => Math.round(number));
    }
    buildCacheKey(id, options, adapterName) {
        const hash = this.objectHasher.hash(options);
        return `transform:${id}:${adapterName}:${hash}`;
    }
    async transform(id, options, imageAdapter) {
        const cacheKey = this.buildCacheKey(id, options, imageAdapter.constructor.name);
        const cachedImage = await this.cache.get(cacheKey);
        if (cachedImage) {
            this.log(`Serving ${id} from cache ...`);
            return cachedImage;
        }
        this.log(`Resizing ${id} with options:`, JSON.stringify(options));
        const originalImage = await this.cachedOriginalImage.fetch(id, imageAdapter);
        if (!originalImage) {
            return {
                format: options.format,
                // eslint-disable-next-line unicorn/no-null
                image: null,
            };
        }
        const transformer = (0, sharp_1.default)(originalImage).rotate();
        if (!options.format) {
            options.format = (await transformer.metadata()).format;
        }
        if (options.trim) {
            transformer.trim();
        }
        if (options.width && options.height) {
            if (options.crop) {
                const [cropWidth, cropHeight] = this.getCropDimensions(this.cropMaxSize, options.width, options.height);
                transformer.resize(cropWidth, cropHeight, {
                    position: options.gravity,
                });
            }
            else {
                transformer.resize(options.width, options.height, {
                    fit: 'inside',
                    withoutEnlargement: true,
                });
            }
        }
        const image = await transformer
            .toFormat(options.format, {
            progressive: options.progressive,
            quality: options.quality,
        })
            .toBuffer();
        this.log('Resizing done');
        const result = { format: options.format, image };
        this.log(`Caching ${cacheKey} ...`);
        await this.cache.set(cacheKey, result);
        return result;
    }
};
Transformer = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [object_hash_service_1.ObjectHash,
        keyv_1.default,
        cached_image_1.CachedImage])
], Transformer);
exports.Transformer = Transformer;
//# sourceMappingURL=transformer.service.js.map