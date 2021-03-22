import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {UploadService} from '../../services/upload.service';
import {Global} from '../../services/global';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  // tslint:disable-next-line:variable-name
  public save_project: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Crear Proyecto';
    this.project = new Project('', '', '', '', 2021, '', '');
    this.url = Global.url;
  }

  ngOnInit(): void {
  }
  onSubmit(form): any{
    // guardar los datos
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project){
          // Subir la imagen
          this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.save_project = response.project._id;
              this.status = 'success';
              form.reset();
            });
        }else{
          this.status = 'failed';
        }
        console.log(response);
      },
      error => {
        console.log(error as any);
      }
    );

  }
  fileChangeEvent(fileInput: any): any {
    this.filesToUpload = (fileInput.target.files as Array<File>);

  }

}
