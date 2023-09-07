/// <reference types="node" />
import { CorsOptions } from 'cors';
import Keyv from 'keyv';
export declare type format = 'heif' | 'jpeg' | 'jpg' | 'png' | 'raw' | 'tiff' | 'webp';
export interface Result {
    format: format | undefined;
    image: Buffer | null;
}
export interface ImageAdapter {
    fetch(id: string): Promise<Buffer | undefined>;
}
export interface ExpressSharpOptions {
    autoUseWebp?: boolean;
    cors?: CorsOptions;
    imageAdapter: ImageAdapter;
    cache?: Keyv;
    secret?: string;
}
export declare enum QueryParams {
    quality = "q",
    width = "w",
    height = "h",
    format = "f",
    progressive = "p",
    crop = "c",
    trim = "t",
    gravity = "g"
}
export interface Signer {
    sign(string: string | URL): string;
    verify(string: string): boolean;
}
export interface Type<T = unknown> extends Function {
    new (...args: unknown[]): T;
}
