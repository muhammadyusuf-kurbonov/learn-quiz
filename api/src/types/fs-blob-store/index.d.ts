declare module 'fs-blob-store' {
    import { AbstractBlobStore } from 'abstract-blob-store';
    interface FSBlobStoreOptions {
        path: string;
        cache?: number;
    }

    function init(opts: string | FSBlobStoreOptions): AbstractBlob;

    export = init;
};
