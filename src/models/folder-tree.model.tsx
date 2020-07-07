import {IPhotos} from "./gallery.interfaces";

export interface IFolderTreeModel {
    id: number,
    label: string,
    isOpen: boolean,
    classTarget: string,
    folders: Array<IFolderTreeModel>
    files: Array<IPhotos>
}
