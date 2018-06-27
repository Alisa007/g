import {Component, Input} from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {InputModel} from '../../models/Input.model';

@Component({
  selector: 'ge-file-drop',
  templateUrl: './fileDrop.component.html',
  styleUrls: ['./fileDrop.component.less']
})
export class FileDropComponent {
  @Input() model = InputModel;

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;

    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);

          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)
           **/

        });
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
