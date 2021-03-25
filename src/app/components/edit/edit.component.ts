import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {UploadService} from '../../services/upload.service';
import {Global} from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  // tslint:disable-next-line:variable-name
  public save_project: string;
  public filesToUpload: Array<File>;
  public url: string;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar Proyecto';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }
  getProject(id): any {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(error as any);
      }
    );
  }
  onSubmit(): any{
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project){
          // subir imagen
          if (this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.save_project = result.project;
                this.status = 'success';
              });
          }else{
            this.save_project = response.project;
            this.status = 'success';
          }

        }else{
          this.status = 'failed';
        }
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
