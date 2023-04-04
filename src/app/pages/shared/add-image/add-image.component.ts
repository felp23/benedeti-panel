import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigService, PostService } from 'src/app/services';

@Component({
    selector: 'app-add-image',
    templateUrl: './add-image.component.html',
    styleUrls: ['./add-image.component.scss']
})

export class AddImageComponent implements OnInit {

    imageSrc: any;
    fileToUpload: any;
    image: any;
    fileName: any;
    imageDescription: any;
    newImage: any = {};

    constructor(
        public router: Router,
        public ref: DynamicDialogRef,
        private messageService: MessageService,
        public postService: PostService,
        public configService: ConfigService
    ) { }

    ngOnInit(): void {
    }

    selectFile(event) {
        this.image = event.target.files[0];
    }

    handleInputChange(e) {
        this.image = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
        // this.eventImage = this.imageSrc.replace('data:image/png;base64,', '');
        // this.eventImage = this.eventImage.replace('data:image/jpeg;base64,', '');
        // this.eventService.newEvent.eventImage = this.eventImage;
    }

    async uploadImage() {
        const formData = new FormData();
        formData.append('image', this.image);
        this.postService.uploadImage(this.image).subscribe(response => {
            if (response) {
                console.log('RESPOSTA', response);
                this.newImage = {
                    postImageFilename: response.filename,
                    postImageDescription: this.imageDescription
                }
                this.postService.postImages.push(this.newImage);
                console.log(this.postService.postImages);
                this.ref.close(this.postService.postImages);
            }
        })
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }
}
