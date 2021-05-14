import { Observable } from "rxjs";


export interface Photo{
    filePath: string;
    webviewPath: Observable<string | null>;
    base64?: string;

    name: string,
    time: number,
    likes: number,
    liked: boolean
}