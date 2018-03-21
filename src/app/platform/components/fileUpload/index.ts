import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges
} from "@angular/core";

@Component({
    selector: "file-uploader",
    templateUrl: "./view/index.html",
    inputs: ["name", "type", "multiple", "disabled"],
    outputs: ["promise"],
    styleUrls: ["./sass/index.scss"]
})
export class FileUploader implements OnChanges {
    @Input() name: any;
    @Input() type: any;
    @Input() multiple: boolean;
    @Input() disabled: boolean = false;
    @Output() promise: EventEmitter<any> = new EventEmitter();

    public title: string;
    public style: string;
    public names: string = '';
    private defer: any;

    ngOnChanges(changes: any) {
        if (changes.name && changes.name.currentValue) {
            this.title = changes.name.currentValue;
        }
        if (changes.type && changes.type.currentValue) {
            this.style = changes.type.currentValue;
        }
        if (changes.multiple) {
            this.multiple = changes.multiple.currentValue === 'true';
        }
    }

    private createNames(result: Array<any>): void {
        this.names = '';
        result.forEach((item: any) => {
            this.names += ` ${item.files[0].name}`;
        });
    }

    public change(e: any) {
        this.defer = new Promise((resolve, reject) => {
            if (e.target.files.length === 1) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);

                reader.onload = () => {
                    let type = reader.result.match(/^data:(.+?);/)[1];
                    const result = {
                        files: e.target.files,
                        value: reader.result,
                        type: type,
                        size: e.target.files[0].size
                    }
                    this.createNames([result]);
                    resolve(result);
                };
                reader.onerror = error => {
                    reject(error);
                };
            } else {
                let multipleFiles = []; //this is the array of  base64-ed files
                let filereaders = [];
                for (let i = 0; i < e.target.files.length; ++i) {
                    let file = e.target.files[i];
                    filereaders.push(
                        new Promise(function(resolve, reject) {
                            let fileReader = new FileReader();
                            fileReader.readAsDataURL(file);
                            multipleFiles[i] = new Promise(function(
                                resolve,
                                reject
                            ) {
                                fileReader.onload = function() {
                                    let type = fileReader.result.match(
                                        /^data:(.+?);/
                                    )[1];
                                    resolve({
                                        files: [file],
                                        value: fileReader.result,
                                        type: type,
                                        size: file.size
                                    });
                                };
                                fileReader.onerror = error => {
                                    reject(error);
                                };
                            });
                        })
                    );
                }
                Promise.all(multipleFiles).then(res => {
                    this.createNames(res);
                    resolve(res);
                });
            }
        });

        this.promise.emit(this.defer);
    }
}
